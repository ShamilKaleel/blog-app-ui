pipeline {
    agent any
    
    tools {
        nodejs 'Node.js 20.9.0'
    }
    
    environment {
        EC2_USER = 'ubuntu'
        EC2_HOST = credentials('ec2-host')
        NODE_OPTIONS = '--max-http-header-size=16384 --max-old-space-size=4096'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                // Configure npm for better reliability
                sh '''
                    # Increase timeouts and retries
                    npm config set fetch-retries 10
                    npm config set fetch-retry-factor 2
                    npm config set fetch-retry-mintimeout 60000
                    npm config set fetch-retry-maxtimeout 180000
                    
                    # Based on npm-notice in curl response, use replicate registry
                    npm config set registry https://replicate.npmjs.com/
                    
                    # Limit concurrent connections to avoid EventEmitter warnings
                    npm config set maxsockets 5
                    
                    # Clean npm cache to start fresh
                    npm cache clean --force
                    
                    # Install with more verbosity to see where it fails
                    npm install --verbose
                '''
                
                sh 'npm run build'
                sh 'ls -la ./dist'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    def buildDir = './dist'
                    
                    if (buildDir) {
                        echo "Found build directory: ${buildDir}"
                        
                        sshagent(['ec2-ssh-key']) {
                            // Create a tar file of the build
                            sh "tar -czf build.tar.gz -C ${buildDir} ."
                            
                            // Copy it to the EC2 instance
                            sh "scp -o StrictHostKeyChecking=no build.tar.gz ${EC2_USER}@${EC2_HOST}:/tmp/"
                            
                            // Extract and deploy on EC2
                            sh """
                                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                    sudo rm -rf /var/www/frontends/*
                                    sudo mkdir -p /var/www/frontends
                                    sudo tar -xzf /tmp/build.tar.gz -C /var/www/frontends/
                                    rm /tmp/build.tar.gz
                                    sudo systemctl reload nginx
                                '
                            """
                        }
                    } else {
                        error "Build directory not found. Check your build process."
                    }
                }
            }
        }
    }
    
    post {
        failure {
            echo 'The pipeline failed. Check the build logs for details.'
        }
        success {
            echo 'Successfully built and deployed the application.'
        }
    }
}
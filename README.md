# Docker Commands & Concepts

## Basic Docker Commands

1. **Pull an image from Docker Hub**

   ```sh
   docker pull <image_name>
   ```

2. **List downloaded images**

   ```sh
   docker images
   ```

3. **Run a container from an image**

   ```sh
   docker run <image_name>
   ```

4. **Run a container in detached mode (background mode)**

   ```sh
   docker run -d <image_name>
   ```

5. **View logs of a running container**

   ```sh
   docker logs <container_id>
   ```

6. **List running containers**

   ```sh
   docker ps
   ```

7. **Stop a running container**

   ```sh
   docker stop <container_id>
   ```

8. **Run a container with port mapping**

   ```sh
   docker run -d -p <host_port>:<container_port> nginx:1.23
   ```

9. **List all containers (including stopped ones)**

   ```sh
   docker ps -a
   ```

10. **Start a stopped container**

    ```sh
    docker start <container_id>
    ```

11. **Remove a stopped container**

    ```sh
    docker rm <container_id>
    ```

12. **Force remove a running container**

    ```sh
    docker rm -f <container_id>
    ```

13. **Run a container with a custom name**

    ```sh
    docker run --name <container_name> -d -p <host_port>:<container_port> nginx:1.23
    ```

---

## Docker Registry vs Repository

- **Registry**: A storage and distribution system for Docker images (e.g., Docker Hub, AWS ECR, Google Container Registry).
- **Repository**: A collection of related Docker images with different tags (e.g., `nginx:1.21`, `nginx:1.23` in the `nginx` repository).

---

## Dockerfile Basics

A **Dockerfile** is a script containing a series of instructions on how to build a Docker image.

```dockerfile
# Base image
FROM <base_image>

# Run a command during build
RUN <command>

# Copy a file into the container
COPY <file_name> /<target_directory>/

# Set working directory inside the container
WORKDIR /<directory>

# Default command to run when container starts
CMD ["node", "server.js"]
```

---

## Building a Docker Image

1. **Build an image using a Dockerfile**
   ```sh
   docker build -t node-app:1.0 .
   ```
   - `-t node-app:1.0` → Assigns a name (`node-app`) and tag (`1.0`).
   - `.` → Specifies the location of the Dockerfile (current directory).

This note serves as a quick reference for learning and using Docker efficiently.

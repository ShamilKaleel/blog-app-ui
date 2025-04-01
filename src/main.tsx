import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";
import { DentistProvider } from "./contexts/dentistContext.tsx";
import { CourseProvider } from "./contexts/courseContext.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BlogProvider } from "./contexts/BlogContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BlogProvider>           
        <DentistProvider>
        <CourseProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CourseProvider>
      </DentistProvider>
      </BlogProvider>   
    </AuthProvider>
  </StrictMode>
);

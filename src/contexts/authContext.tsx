import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import axiosInstance from "@/api/axiosInstance";

interface User {
  id: number;
  username: string;
  roles: string[];
}

type AuthState = User | null;

type AuthAction = { type: "SET_USER"; payload: User } | { type: "CLEAR_USER" };

const initialAuthState: AuthState = null;

// Reducer function
const authReducer = (_state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      // Save to localStorage when setting user
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "CLEAR_USER":
      // Clear from localStorage when logging out
      localStorage.removeItem("user");
      return null;
    default:
      return null;
  }
};

// Create context
export const AuthContext = createContext<{
  authState: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    username: string,
    password: string,
    roles: string[]
  ) => Promise<void>;
  isLording: boolean;
  setIsLording: React.Dispatch<React.SetStateAction<boolean>>;
}>(null!);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Try to get initial state from localStorage
  const userFromStorage = localStorage.getItem("user");
  const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  
  const [authState, dispatch] = useReducer(
    authReducer, 
    parsedUser || initialAuthState
  );
  const [isLording, setIsLording] = useState(true);

  useEffect(() => {
    setIsLording(true);
    
    // If we already have a user from localStorage, we can set loading to false faster
    if (parsedUser) {
      setIsLording(false);
    }
    
    // Still verify with the server
    axiosInstance
      .get("/users/user")
      .then(({ data }) => {
        const { username, roles,id } = data;
        dispatch({ type: "SET_USER", payload: { username, roles,id } });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
        // If server check fails, clear any stored user data
        dispatch({ type: "CLEAR_USER" });
      })
      .finally(() => {
        setIsLording(false);
      });
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLording(true);
    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });
      
      const { username: user, roles,id } = response.data;
      dispatch({ type: "SET_USER", payload: { username: user, roles,id } });
    } catch (error: any) {
      console.error("Login failed", error);
      throw error.response?.data?.message || "Invalid credentials";
    } finally {
      setIsLording(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLording(true);
    try {
      await axiosInstance.post("/users/logout", {});
      dispatch({ type: "CLEAR_USER" });
    } catch (error: any) {
      console.error("Logout failed", error);
      // Even if server logout fails, clear the local state
      dispatch({ type: "CLEAR_USER" });
      throw error.response?.data?.error || "Logout error";
    } finally {
      setIsLording(false);
    }
  };

  // Signup function
  const signup = async (
    username: string,
    password: string,
    roles: string[]
  ) => {
    try {
      await axiosInstance.post("/users/signup", {
        username,
        password,
        roles,
      });
    } catch (error: any) {
      console.error("Signup failed", error);
      throw error.response?.data?.message || "Signup error";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        signup,
        isLording,
        setIsLording,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
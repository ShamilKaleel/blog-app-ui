import { createContext, useReducer, ReactNode, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Course, CreateCourse, UpdateCourse } from "@/types/course";

// Actions for Course
type CourseAction =
  | { type: "FETCH_COURSES"; payload: Course[] }
  | { type: "CREATE_COURSE"; payload: Course }
  | { type: "UPDATE_COURSE"; payload: Course }
  | { type: "DELETE_COURSE"; payload: number };

// Course state
interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [],
};

// Reducer
const courseReducer = (
  state: CourseState,
  action: CourseAction
): CourseState => {
  switch (action.type) {
    case "FETCH_COURSES":
      return { courses: action.payload };
    case "CREATE_COURSE":
      return { courses: [...state.courses, action.payload] };
    case "UPDATE_COURSE":
      return {
        courses: state.courses.map((course) =>
          course.courseId === action.payload.courseId ? action.payload : course
        ),
      };
    case "DELETE_COURSE":
      return {
        courses: state.courses.filter(
          (course) => course.courseId !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Context
export const CourseContext = createContext<{
  courseState: CourseState;
  fetchCourses: () => Promise<void>;
  createCourse: (course: CreateCourse) => Promise<void>;
  updateCourse: (id: number, course: UpdateCourse) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
  getCourseById: (id: number) => Promise<Course>;
} | null>(null);

// Provider
export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseState, dispatch] = useReducer(courseReducer, initialState);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses");
      dispatch({ type: "FETCH_COURSES", payload: response.data });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const createCourse = async (course: CreateCourse) => {
    try {
      const response = await axiosInstance.post<Course>("/courses", course);
      dispatch({ type: "CREATE_COURSE", payload: response.data });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const updateCourse = async (id: number, course: UpdateCourse) => {
    try {
      const response = await axiosInstance.put<Course>(
        `/courses/${id}`,
        course
      );
      dispatch({ type: "UPDATE_COURSE", payload: response.data });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      dispatch({ type: "DELETE_COURSE", payload: id });
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const getCourseById = async (id: number) => {
    try {
      const response = await axiosInstance.get<Course>(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courseState,
        fetchCourses,
        createCourse,
        updateCourse,
        deleteCourse,
        getCourseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

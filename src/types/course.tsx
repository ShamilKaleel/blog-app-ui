export interface Course {
  courseId: number;
  courseName: string;
  description: string;
  courseFee: string;
}

export interface CreateCourse {
  courseName: string;
  description: string;
  courseFee: string;
}

export interface UpdateCourse {
  courseName?: string;
  description?: string;
  courseFee?: string;
}

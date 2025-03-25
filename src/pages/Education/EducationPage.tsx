import { useEffect, useState } from "react";
import { useCourse } from "@/hooks/useCourse";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
export default function CoursesPage() {
  const { courseState, fetchCourses, createCourse, deleteCourse } = useCourse();
  const { toast } = useToast();
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    description: "",
    courseFee: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async () => {
    try {
      await createCourse(newCourse);
      toast({
        title: "Course created",
        description: "Schedule deleted successfully",
      });
      setNewCourse({ courseName: "", description: "", courseFee: "" });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.details?.error || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourseCourse = async (courseId: number) => {
    try {
      await deleteCourse(courseId);
      toast({
        title: "Course deleted",
        description: "Course deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting Course:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.details?.error || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-0 px-8 pb-8 mt-10">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {/* Course Creation Form */}
      <div className="mb-6 p-4 border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Create New Course</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Course Name</Label>
            <Input
              name="courseName"
              value={newCourse.courseName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Course Fee</Label>
            <Input
              name="courseFee"
              value={newCourse.courseFee}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button className="mt-4" onClick={handleCreateCourse}>
          Create Course
        </Button>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-3 gap-4">
        {courseState.courses.map((course) => (
          <Card key={course.courseId} className="p-4 shadow-lg">
            <CardContent>
              <h2 className="text-lg font-semibold">{course.courseName}</h2>
              <p>{course.description}</p>
              <p className="text-green-600 font-bold">
                Fee: {course.courseFee}
              </p>
              <Button
                className="mt-2 bg-red-500 text-white"
                onClick={() => handleDeleteCourseCourse(course.courseId)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

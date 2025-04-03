import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lorder from "@/components/Lorder";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
// Schema validation using Zod
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email cannot exceed 50 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password cannot exceed 40 characters"),
});

// Infer the form values' types from the schema
type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize React Hook Form with Zod resolver and default values
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",

      password: "",
    },
    resolver: zodResolver(schema),
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Send a POST request to the signup API endpoint
      await axiosInstance.post("/users/signup", {
        username: data.username,
        email: data.email,

        password: data.password,
      });
      navigate("/login");
      toast({
        title: "Signup Successful!",
        description: "Please login.",
      });
    } catch (error: any) {
      // Handle API error response
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <div className="flex justify-center flex-col h-screen w-full items-center">
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold  top-10 left-10 pb-10"
      >
        <span className="text-2xl font-bold ">Bloggie</span>
      </Link>
      <div className="px-8 py-16">
        <h1 className="text-2xl font-bold text-center mb-5">Signup</h1>

        {/* Form for username, email, role, and password input */}
        <form
          className="flex flex-col gap-5 w-[300px]"
          onSubmit={handleSubmit(onSubmit)} // Attach form submission handler
        >
          {/* Username input field */}
          <div className="flex flex-col items-start relative">
            <label htmlFor="username" className="pl-1">
              Username
            </label>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
            />
            {/* Display username validation error */}
            <p className="text-red-500 absolute top-16 text-xs text-center pl-1 ">
              {errors.username?.message}
            </p>
          </div>

          {/* Email input field */}
          <div className="flex flex-col items-start relative">
            <label htmlFor="email" className="pl-1">
              Email
            </label>
            <Input {...register("email")} type="email" placeholder="Email" />
            {/* Display email validation error */}
            <p className="text-red-500 absolute top-16 text-xs text-center pl-1">
              {errors.email?.message}
            </p>
          </div>

          {/* Role input field */}

          {/* Password input field */}
          <div className="flex flex-col items-start relative">
            <label htmlFor="password" className="pl-1">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {/* Display password validation error */}
            <p className="text-red-500 absolute top-16 text-xs text-center pl-1 ">
              {errors.password?.message}
            </p>
          </div>

          {/* Submit button with loader */}
          <div className="w-full pt-5 relative">
            <Button
              disabled={isSubmitting} // Disable button during submission
              type="submit"
              className="mx-auto w-full"
            >
              {isSubmitting ? <Lorder /> : "Submit"} {/* Show loader or text */}
            </Button>
            {/* Display form-level error message */}
            <p className="text-center block mt-5">
              Already have an account?{" "}
              <Link to="/" className=" underline text-gray-500">
                Login
              </Link>
            </p>

            <p className=" text-center text-red-500  pl-1 absolute top-32 left-0 right-0">
              {errors.root?.message}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosInstance";
import Logo from "@/assets/images/Logo.png";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define the validation schema using Zod
const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
});

// Define the type for form data
type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

const ForgetPasswordPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ForgetPasswordFormData> = async (data) => {
    try {
      // Send a POST request to the forgot password API endpoint
      await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
      });
      toast({
        title: "Password Reset Requested",
        description: "Check your email for password reset instructions.",
      });
      setSuccessMessage("Check your mail for password reset instructions.");
    } catch (error: any) {
      console.log(error);
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Forgot password error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5  relative">
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold absolute top-20 pb-10"
      >
        <img src={Logo} className="h-10 w-10" />
        <span className="text-2xl font-bold ">DN Dental</span>
      </Link>
      <Card className="p-8 shadow-md w-full max-w-md">
        {successMessage ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Check your email
            </h2>
            <p className="text-primary text-center mb-6">{successMessage}</p>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-center mb-6">
              Forgot Password
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border focus:outline-none`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4`}
            >
              {isSubmitting ? "Submitting..." : "Reset Password"}
            </Button>
            <p className="text-red-500 text-sm mt-1">{errors.root?.message}</p>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;

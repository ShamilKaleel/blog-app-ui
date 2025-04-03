import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout Successful",
        description: "You have been logged out successfully",
        
      });
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.details?.error || "An error occurred",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <div className="flex flex-col  mx-auto">
      {isOpen && (
        <ResponsiveDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Logout"
          description="Are you sure you want to log out?"
        >
          <div className="grid grid-flow-col gap-5 px-4">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
            <Button onClick={handleLogout} variant="default" className="w-full">
              Logout
            </Button>
          </div>
        </ResponsiveDialog>
      )}
      <ScrollToTop />
      <Header setIsOpen={setIsOpen} />
      <div className="mt-[120px] xl:mt-[68px]">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

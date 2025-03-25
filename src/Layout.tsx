import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
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

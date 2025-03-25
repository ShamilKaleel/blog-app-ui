import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "@/assets/images/Logo.png";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { CircleUser, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ChildProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<ChildProps> = ({ setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Education", path: "/education" },
    { title: "Lands", path: "/lands" },
    { title: "Jobs", path: "/jobs" },
    { title: "Community", path: "/community" },
  ];

  const { authState } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed w-full flex justify-between items-center py-4 px-4 md:px-6 z-30 transition-all border-b bg-white dark:bg-black">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 duration-300">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl md:text-2xl text-primary">
          AgriConnect
        </span>
      </Link>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 ${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden`}
        onClick={toggleMenu}
      />

      {/* Navigation Menu */}
      <ul
        className={`
          fixed top-0 left-0 w-64 h-full bg-white dark:bg-black 
          transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:flex lg:w-auto lg:h-auto lg:bg-transparent
          flex flex-col lg:flex-row gap-4 p-6 lg:p-0
        `}
      >
        <div className="flex justify-between items-center lg:hidden mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-primary">AgriConnect</span>
          </Link>
          <button onClick={toggleMenu} className="text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {navLinks.map((navLink, index) => (
          <li key={index} className="w-full lg:w-auto">
            <NavLink
              to={navLink.path}
              className={({ isActive }) =>
                `block w-full lg:w-auto py-2 lg:py-0 ${
                  isActive
                    ? "text-primary font-semibold underline underline-offset-8"
                    : "text-muted-foreground hover:text-primary"
                } transition-all`
              }
              onClick={toggleMenu}
            >
              {navLink.title}
            </NavLink>
          </li>
        ))}

        {/* Mobile Auth Buttons */}
        {!authState && (
          <div className="mt-auto lg:hidden space-y-4">
            <Link
              to="/signup"
              className="block w-full text-center text-primary border-2 border-primary hover:border-gray-500 py-2 rounded-lg"
              onClick={toggleMenu}
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        )}
      </ul>

      {/* Desktop Auth and Theme Toggle */}
      <div className="flex items-center font-semibold gap-4">
        {/* Auth Buttons for Desktop */}
        {!authState && (
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/signup"
              className="text-primary px-6 py-2 border-2 border-primary hover:border-gray-500 rounded-lg"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
            >
              Login
            </Link>
          </div>
        )}

        {/* User Dropdown for Authenticated Users */}
        {authState && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Theme Toggle for Desktop */}
        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu and Theme Toggle Buttons */}
      <div className="lg:hidden flex items-center gap-4">
        <button onClick={toggleMenu} className="lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;

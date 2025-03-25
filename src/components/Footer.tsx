import Logo from "@/assets/images/Logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
export default function Footer() {
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  const socialLinks = [
    {
      title: "Facebook",
      logo: <FaFacebook className="mr-2 text-xl" />,
      link: "https://facebook.com",
    },
    {
      title: "Twitter",
      logo: <FaTwitter className="mr-2 text-xl" />,
      link: "https://twitter.com",
    },
    {
      title: "Instagram",
      logo: <FaInstagram className="mr-2 text-xl" />,
      link: "https://instagram.com",
    },
    {
      title: "YouTube",
      logo: <FaYoutube className="mr-2 text-xl" />,
      link: "https://youtube.com",
    },
  ];

  const contactUs = [
    {
      title: "236, Colombo street, Colombo, Sri Lanka",
    },
    {
      title: "+94 771626369",
    },
    {
      title: "DnDentalClinic@gmail.com",
    },
  ];

  return (
    <>
      <footer className=" w-full  xl:px-[120px]  mx-auto grid  md:grid-cols-1 lg:grid-cols-5 gap-20 lg:gap-5 pt-20 pb-20 lg:pb-20  text-white px-5 bg-primary mt-32">
        <div className="flex flex-col gap-8 col-span-1 lg:col-span-2  items-center lg:items-start">
          <div className="flex items-center justify-center gap-1  duration-300">
            <img src={Logo} alt="Logo" />
            <span className="font-bold text-2xl pl-1 ">DN Dental Clinic</span>
          </div>
          <p className="pl-3  lg:max-w-[300px] text-center lg:text-start  hidden lg:inline-block ">
            Copyright © DN Dental Clinic | All Rights Reserved{" "}
          </p>
        </div>

        <div className=" flex flex-col items-center lg:items-start gap-8  col-span-1  ">
          <h1 className="font-bold text-xl py-2 ">Pages</h1>
          <ul className="flex flex-col  items-center lg:items-start gap-4 ">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <Link
                  to={navLink.path}
                  className="hover:underline hover:opacity-50 duration-300 "
                >
                  {navLink.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8 items-center lg:items-start col-span-1 ">
          <h1 className="font-bold text-xl py-2">Follow Us</h1>
          <ul className="flex flex-col  lg:items-start gap-4 ">
            {socialLinks.map((socialLink, index) => (
              <li key={index}>
                <a
                  href={socialLink.link}
                  target="_blank"
                  className="hover:underline hover:opacity-50 duration-300 flex items-center gap-2"
                >
                  {socialLink.logo}
                  {socialLink.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-8   col-span-1  ">
          <h1 className="font-bold text-xl py-2">Contact Us</h1>
          <ul className="flex flex-col items-center lg:items-start gap-4  text-center lg:text-start">
            {contactUs.map((contact, index) => (
              <li key={index}>{contact.title}</li>
            ))}
          </ul>
        </div>
        <div className=""></div>
      </footer>
      <p className="pl-3  lg:max-w-[300px] text-center lg:text-start lg:hidden text-primary py-5">
        Copyright © DN Dental Clinic | All Rights Reserved{" "}
      </p>
    </>
  );
}

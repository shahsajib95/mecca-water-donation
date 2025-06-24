// import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { AuthSideBanner } from "./components/auth-banner";
import { LoginForm } from "./components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginScreen() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full p-4 bg-transparent  z-50">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          {/* <img src="/Cis_finel_logo.png" className="h-10" /> */}
          {/* <span className="ms-2">Qatrat</span> */}
        </Link>
        <ModeToggle />
      </div>
      <div className=" grid h-full w-full grid-cols-1 items-center justify-between 	 gap-5 lg:grid-cols-2">
        <AuthSideBanner />
        <LoginForm />
      </div>
    </>
  );
}

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const NonAuth = () => {
  return (
    <div className="md:py-[40px] md:px-[48px] py-[20px] px-[24px]">
      <Header />
      <div className="pb-[200px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default NonAuth;


import moment from "moment";

import { Navigate } from "react-router-dom";

import { checkTimeGapBetweenTwo } from "../../utils/time";
import { useAppSelector } from "@/store/store";
import MainLayout from "@/layout/main-layout";

const PrivateWrapper = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const checkTokenTime = checkTimeGapBetweenTwo(
    moment().format(),
    // decodedToken?.exp * 1000,
    user?.user?.tokens?.access?.token,
    "seconds"
  );

  if (!isLoggedIn || !user?.user?.tokens?.access?.token || checkTokenTime < 0) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <MainLayout />;
};

export default PrivateWrapper;

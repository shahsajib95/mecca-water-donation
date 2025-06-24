/* eslint-disable react-refresh/only-export-components */
import { PageLoader } from "@/components/loader/page-loader";
import AuthLayout from "@/layout/auth-layout";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./error/error-screen";
import LoginScreen from "./auth/login-screen";
import Home from "./home";
import NonAuth from "@/layout/NonAuth";
import Product from "./products";
import Cart from "./cart";
import OrdersPage from "./orders";
import ProductDetails from "./product-details";
import ProfilePage from "./profile";
import CommingSoon from "./comming-soon";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginScreen />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <NonAuth />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "product",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrdersPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "media",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CommingSoon />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

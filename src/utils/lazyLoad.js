import { lazy } from "react";

// lazy pages
export const LoginPage = lazy(() => import("../pages/Login/LoginPage"));
export const SignupPage = lazy(() => import("../pages/Signup/SignupPage"));
export const DropsPage = lazy(() => import("../pages/Drop/DropPage"));

import BaseLayout from "../../../components/layout/BaseLayout";
import { Navigate } from "react-router-dom";

import { Signin } from "../../../pages/Authentication/Signin";

import { Suspense, lazy } from "react";
import SuspenseLoader from "./../../../components/pages/SuspenseLoader/index";

import { RouteObject } from "react-router";
import { Signup } from "../../../pages/Authentication/Signup";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Status404 = Loader(lazy(() => import("./../../../pages/Status404")));

export const authRoutes: RouteObject[] = [
  {
    path: "*",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Navigate to='login' replace />,
      },
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];

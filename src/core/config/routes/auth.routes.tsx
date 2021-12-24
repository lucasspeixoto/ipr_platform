import BaseLayout from "@components/layout/BaseLayout";
import { Navigate } from "react-router-dom";

import { Signin } from "@pages/authentication/Signin";

/* import { Suspense, lazy } from "react";
import SuspenseLoader from "@components/pages/SuspenseLoader/index"; */

import { RouteObject } from "react-router";
import { Signup } from "@pages/authentication/Signup";
import { ForgotPassword } from "@pages/authentication/ForgotPassword";

/* const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Status404 = Loader(lazy(() => import("./../../../pages/Status404"))); */

export const authRoutes: RouteObject[] = [
  {
    path: "*",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "*",
        element: <Navigate to='' replace />,
      },
    ],
  },
];

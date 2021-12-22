import SidebarLayout from "../../../components/layout/SidebarLayout";
import { Navigate } from "react-router-dom";
import { Resume } from "../../../pages/Resume";

import { Suspense, lazy } from "react";
import SuspenseLoader from "./../../../components/pages/SuspenseLoader/index";

import { RouteObject } from "react-router";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Status404 = Loader(lazy(() => import("./../../../pages/Status404")));

export const appRoutes: RouteObject[] = [
  {
    path: "registration",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to='/registration/resume' replace />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "personal",
        element: <div>Personal</div>,
      },
      {
        path: "supplementary",
        element: <div>Complementares</div>,
      },
      {
        path: "ecclesiastical",
        element: <div>Eclesiásticos</div>,
      },
    ],
  },
  {
    path: "admin",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to='/admin/detail' replace />,
      },
      {
        path: "detail",
        element: <Resume />,
      },
      {
        path: "statistics",
        element: <div>Estatisticas</div>,
      },
      {
        path: "data",
        element: <div>Dados</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Status404 />,
  },
];

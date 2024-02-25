import { Suspense, lazy } from "react";
import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { LoginPage } from "@/pages/login-page";
import { PrivateRoute } from "@/shared/ui/private-route";
import { DashboardLayout } from "@/pages/dashboard-layout";

import { GridLoader } from "react-spinners";

const ReplenishmentsPage = lazy(async () =>
    import("@/pages/replenishments-page").then(module => ({
        default: module.ReplenishmentsPage
    }))
);

const WithdrawPage = lazy(async () =>
    import("@/pages/withdrawal-page").then(module => ({
        default: module.WithdrawalPage
    }))
);

const BalancePage = lazy(async () =>
    import("@/pages/balance-page").then(module => ({
        default: module.BalancePage
    }))
);

const RequisitePage = lazy(async () =>
    import("@/pages/requisite-page").then(module => ({
        default: module.RequisitePage
    }))
);

const router = createBrowserRouter([
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "replenishment",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <ReplenishmentsPage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "withdraw",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <WithdrawPage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "balance",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <BalancePage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "requisite",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <RequisitePage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "*",
                element: <Navigate to="/dashboard/replenishment" />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
]);

export const ReactRouterProvider = () => {
    return <Provider router={router} />;
};

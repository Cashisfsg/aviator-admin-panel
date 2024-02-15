import { Suspense, lazy } from "react";
import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { LoginPage } from "@/pages/login-page";

import { PrivateRoute } from "@/shared/ui/private-route";

const DashboardPage = lazy(async () =>
    import("@/pages/dashboard-page").then(module => ({
        default: module.DashboardPage
    }))
);

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
        element: (
            <Suspense fallback={<pre>Loading...</pre>}>
                <DashboardPage />
            </Suspense>
        ),
        children: [
            {
                path: "replenishment",
                element: (
                    <Suspense fallback={<pre>Loading...</pre>}>
                        <PrivateRoute asChild>
                            <ReplenishmentsPage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "withdraw",
                element: (
                    <Suspense fallback={<pre>Loading...</pre>}>
                        <PrivateRoute asChild>
                            <WithdrawPage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "balance",
                element: (
                    <Suspense fallback={<pre>Loading...</pre>}>
                        <PrivateRoute asChild>
                            <BalancePage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "requisite",
                element: (
                    <Suspense fallback={<pre>Loading...</pre>}>
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

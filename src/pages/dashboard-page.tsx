import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { NavigationPanel } from "@/shared/ui/navigation-panel";

const links = [
    { id: 1, label: "Пополнения", uri: "/dashboard/replenishment" },
    { id: 2, label: "Выводы", uri: "/dashboard/withdraw" },
    { id: 3, label: "Пополнить баланс", uri: "/dashboard/balance" },
    { id: 4, label: "Реквизиты", uri: "/dashboard/requisite" }
];

export const DashboardPage = () => {
    return (
        <>
            <header>1000 USDT</header>
            <NavigationPanel links={links} />
            <main>
                <Suspense fallback={<pre>Suspense loading</pre>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};

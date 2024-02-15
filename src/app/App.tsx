import { Suspense, lazy } from "react";
import "./App.css";

const ReactRouterProvider = lazy(async () =>
    import("@/app/providers/react-router-provider").then(module => ({
        default: module.ReactRouterProvider
    }))
);

export const App = () => {
    return (
        <Suspense fallback={<pre className="text-red-500">Loading...</pre>}>
            <ReactRouterProvider />
        </Suspense>
    );
};

import { useAuth } from "@/app/providers/redux-provider";
import {
    useFetchAllReplenishmentsQuery,
    Replenishment
} from "@/entities/replenishment";
import { ScaleLoader } from "react-spinners";

interface FetchReplenishmentsProps {
    queryParams?: Parameters<typeof useFetchAllReplenishmentsQuery>[0];
    renderSuccess: (replenishments: Replenishment[]) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchReplenishments: React.FC<FetchReplenishmentsProps> = ({
    queryParams = JSON.parse(sessionStorage.getItem("elapsedDateTime") || ""),
    renderSuccess,
    loadingFallback = (
        <div className="flex w-full items-center justify-center px-3">
            <ScaleLoader color="rgb(54, 215, 183)" />
        </div>
    ),
    renderError = error => (
        <pre className="self-center text-center text-red-700">
            {error || "Неизвестная ошибка"}
        </pre>
    )
}) => {
    const { isAuthenticated } = useAuth();
    const { data, isLoading, isError, error } = useFetchAllReplenishmentsQuery(
        queryParams,
        { skip: !isAuthenticated }
    );

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error?.data?.message);

    if (data) return renderSuccess(data);

    return <pre>Нет данных</pre>;
};

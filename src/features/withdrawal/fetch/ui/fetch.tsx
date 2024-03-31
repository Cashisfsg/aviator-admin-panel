import { useFetchAllWithdrawalsQuery, Withdrawal } from "@/entities/withdrawal";
import { useAuth } from "@/app/providers/redux-provider";
import { ScaleLoader } from "react-spinners";

interface FetchWithdrawalProps {
    queryParams?: Parameters<typeof useFetchAllWithdrawalsQuery>[0];
    renderSuccess: (withdrawals: Withdrawal[]) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchWithdrawal: React.FC<FetchWithdrawalProps> = ({
    queryParams = {
        startDate: JSON.parse(sessionStorage.getItem("elapsedDateTime") || "")
    },
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

    const { data, isLoading, isError, error } = useFetchAllWithdrawalsQuery(
        queryParams,
        { skip: !isAuthenticated, pollingInterval: 60000 }
    );

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error?.data?.message);

    if (data) return renderSuccess(data);

    return <pre>Нет данных</pre>;
};

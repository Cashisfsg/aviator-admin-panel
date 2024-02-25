import { Replenishment } from "@/entities/replenishment";

import React from "react";

interface FetchReplenishmentsProps {
    queryParams?: Parameters<typeof useFetchAllReplenishmentsQuery>[0];
    renderSuccess: (replenishments: Replenishment[]) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchReplenishments: React.FC<FetchReplenishmentsProps> = ({
    queryParams,
    renderSuccess,
    loadingFallback = <pre>Загрузка...</pre>,
    renderError = error => (
        <pre className="self-center text-center text-red-700">
            {error || "Неизвестная ошибка"}
        </pre>
    )
}) => {
    const { data, isLoading, isError, error } =
        useFetchAllReplenishmentsQuery(queryParams);

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error?.data?.message);

    if (data) return renderSuccess(data);

    return <pre>Нет данных</pre>;
};

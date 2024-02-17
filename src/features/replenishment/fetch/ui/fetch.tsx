import { useFetchAllReplenishmentsQuery } from "@/entities/replenishment";
import { ReplenishmentsTable } from "@/entities/replenishment";

import { columns } from "../model/columns";

export const FetchReplenishments = () => {
    const { data, isLoading, isError, error } =
        useFetchAllReplenishmentsQuery(undefined);

    if (isLoading) return <pre>Loading...</pre>;

    if (isError)
        return (
            <pre className="self-center text-center text-red-700">
                {error?.data?.message || "Неизвестная ошибка"}
            </pre>
        );

    if (data)
        return (
            <ReplenishmentsTable
                data={data}
                columns={columns}
            />
        );

    return <pre>Нет данных</pre>;
};

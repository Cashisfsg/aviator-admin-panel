import { useFetchAllReplenishmentsQuery } from "@/entities/replenishment";

import { formatOrdinals } from "@/shared/lib";

export const ReplenishmentCounter = () => {
    const { data: replenishments } = useFetchAllReplenishmentsQuery();

    return (
        <span className="text-slate-500">
            {replenishments
                ? formatOrdinals(replenishments.length)
                : "0 заявок"}
        </span>
    );
};

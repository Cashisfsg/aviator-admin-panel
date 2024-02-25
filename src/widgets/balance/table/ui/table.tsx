import { BalanceTable } from "@/entities/balance";
import { columns } from "../model/columns";

export const BalanceTableWidget = () => {
    return (
        <BalanceTable
            data={[]}
            columns={columns}
        />
    );
};

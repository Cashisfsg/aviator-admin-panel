import { PageHeader } from "@/widgets/page-header";

import { DepositAddress } from "@/widgets/balance/deposit-address";
import { BalanceTableWidget } from "@/widgets/balance/table";
import { TableFooter } from "@/widgets/table-footer";

import { TableProvider, TableLayoutWithoutSidebar } from "@/shared/ui/table";

export const BalancePage = () => {
    return (
        <article className="rounded-xl bg-slate-200 px-3 py-6 text-black">
            <PageHeader>Пополнение баланса</PageHeader>

            <TableProvider>
                <TableLayoutWithoutSidebar>
                    <header className="flex items-center justify-between rounded-t-lg bg-green-100 px-3 py-4">
                        <h2 className="text-xl leading-none ">
                            История пополнения баланса
                        </h2>
                    </header>

                    <DepositAddress />

                    <div className="mt-4 space-y-4 px-3">
                        <h3 className="text-lg font-semibold">
                            История пополнений
                        </h3>
                        <BalanceTableWidget />
                    </div>

                    <TableFooter />

                    {/* <FetchRequisite /> */}
                </TableLayoutWithoutSidebar>
            </TableProvider>
        </article>
    );
};

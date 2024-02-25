import { PageHeader } from "@/widgets/page-header";
import { ClipboardCopy } from "@/shared/ui";
import { TableLayoutWithoutSidebar } from "@/shared/ui/table";

import { BalanceTableWidget } from "@/widgets/balance/table";
import { TableProvider } from "@/shared/ui/table";
import { TableFooter } from "@/widgets/table-footer";

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

                    <div className="space-y-4 px-3">
                        <h3 className="text-lg font-semibold">
                            Ваш адрес для пополнения баланса, USDT (TRC20)
                        </h3>
                        <div className="flex items-center gap-x-4">
                            <span className="w-1/2 rounded-md border border-gray-300 px-2 py-1.5">
                                dhfajskdjbadshcb2b1231838e29013ieoajsdaoisdj
                            </span>
                            <ClipboardCopy
                                textToCopy="dhfajskdjbadshcb2b1231838e29013ieoajsdaoisdj"
                                className="rounded-md bg-lime-500 px-2 py-2 font-semibold leading-none text-white transition-colors duration-150 hover:bg-lime-400"
                            >
                                Скопировать
                            </ClipboardCopy>
                        </div>
                    </div>

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

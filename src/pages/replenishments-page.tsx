import { Outlet } from "react-router-dom";
import { PageHeader } from "@/widgets/page-header";
import { TableFooter } from "@/widgets/table-footer";
import { ReplenishmentsTableWidget } from "@/widgets/replenishment/table";
import { ReplenishmentCategoryFilterWidget } from "@/widgets/replenishment/category-filter";
import { GlobalFilter } from "@/features/user/filtrate";
import { ReplenishmentPeriodSelector } from "@/features/replenishment/period-selector";
import { ReplenishmentCounter } from "@/features/replenishment/count";
import {
    TableLayoutWithSidebar,
    TableProvider,
    TableSidebar
} from "@/shared/ui/table";
import { Dialog } from "@/shared/ui/dialog";
import { ConfirmReplenishmentDialog } from "@/features/replenishment/confirm";

export const ReplenishmentsPage = () => {
    return (
        <>
            <article className="rounded-xl bg-slate-200 px-3 py-6 text-black">
                <TableProvider>
                    <PageHeader>Выберите заявку на пополнение</PageHeader>
                    <TableLayoutWithSidebar>
                        <header className="flex flex-wrap items-center gap-4 rounded-lg bg-white px-3 py-2">
                            <GlobalFilter />
                            <ReplenishmentCounter />
                            <ReplenishmentPeriodSelector />
                        </header>

                        <Dialog>
                            <ReplenishmentsTableWidget />
                            <ConfirmReplenishmentDialog />
                        </Dialog>

                        <TableSidebar>
                            <ReplenishmentCategoryFilterWidget />
                        </TableSidebar>

                        <TableFooter className="col-start-1 col-end-3" />
                    </TableLayoutWithSidebar>
                </TableProvider>
            </article>

            <Outlet />
        </>
    );
};

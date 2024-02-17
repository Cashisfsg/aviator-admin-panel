import { FetchReplenishments } from "@/features/replenishment/fetch";
import { Header } from "./header";
import { TableLayoutWithSidebar } from "@/shared/ui/table/table-layout-with-sidebar";
import { CategoryFilter, GlobalFilter } from "@/features/user/filtrate";
import { ReplenishmentCounter } from "@/features/replenishment/count";
import { TableSidebarFilters } from "@/shared/ui/table/table-sidebar-filters";
import { TableProvider } from "@/shared/ui/table/table-provider";
import { RowsPerPageSelector } from "@/shared/ui/table/rows-pre-page-selector";
import { Pagination } from "@/shared/ui/table/pagination";
import { PageNavigator } from "@/shared/ui/table/page-navigator";

export const ReplenishmentWidget = () => {
    return (
        <TableProvider>
            <Header>Выберите заявку на пополнение</Header>
            <TableLayoutWithSidebar>
                <header className="flex items-center gap-x-4 rounded-lg bg-white px-3 py-2">
                    <GlobalFilter />
                    <ReplenishmentCounter />
                </header>

                <FetchReplenishments />
                <TableSidebarFilters>
                    <CategoryFilter />
                </TableSidebarFilters>

                <footer className="col-start-1 col-end-3 grid grid-cols-3 items-center px-2">
                    <RowsPerPageSelector />
                    <Pagination />
                    <PageNavigator />
                </footer>
            </TableLayoutWithSidebar>
        </TableProvider>
    );
};

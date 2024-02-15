import { Header } from "@/widgets/header";
import { FetchReplenishments } from "@/widgets/fetch-replenishments";
import { GlobalFilter } from "@/features/user/filtrate";
import { ReplenishmentCounter } from "@/features/replenishment/count";
import { TableLayoutWithSidebar } from "@/shared/ui/table/table-layout-with-sidebar";
import { TableSidebarFilters } from "@/shared/ui/table/table-sidebar-filters";
import { CategoryFilter } from "@/features/user/filtrate";

const categories = [
    { value: "", label: "Все" },
    { value: "Активные", label: "Активные" },
    { value: "Завершённые", label: "Завершенные" },
    { value: "Успешно вы", label: "Успешно выполненные" }
];

export const ReplenishmentsPage = () => {
    return (
        <article className="rounded-xl bg-slate-200 px-2 py-6 text-black">
            <Header>Выберите заявку на пополнение</Header>
            <TableLayoutWithSidebar>
                <header className="flex items-center gap-x-4 rounded-lg bg-white px-3 py-2">
                    <GlobalFilter />
                    <ReplenishmentCounter />
                </header>

                <FetchReplenishments />
                {/* <StatusBar /> */}
                <TableSidebarFilters>
                    <CategoryFilter
                        categories={categories}
                        onFilterChange={console.log}
                    />
                </TableSidebarFilters>
            </TableLayoutWithSidebar>
        </article>
    );
};

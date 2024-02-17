import { cn } from "@/shared/lib/tailwind-merge";

import { CategoryFilterList } from "./category-filter-list";

interface CategoryFilterProps extends React.ComponentProps<"div"> {}

const categories = [
    { value: "", label: "Все" },
    { value: "Ожидает оплаты", label: "Активные" },
    { value: "Отменена", label: "Завершенные" },
    { value: "Успешно завершено", label: "Успешно выполненные" }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={cn("sticky top-4 rounded-lg bg-white p-2", className)}
            {...props}
        >
            <h3 className="text-center text-lg font-medium">Статусы</h3>
            <CategoryFilterList categories={categories} />
        </div>
    );
};

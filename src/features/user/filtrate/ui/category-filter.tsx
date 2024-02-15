import { cn } from "@/shared/lib/tailwind-merge";

import { CategoryFilterList } from "./category-filter-list";
import { Category } from "./category-filter-item";

interface CategoryFilterProps extends React.ComponentProps<"div"> {
    categories: Category[];
    onFilterChange: (value: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    className,
    onFilterChange,
    ...props
}) => {
    return (
        <div
            className={cn("rounded-lg bg-white p-2", className)}
            {...props}
        >
            <h3 className="text-center text-lg font-medium">Статусы</h3>
            <CategoryFilterList
                categories={categories}
                onFilterChange={onFilterChange}
            />
        </div>
    );
};

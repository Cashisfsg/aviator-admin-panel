import { useRef } from "react";

import { useTableContext } from "@/shared/ui/table/use-table-context";
import { cn } from "@/shared/lib/tailwind-merge";

import { CategoryFilterItem, Category } from "./category-filter-item";

interface CategoryFilterListProps extends React.ComponentProps<"ul"> {
    categories: Category[];
}
export const CategoryFilterList: React.FC<CategoryFilterListProps> = ({
    className,
    categories,
    ...props
}) => {
    const { table } = useTableContext();
    const currentCategoryIndex = useRef(0);

    const onClickHandler = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        value: string,
        index: number
    ) => {
        const filterElementsList = event.currentTarget.parentElement?.children;

        if (!filterElementsList) return;

        filterElementsList[currentCategoryIndex.current].setAttribute(
            "aria-selected",
            "false"
        );
        event.currentTarget.setAttribute("aria-selected", "true");
        currentCategoryIndex.current = index;

        table?.setColumnFilters([{ id: "status", value: value }]);
    };

    return (
        <ul
            className={cn("", className)}
            {...props}
        >
            {categories.map((category, i) => (
                <CategoryFilterItem
                    key={category.value}
                    category={category}
                    onClick={event => onClickHandler(event, category.value, i)}
                    aria-selected={currentCategoryIndex.current === i}
                />
            ))}
        </ul>
    );
};

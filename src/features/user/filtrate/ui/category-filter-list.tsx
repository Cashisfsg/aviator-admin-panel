import { useRef } from "react";

import { cn } from "@/shared/lib/tailwind-merge";

import { CategoryFilterItem, Category } from "./category-filter-item";

interface CategoryFilterListProps extends React.ComponentProps<"ul"> {
    categories: Category[];
    onFilterChange: (value: string) => void;
}
export const CategoryFilterList: React.FC<CategoryFilterListProps> = ({
    className,
    categories,
    onFilterChange,
    ...props
}) => {
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

        onFilterChange(value);
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

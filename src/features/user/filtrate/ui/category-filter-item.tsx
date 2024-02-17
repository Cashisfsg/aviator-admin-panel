import { useMemo } from "react";
import { useFetchAllReplenishmentsQuery } from "@/entities/replenishment";

export interface Category {
    value: string;
    label: string;
}

interface CategoryFilterItemProps extends React.ComponentProps<"li"> {
    category: Category;
}

export const CategoryFilterItem: React.FC<CategoryFilterItemProps> = ({
    category,
    ...props
}) => {
    const { data: replenishments } = useFetchAllReplenishmentsQuery();
    const amount = useMemo(() => {
        if (category.value === "") return replenishments?.length;

        return replenishments?.filter(
            replenishment =>
                replenishment.status.toLowerCase() ===
                category.value.toLocaleLowerCase()
        ).length;
    }, [category.value, replenishments]);

    return (
        <li
            className="cursor-pointer text-nowrap first-letter:uppercase aria-selected:font-medium aria-selected:text-blue-500"
            {...props}
        >
            {category.label} ({amount})
        </li>
    );
};

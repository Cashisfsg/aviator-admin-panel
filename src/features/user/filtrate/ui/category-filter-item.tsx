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
    return (
        <li
            className="cursor-pointer text-nowrap first-letter:uppercase aria-selected:font-medium aria-selected:text-blue-500"
            {...props}
        >
            {category.label}
        </li>
    );
};

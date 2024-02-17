import { cn } from "@/shared/lib/tailwind-merge";

interface TableSidebarFiltersProps extends React.ComponentProps<"aside"> {}

export const TableSidebarFilters: React.FC<TableSidebarFiltersProps> = ({
    className,
    ...props
}) => {
    return (
        <aside
            className={cn(
                "col-start-2 col-end-3 row-start-1 row-end-3 min-w-56",
                className
            )}
            {...props}
        />
    );
};

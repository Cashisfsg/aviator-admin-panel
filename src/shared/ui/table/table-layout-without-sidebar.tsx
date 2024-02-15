import { cn } from "@/shared/lib/tailwind-merge";

interface TableLayoutWithoutSidebarProps
    extends React.ComponentProps<"section"> {}

export const TableLayoutWithoutSidebar: React.FC<
    TableLayoutWithoutSidebarProps
> = ({ className, ...props }) => {
    return (
        <section
            className={cn("rounded-lg bg-white pb-6", className)}
            {...props}
        />
    );
};

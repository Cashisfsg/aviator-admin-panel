import { LogoutButton } from "@/features/user/logout";
import { cn } from "@/shared/lib/tailwind-merge";

interface HeaderProps extends React.ComponentProps<"header"> {}

export const Header: React.FC<HeaderProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <header
            className={cn(
                "flex items-center justify-between leading-none",
                className
            )}
            {...props}
        >
            <h1 className="text-2xl leading-none">{children}</h1>
            <span>
                Добро пожаловать, User123
                <LogoutButton>Выйти</LogoutButton>
            </span>
        </header>
    );
};

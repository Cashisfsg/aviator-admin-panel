import { useNavigate } from "react-router-dom";

import { useAppDispatch, logout } from "@/app/providers/redux-provider";
import { cn } from "@/shared/lib/tailwind-merge";

interface LogoutButtonProps extends React.ComponentProps<"button"> {}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    className,
    onClick,
    ...props
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        dispatch(logout());

        onClick?.(event);

        navigate("/login", { replace: true });
    };

    return (
        <button
            className={cn(
                "ml-2 cursor-pointer font-semibold text-blue-500",
                className
            )}
            onClick={onClickHandler}
            {...props}
        />
    );
};

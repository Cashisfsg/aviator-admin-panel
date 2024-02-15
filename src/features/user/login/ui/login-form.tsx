import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useLoginMutation } from "@/app/providers/redux-provider";

import { ImSpinner9 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";

interface LoginFormProps extends React.ComponentProps<"form"> {}

interface FormFields {
    login: HTMLInputElement;
    password: HTMLInputElement;
}

export const LoginForm: React.FC<LoginFormProps> = ({ ...props }) => {
    const [isError, setIsError] = useState(false);
    const [signin, { isSuccess, isLoading, error }] = useLoginMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();
        setIsError(false);

        const { login, password } = event.currentTarget;
        const response = await signin({
            login: login.value,
            password: password.value
        });

        if (!response?.error) return;

        setIsError(true);
    };

    const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setIsError(false);
    };

    if (isSuccess) {
        return <Navigate to="/dashboard/replenishment" />;
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className="grid w-full gap-y-4 px-2 py-4 text-slate-700"
            {...props}
        >
            <label className="grid grid-rows-[auto_auto] gap-y-1">
                <span className="font-medium">Логин</span>
                <input
                    name="login"
                    autoComplete="off"
                    aria-invalid={isError}
                    required
                    onFocus={onFocusHandler}
                    className="rounded-md border px-2 py-1.5 text-center shadow-md focus-visible:outline-slate-500 aria-[invalid=false]:border-slate-600 aria-[invalid=true]:border-red-700"
                />
            </label>

            <label className="grid grid-rows-[auto_auto] gap-y-1">
                <span className="font-medium">Пароль</span>
                <input
                    type="password"
                    name="password"
                    required
                    autoComplete="off"
                    aria-invalid={isError}
                    onFocus={onFocusHandler}
                    className="rounded-md border px-2 py-1.5 text-center shadow-md focus-visible:outline-slate-500 aria-[invalid=false]:border-slate-600 aria-[invalid=true]:border-red-700"
                />
            </label>

            {isError ? (
                <output className="block text-xs text-red-700">
                    <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                    {error?.data?.message}
                </output>
            ) : null}

            <button
                disabled={isLoading}
                className="mx-auto min-w-28 rounded-md bg-blue-600 px-3 py-1.5 text-lg font-semibold text-white shadow-lg transition-colors duration-150 hover:bg-blue-500 disabled:pointer-events-none disabled:bg-gray-400"
            >
                {isLoading ? (
                    <ImSpinner9 className="mx-auto animate-spin py-1 text-xl" />
                ) : (
                    "Войти"
                )}
            </button>
        </form>
    );
};

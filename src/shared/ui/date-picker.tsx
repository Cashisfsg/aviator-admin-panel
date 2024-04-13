import { useRef } from "react";

import { cn } from "../lib/tailwind-merge";

import { TbRefresh } from "react-icons/tb";

export interface FormFields {
    startDate: HTMLInputElement;
    endDate: HTMLInputElement;
}

interface DatePickerProps extends React.ComponentProps<"form"> {
    onSubmit?: React.FormEventHandler<HTMLFormElement & FormFields>;
    isLoading?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    className,
    isLoading,
    ...props
}) => {
    const startDateInputRef = useRef<HTMLInputElement>(null);
    const endDateInputRef = useRef<HTMLInputElement>(null);

    const onStartDateChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.value === "" || !endDateInputRef.current) return;

        const startDate = new Date(input.value);
        const endDate = new Date(endDateInputRef.current.value);

        if (endDate.getTime() >= startDate.getTime()) return;

        input.value = endDate.toISOString().substring(0, 10);
    };

    const onEndDateChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.value === "" || !startDateInputRef.current?.value) return;

        const startDate = new Date(startDateInputRef.current.value);
        const endDate = new Date(input.value);

        if (endDate.getTime() >= startDate.getTime()) return;

        input.value = startDate.toISOString().substring(0, 10);
    };

    return (
        <form
            className={cn("mx-auto flex items-center gap-x-3", className)}
            {...props}
        >
            <span>Дата начала</span>
            <input
                type="date"
                name="startDate"
                required
                onChange={onStartDateChangeHandler}
                ref={startDateInputRef}
                className="rounded-md border-2 border-slate-300 px-2 py-1 focus-visible:outline-blue-300"
            />
            <span>Дата окончания</span>
            <input
                type="date"
                name="endDate"
                onChange={onEndDateChangeHandler}
                ref={endDateInputRef}
                className="rounded-md border-2 border-slate-300 px-2 py-1 focus-visible:outline-blue-300"
            />
            <button
                disabled={isLoading}
                className="group text-2xl text-blue-500 duration-300 active:scale-90 disabled:cursor-wait"
            >
                <TbRefresh className="duration-300 group-hover:rotate-180 group-hover:scale-110" />
            </button>
        </form>
    );
};

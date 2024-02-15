import React, { useState, useId } from "react";
import { useAddNewRequisiteMutation } from "@/entities/requisite";

import { useDialogContext } from "@/shared/ui/dialog";

import { ImSpinner9 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";

interface AddRequisiteFormProps extends React.ComponentPropsWithRef<"form"> {}

interface FormFields {
    requisite: HTMLInputElement;
}

export const AddRequisiteForm: React.FC<AddRequisiteFormProps> = ({
    ...props
}) => {
    const [isError, setIsError] = useState(false);
    const [addNewRequisite, { isLoading, error }] =
        useAddNewRequisiteMutation();
    const requisiteId = useId();
    const errorId = useId();

    const { dialogRef } = useDialogContext();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();
        setIsError(false);

        const form = event.currentTarget;
        const { requisite } = form;
        const response = await addNewRequisite({ requisite: requisite.value });

        if (response?.error) {
            setIsError(true);
            return;
        }

        form.reset();
        dialogRef.current?.close();
    };

    const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setIsError(false);
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="mt-4 grid w-full gap-y-4 px-4 text-slate-700"
            {...props}
        >
            <label className="grid grid-rows-[auto_auto] gap-y-1 ">
                <span className="font-medium">Реквизит</span>
                <input
                    id={requisiteId}
                    name="requisite"
                    autoComplete="off"
                    aria-invalid={isError}
                    aria-errormessage={errorId}
                    required
                    onFocus={onFocusHandler}
                    className="rounded-md border px-2 py-1.5 text-center shadow-md focus-visible:outline-slate-500 aria-[invalid=false]:border-slate-600 aria-[invalid=true]:border-red-700"
                />
            </label>

            {isError ? (
                <output
                    id={errorId}
                    htmlFor={requisiteId}
                    className="block text-xs text-red-700"
                >
                    <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                    {error?.data?.message}
                </output>
            ) : null}
            <button
                disabled={isLoading}
                className="mx-auto min-w-28 rounded-md bg-lime-500 px-3 py-1.5 text-lg font-semibold text-white shadow-lg transition-colors duration-150 hover:bg-lime-400 disabled:pointer-events-none disabled:bg-gray-400"
            >
                {isLoading ? (
                    <ImSpinner9 className="mx-auto animate-spin py-1 text-xl" />
                ) : (
                    "Сохранить"
                )}
            </button>
        </form>
    );
};

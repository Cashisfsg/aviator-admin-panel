import { useId, useState } from "react";
import { useCancelReplenishmentByIdMutation } from "@/entities/replenishment";
import { AlertDialog, useAlertDialogContext } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

import { IoWarningOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { handleErrorResponse } from "@/shared/lib/helpers";

interface CancelReplenishmentDialogProps {
    replenishmentId: string;
}

interface FormFields {
    reason: HTMLInputElement;
}

export const CancelReplenishmentDialog: React.FC<
    CancelReplenishmentDialogProps
> = ({ replenishmentId }) => {
    const [errorState, setErrorState] = useState({
        isError: false,
        message: ""
    });
    const { alertDialogRef } = useAlertDialogContext();
    const [cancel, { isLoading }] = useCancelReplenishmentByIdMutation();
    const errorId = useId();
    const reasonId = useId();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        const { reason } = event.currentTarget;

        try {
            await cancel({
                id: replenishmentId,
                statusMessage: reason.value
            }).unwrap();

            alertDialogRef.current?.close();
        } catch (error) {
            handleErrorResponse(error, message =>
                setErrorState(state => ({
                    ...state,
                    isError: true,
                    message: message
                }))
            );
        }
    };

    const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setErrorState(state => ({ ...state, isError: false, message: "" }));
    };

    return (
        <AlertDialog.Portal>
            <AlertDialog.Content className="min-w-72">
                <form
                    onSubmit={onSubmitHandler}
                    className="w-72 space-y-4"
                >
                    <label className="grid gap-y-2">
                        <span className="font-medium">
                            Укажите причину отмены
                        </span>
                        <input
                            id={reasonId}
                            name="reason"
                            required
                            autoComplete="off"
                            aria-invalid={errorState?.isError}
                            aria-errormessage={
                                errorState?.isError ? errorId : undefined
                            }
                            onFocus={onFocusHandler}
                            className="rounded-lg border-2 border-slate-400 px-4 py-2 focus-visible:outline-blue-300 aria-[invalid=false]:border-slate-300 aria-[invalid=true]:border-red-700"
                        />
                        {errorState?.isError ? (
                            <output
                                id={errorId}
                                htmlFor={reasonId}
                                className="block text-xs text-red-700"
                            >
                                <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                                {errorState.message}
                            </output>
                        ) : null}
                    </label>

                    <Button
                        disabled={isLoading}
                        variant="danger"
                        className="mx-auto block disabled:cursor-wait"
                    >
                        {isLoading ? (
                            <ImSpinner9 className="mx-auto h-6 animate-spin text-lg" />
                        ) : (
                            "Отменить пополнение"
                        )}
                    </Button>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};

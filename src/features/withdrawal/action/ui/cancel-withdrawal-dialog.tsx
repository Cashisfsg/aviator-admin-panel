import { useId } from "react";
import { useCancelWithdrawalByIdMutation } from "@/entities/withdrawal";
import { AlertDialog, useAlertDialogContext } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

import { IoWarningOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";

interface CancelWithdrawalDialogProps {
    withdrawalId: string;
}

interface FormFields {
    reason: HTMLInputElement;
}

export const CancelWithdrawalDialog: React.FC<CancelWithdrawalDialogProps> = ({
    withdrawalId
}) => {
    const [cancel, { isLoading, isError, error }] =
        useCancelWithdrawalByIdMutation();
    const errorId = useId();
    const reasonId = useId();
    const { alertDialogRef } = useAlertDialogContext();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        const { reason } = event.currentTarget;

        const response = await cancel({
            id: withdrawalId,
            statusMessage: reason.value
        });

        if (response?.error) return;

        alertDialogRef.current?.close();
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
                            aria-invalid={isError}
                            aria-errormessage={isError ? errorId : undefined}
                            className="rounded-lg border-2 border-slate-400 px-4 py-2 focus-visible:outline-blue-300 aria-[invalid=false]:border-slate-300 aria-[invalid=true]:border-red-700"
                        />
                        {isError ? (
                            <output
                                id={errorId}
                                htmlFor={reasonId}
                                className="block text-xs text-red-700"
                            >
                                <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                                {error?.data?.message}
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
                            "Отменить вывод"
                        )}
                    </Button>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};

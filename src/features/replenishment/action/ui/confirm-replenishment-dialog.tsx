import {
    Replenishment,
    useConfirmReplenishmentByIdMutation
} from "@/entities/replenishment";
import { handleErrorResponse } from "@/shared/lib/helpers";

import { AlertDialog, useAlertDialogContext } from "@/shared/ui/alert-dialog";

interface ConfirmReplenishmentDialogProps {
    replenishment: Replenishment;
}

export const ConfirmReplenishmentDialog: React.FC<
    ConfirmReplenishmentDialogProps
> = ({ replenishment }) => {
    const { alertDialogRef } = useAlertDialogContext();
    const [confirm, { isLoading }] = useConfirmReplenishmentByIdMutation();

    const onClickHandler = async () => {
        try {
            await confirm({ id: replenishment._id }).unwrap();
            alertDialogRef.current?.close();
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <AlertDialog.Portal>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    {`Вы уверены что хотите подтвердить заявку на сумму
                    ${replenishment.amount[replenishment.requisite.currency]?.toFixed(2)} ${replenishment.requisite.currency}?`}
                </AlertDialog.Title>
                <div className="space-x-4 text-right">
                    <AlertDialog.Action
                        disabled={isLoading}
                        onClick={onClickHandler}
                        className="disabled:cursor-wait"
                    >
                        Да
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>Нет</AlertDialog.Cancel>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};

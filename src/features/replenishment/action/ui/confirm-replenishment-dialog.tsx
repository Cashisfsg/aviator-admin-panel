import {
    Replenishment,
    useConfirmReplenishmentByIdMutation
} from "@/entities/replenishment";

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
        const response = await confirm({ id: replenishment._id });

        if (response?.error) return;

        alertDialogRef.current?.close();
    };

    return (
        <AlertDialog.Portal>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    {`Вы уверены что хотите подтвердить заявку на сумму
                    ${replenishment.amount[replenishment.requisite.currency]} ${replenishment.requisite.currency}?`}
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

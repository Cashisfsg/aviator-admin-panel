import {
    useConfirmWithdrawalByIdMutation,
    Withdrawal
} from "@/entities/withdrawal";
import { AlertDialog, useAlertDialogContext } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

interface ConfirmWithdrawalButtonProps {
    withdrawal: Withdrawal;
}

export const ConfirmWithdrawalDialog: React.FC<
    ConfirmWithdrawalButtonProps
> = ({ withdrawal }) => {
    const [confirm, { isLoading }] = useConfirmWithdrawalByIdMutation();
    const { alertDialogRef } = useAlertDialogContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        const response = await confirm({ id: withdrawal._id });

        if (response?.error) {
            alert(response?.error?.data?.message);
            return;
        }

        alertDialogRef.current?.close();
    };

    return (
        <AlertDialog.Portal>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    {`Вы уверены что хотите подтвердить заявку на сумму
                        ${withdrawal.amount[withdrawal.requisite.currency]} ${withdrawal.requisite.currency}?`}
                </AlertDialog.Title>
                <div className="space-x-4 text-right">
                    <Button
                        variant="success"
                        disabled={isLoading}
                        onClick={onClickHandler}
                    >
                        Да
                    </Button>
                    <AlertDialog.Cancel>Нет</AlertDialog.Cancel>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};

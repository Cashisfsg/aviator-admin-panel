import {
    useConfirmWithdrawalByIdMutation,
    Withdrawal
} from "@/entities/withdrawal";
import { AlertDialog } from "@/shared/ui/alert-dialog";

interface ConfirmWithdrawalButtonProps {
    withdrawal: Withdrawal;
}

export const ConfirmWithdrawalDialog: React.FC<
    ConfirmWithdrawalButtonProps
> = ({ withdrawal }) => {
    const [confirm, { isLoading }] = useConfirmWithdrawalByIdMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        await confirm({ id: withdrawal._id });
    };

    return (
        <AlertDialog.Portal>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    {`Вы уверены что хотите подтвердить заявку на сумму
                        ${withdrawal.amount[withdrawal.requisite.currency]} ${withdrawal.requisite.currency}?`}
                </AlertDialog.Title>
                <div className="space-x-4 text-right">
                    <AlertDialog.Action
                        disabled={isLoading}
                        onClick={onClickHandler}
                    >
                        Да
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>Нет</AlertDialog.Cancel>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};

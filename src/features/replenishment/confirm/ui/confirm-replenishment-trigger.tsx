import {
    useConfirmReplenishmentByIdMutation,
    Replenishment
} from "@/entities/replenishment";
import { AlertDialog } from "@/shared/ui/alert-dialog";
import { FaFileCircleCheck } from "react-icons/fa6";

interface ConfirmReplenishmentTriggerProps
    extends Omit<React.ComponentProps<"button">, "children"> {
    replenishment: Replenishment;
}

export const ConfirmReplenishmentTrigger: React.FC<
    ConfirmReplenishmentTriggerProps
> = ({ replenishment, ...props }) => {
    const [confirm, { isLoading }] = useConfirmReplenishmentByIdMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        await confirm({ id: replenishment._id });
    };

    return (
        <AlertDialog>
            <AlertDialog.Trigger
                className="text-lime-600 transition-all duration-150 hover:scale-125 hover:text-lime-500"
                {...props}
            >
                <FaFileCircleCheck className="text-2xl" />
                <span className="sr-only">
                    Подтвердить заявку на пополнение
                </span>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        {`Вы уверены что хотите подтвердить заявку на сумму
                        ${replenishment.amount[replenishment.requisite.currency]} ${replenishment.requisite.currency}?`}
                    </AlertDialog.Title>
                    <AlertDialog.Action
                        disabled={isLoading}
                        onClick={onClickHandler}
                        className="disabled:cursor-wait"
                    >
                        Да
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>Нет</AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    );
};

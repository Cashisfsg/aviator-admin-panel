import { useStateSelector } from "@/app/providers/redux-provider";
import { selectReplenishmentId } from "@/entities/replenishment/model/selectors";
import { useConfirmReplenishmentByIdMutation } from "@/entities/replenishment";

import { Dialog } from "@/shared/ui/dialog";
import { useDialogContext } from "@/shared/ui/dialog";

interface ConfirmReplenishmentDialogProps
    extends React.ComponentProps<"dialog"> {}

export const ConfirmReplenishmentDialog: React.FC<
    ConfirmReplenishmentDialogProps
> = props => {
    const { dialogRef } = useDialogContext();
    const replenishmentId = useStateSelector(state =>
        selectReplenishmentId(state)
    );
    const [confirmReplenishment] = useConfirmReplenishmentByIdMutation();

    const onClickHandler = async () => {
        if (!replenishmentId) return;
        await confirmReplenishment({ id: replenishmentId });
        dialogRef.current?.close();
    };

    return (
        <Dialog.Content
            className="min-w-96 bg-slate-100 px-2 py-4 shadow-xl"
            {...props}
        >
            <h3 className="text-balance text-center text-lg ">
                Вы уверены что хотите подтвердить подтвердить заявку на сумму
                100000 UZS?
            </h3>
            <button
                onClick={onClickHandler}
                className="px-4 py-1.5 text-red-500"
            >
                Да
            </button>
            <button onClick={() => dialogRef.current?.close()}>Нет</button>
            <Dialog.Close />
        </Dialog.Content>
    );
};

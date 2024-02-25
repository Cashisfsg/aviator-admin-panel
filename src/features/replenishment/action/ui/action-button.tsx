import { Replenishment } from "@/entities/replenishment";
import { AlertDialog } from "@/shared/ui/alert-dialog";

import { ConfirmReplenishmentDialog } from "./confirm-replenishment-dialog";
import { CancelReplenishmentDialog } from "./cancel-replenishment-dialog";

import { FaFileCircleCheck, FaFileCircleXmark } from "react-icons/fa6";

interface ReplenishmentActionButtonProps {
    replenishment: Replenishment;
}

export const ReplenishmentActionButton: React.FC<
    ReplenishmentActionButtonProps
> = ({ replenishment }) => {
    return (
        <div className="space-x-2">
            <AlertDialog>
                <AlertDialog.Trigger
                    title="Подтвердить заявку на вывод"
                    className="text-lime-600 transition-all duration-150 hover:scale-125 hover:text-lime-500"
                >
                    <FaFileCircleCheck className="text-2xl" />
                    <span className="sr-only">Подтвердить заявку на вывод</span>
                </AlertDialog.Trigger>
                <ConfirmReplenishmentDialog replenishment={replenishment} />
            </AlertDialog>

            <AlertDialog>
                <AlertDialog.Trigger
                    title="Отменить заявку на вывод"
                    className="text-red-600 transition-all duration-150 hover:scale-125 hover:text-red-500"
                >
                    <FaFileCircleXmark className="text-2xl" />
                    <span className="sr-only">Отменить заявку на вывод</span>
                </AlertDialog.Trigger>
                <CancelReplenishmentDialog
                    replenishmentId={replenishment._id}
                />
            </AlertDialog>
        </div>
    );
};

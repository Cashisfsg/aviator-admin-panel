import { useFetchUserInfoQuery } from "@/entities/user";
import { Withdrawal } from "@/entities/withdrawal";
import { AlertDialog } from "@/shared/ui/alert-dialog";

import { ConfirmWithdrawalDialog } from "./confirm-withdrawal-dialog";
import { CancelWithdrawalDialog } from "./cancel-withdrawal-dialog";
import { AddToActiveListButton } from "./add-to-active-list-button";

import { FaFileCircleCheck, FaFileCircleXmark } from "react-icons/fa6";

interface WithdrawalActivationButtonProps {
    withdrawal: Withdrawal;
    activeUserId: string;
}

export const WithdrawalActionButton: React.FC<
    WithdrawalActivationButtonProps
> = ({ withdrawal, activeUserId }) => {
    const { data: user } = useFetchUserInfoQuery();

    if (activeUserId === user?._id)
        return (
            <div className="space-x-2">
                <AlertDialog>
                    <AlertDialog.Trigger
                        title="Подтвердить заявку на вывод"
                        className="text-lime-600 transition-all duration-150 hover:scale-125 hover:text-lime-500"
                    >
                        <FaFileCircleCheck className="text-2xl" />
                        <span className="sr-only">
                            Подтвердить заявку на вывод
                        </span>
                    </AlertDialog.Trigger>
                    <ConfirmWithdrawalDialog withdrawal={withdrawal} />
                </AlertDialog>

                <AlertDialog>
                    <AlertDialog.Trigger
                        title="Отменить заявку на вывод"
                        className="text-red-600 transition-all duration-150 hover:scale-125 hover:text-red-500"
                    >
                        <FaFileCircleXmark className="text-2xl" />
                        <span className="sr-only">
                            Отменить заявку на вывод
                        </span>
                    </AlertDialog.Trigger>
                    <CancelWithdrawalDialog withdrawalId={withdrawal._id} />
                </AlertDialog>
            </div>
        );

    return <AddToActiveListButton withdrawalId={withdrawal._id} />;
};

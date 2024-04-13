import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useFetchAllWithdrawalsQuery } from "@/entities/withdrawal";

import * as Dialog from "@radix-ui/react-dialog";
import { CancelWithdrawalForm } from "./cancel-withdrawal-form";

import { CgClose } from "react-icons/cg";

export const CancelWithdrawalDialog = () => {
    const navigate = useNavigate();
    const { withdrawalId } = useParams();

    const { data: withdrawals } = useFetchAllWithdrawalsQuery();

    const withdrawal = useMemo(() => {
        return withdrawals?.find(
            withdrawals => withdrawals._id === withdrawalId
        );
    }, [withdrawals, withdrawalId]);

    return (
        <Dialog.Root
            modal={false}
            defaultOpen={true}
        >
            <Dialog.Portal>
                <Dialog.Content
                    onPointerDownOutside={() => navigate("/withdrawal")}
                    onEscapeKeyDown={() => navigate("/withdrawal")}
                    className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] isolate z-30 h-max w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-6 text-white shadow-lg duration-200"
                >
                    <Dialog.Close
                        asChild
                        className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
                    >
                        <Link to="/withdrawal">
                            <CgClose className="text-xl text-black" />
                            <span className="sr-only">Закрыть</span>
                        </Link>
                    </Dialog.Close>

                    <Dialog.Title className="text-balance text-center text-xl font-semibold text-black">
                        {`Вы уверены что хотите отменить заявку на вывод на сумму
                    ${withdrawal?.amount[withdrawal?.requisite?.currency]?.toFixed(2)} ${withdrawal?.requisite?.currency}?`}
                    </Dialog.Title>

                    <CancelWithdrawalForm withdrawalId={withdrawalId} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    useFetchAllReplenishmentsQuery,
    useConfirmReplenishmentByIdMutation
} from "@/entities/replenishment/api/replenishment-api";
import { handleErrorResponse } from "@/shared/lib/helpers/handle-error";

import * as Dialog from "@radix-ui/react-dialog";

import { Button, buttonVariants } from "@/shared/ui/button";
import { CgClose } from "react-icons/cg";

export const ConfirmReplenishmentDialog = () => {
    const navigate = useNavigate();
    const { replenishmentId } = useParams();

    const { data: replenishments } = useFetchAllReplenishmentsQuery();
    const [confirm, { isLoading }] = useConfirmReplenishmentByIdMutation();

    const replenishment = useMemo(() => {
        return replenishments?.find(
            replenishment => replenishment._id === replenishmentId
        );
    }, [replenishments, replenishmentId]);

    const onClickHandler = async () => {
        try {
            if (replenishmentId === undefined) return;

            await confirm({ id: replenishmentId }).unwrap();
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <Dialog.Root
            modal={false}
            defaultOpen={true}
        >
            <Dialog.Portal>
                <Dialog.Content
                    onPointerDownOutside={() => navigate("/replenishment")}
                    onEscapeKeyDown={() => navigate("/replenishment")}
                    className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] isolate z-30 h-max w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-6 text-white shadow-lg duration-200"
                >
                    <Dialog.Close
                        asChild
                        className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
                    >
                        <Link to="/replenishment">
                            <CgClose className="text-xl text-black" />
                            <span className="sr-only">Закрыть</span>
                        </Link>
                    </Dialog.Close>

                    <Dialog.Title className="text-balance text-center text-xl font-semibold text-black">
                        {`Вы уверены что хотите подтвердить заявку на пополнение на сумму
                    ${replenishment?.amount[replenishment?.requisite?.currency]?.toFixed(2)} ${replenishment?.requisite?.currency}?`}
                    </Dialog.Title>

                    <div className="mt-6 space-x-4 text-right">
                        <Button
                            variant="danger"
                            disabled={isLoading}
                            onClick={onClickHandler}
                            className="disabled:cursor-wait"
                        >
                            Да
                        </Button>

                        <Dialog.Close
                            asChild
                            className={buttonVariants({ variant: "success" })}
                        >
                            <Link to="/replenishment">Нет</Link>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

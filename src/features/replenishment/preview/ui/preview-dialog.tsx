import { useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useFetchAllReplenishmentsQuery } from "@/entities/replenishment";

import * as Dialog from "@radix-ui/react-dialog";

import { ZoomableImage } from "@/shared/ui/zoomable-image";

import { CgClose } from "react-icons/cg";
import ImageNotAvailable from "@/assets/image-not-available.webp";

export const PreviewDialog = () => {
    const navigate = useNavigate();
    const { replenishmentId } = useParams();
    const { pathname } = useLocation();
    const { data: replenishments } = useFetchAllReplenishmentsQuery();

    const src = useMemo(() => {
        const replenishment = replenishments?.find(
            replenishment => replenishment._id === replenishmentId
        );

        const path = pathname.split("/").at(-1);

        if (path === "card") return replenishment?.card;
        if (path === "receipt") return replenishment?.receipt;

        return undefined;
    }, [replenishments, replenishmentId, pathname]);

    return (
        <Dialog.Root
            modal={false}
            defaultOpen={true}
        >
            <Dialog.Portal>
                <Dialog.Content
                    onPointerDownOutside={() => navigate("/replenishment")}
                    onEscapeKeyDown={() => navigate("/replenishment")}
                    className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] isolate z-30 h-4/5 h-max w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-6 text-white shadow-lg duration-200"
                >
                    <Dialog.Close
                        onClick={() => navigate("/replenishment")}
                        className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
                    >
                        <CgClose className="text-xl text-black" />
                        <span className="sr-only">Закрыть</span>
                    </Dialog.Close>
                    <ZoomableImage src={src || ImageNotAvailable} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

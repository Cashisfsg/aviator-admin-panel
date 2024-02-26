import { Dialog } from "@/shared/ui/dialog";
import { buttonVariants } from "@/shared/ui/button";

import { AddRequisiteForm } from "./add-requisite-form";

export const AddRequisiteButton = () => {
    return (
        <Dialog>
            <Dialog.Trigger
                className={buttonVariants({ variant: "primary" })}
                // className="rounded-md bg-blue-400 px-2 py-1 font-semibold text-white transition-colors duration-150 hover:bg-blue-500"
            >
                Добавить +
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content className="min-w-80 bg-gray-100 pb-4 shadow-lg">
                    <h3 className="bg-violet-600 px-2 py-3 text-center text-xl font-semibold text-white">
                        Добавить реквизит
                    </h3>
                    <AddRequisiteForm />
                    <Dialog.Close />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};

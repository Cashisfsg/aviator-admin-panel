import { useRef } from "react";

import { Dialog } from "@/shared/ui/dialog";

import { AddRequisiteForm } from "./add-requisite-form";

export const AddRequisiteButton = () => {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Dialog>
            <Dialog.Trigger className="rounded-md bg-blue-400 px-2 py-1 font-semibold text-white transition-colors duration-150 hover:bg-blue-500">
                Добавить +
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content className="min-w-80 bg-gray-200 pb-4 shadow-lg">
                    <h3 className="bg-gray-400 px-2 py-3 text-center text-xl font-semibold">
                        Добавить реквизит
                    </h3>
                    <AddRequisiteForm ref={formRef} />
                    <Dialog.Close
                        onClick={() => {
                            console.log(formRef.current);
                            formRef.current?.reset();
                        }}
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};

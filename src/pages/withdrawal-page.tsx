// import { useState } frsom "react";
import { Header } from "@/widgets/header";
import { GlobalFilter } from "@/features/user/filtrate";
import { FetchWithdrawal } from "@/features/withdrawal/fetch";
import { Dialog } from "@/shared/ui/dialog";
import { useLazyFetchAllWithdrawalsQuery } from "@/entities/withdrawal";
import { TableLayoutWithoutSidebar } from "@/shared/ui/table/table-layout-without-sidebar";

export const WithdrawalPage = () => {
    // const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [refetch] = useLazyFetchAllWithdrawalsQuery();

    const onChange: React.ChangeEventHandler<
        HTMLInputElement
    > = async event => {
        console.log(new Date(event.target.value).toISOString());
        // setStartDate(new Date(event.target.value).toISOString());
        await refetch({
            stateDate: new Date(event.target.value).toISOString()
        });
    };

    return (
        <article className="rounded-xl bg-slate-200 px-2 py-6 text-black">
            <Header>Выберите заявку на вывод</Header>
            <TableLayoutWithoutSidebar>
                {/* <section className="rounded-lg bg-white pb-6"> */}
                {/* <header className="px-3 py-2">
                  
                    <div className="mx-auto flex w-fit items-center justify-center rounded-full border border-gray-500 bg-slate-200 font-medium ">
                        <button
                            aria-selected={true}
                            className="min-w-28 select-none whitespace-nowrap rounded-full py-1 aria-[selected=true]:bg-gray-700 aria-[selected=true]:text-white"
                        >
                            Доступные
                        </button>
                        <button className="min-w-28 select-none whitespace-nowrap rounded-full py-1 aria-[selected=true]:bg-gray-700 aria-[selected=true]:text-white">
                            Активные
                        </button>
                        <button className="min-w-28 select-none whitespace-nowrap rounded-full py-1 aria-[selected=true]:bg-gray-700 aria-[selected=true]:text-white">
                            Все
                        </button>
                    </div>
                </header> */}

                <header className="flex items-center gap-x-4 rounded-lg bg-white px-3 py-2">
                    <GlobalFilter />
                    <div>
                        <span>От</span>
                        <input
                            type="date"
                            onChange={onChange}
                            className="rounded-md border-2 border-neutral-300 px-2 py-1"
                        />
                        <span>До</span>
                        <input
                            type="date"
                            className="rounded-md border-2 border-neutral-300 px-2 py-1"
                        />
                    </div>
                </header>
                <Dialog>
                    <FetchWithdrawal />
                    <Dialog.Portal>
                        <Dialog.Content>Dialog content</Dialog.Content>
                    </Dialog.Portal>
                </Dialog>
                {/* </section> */}
            </TableLayoutWithoutSidebar>
        </article>
    );
};

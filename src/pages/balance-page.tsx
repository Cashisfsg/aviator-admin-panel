import { Header } from "@/widgets/header";
import { ClipboardCopy } from "@/shared/ui";

export const BalancePage = () => {
    return (
        <article className="rounded-xl bg-slate-200 px-2 py-6 text-black">
            <Header>Пополнение баланса</Header>
            <section className="rounded-lg bg-white">
                <header className="flex items-center justify-between rounded-t-lg bg-slate-300 px-3 py-2 ">
                    <h2 className="text-xl leading-none ">
                        История пополнения баланса
                    </h2>
                </header>

                <div className="px-3 py-2">
                    <h3 className="text-lg">
                        Ваш адрес для пополнения баланса, USDT (TRC20)
                    </h3>
                    <div className="flex items-center gap-x-4">
                        <span className="w-1/2 rounded-md border border-gray-300 px-2 py-1.5">
                            dhfajskdjbadshcb2b1231838e29013ieoajsdaoisdj
                        </span>
                        <ClipboardCopy
                            textToCopy=""
                            className="rounded-md bg-lime-500 px-2 py-1.5 leading-none text-white transition-colors duration-150 hover:bg-lime-400"
                        >
                            Скопировать
                        </ClipboardCopy>
                    </div>
                </div>

                <div className="px-3 py-2">
                    <h3 className="text-lg">История пополнений</h3>
                    <div className="flex items-center gap-x-4"></div>
                </div>

                {/* <FetchRequisite /> */}
            </section>
        </article>
    );
};

import { Header } from "@/widgets/header";
import { FetchRequisite } from "@/widgets/fetch-requisite";
import { AddRequisiteButton } from "@/features/requisite/add";

export const RequisitePage = () => {
    return (
        <article className="rounded-xl bg-slate-200 px-2 py-6 text-black">
            <Header>Реквизиты</Header>
            <section>
                <header className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                    <h2 className="text-xl leading-none">Список реквизитов</h2>
                    <AddRequisiteButton />
                </header>

                <FetchRequisite />
            </section>
        </article>
    );
};

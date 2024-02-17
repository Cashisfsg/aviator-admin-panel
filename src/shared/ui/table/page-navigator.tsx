import { useTableContext } from "./use-table-context";

export const PageNavigator = () => {
    const { table } = useTableContext();

    const currentPage = table ? table.getState().pagination.pageIndex + 1 : 0;
    const totalPages = table ? table.getPageCount() : 0;

    const goToPage: React.ChangeEventHandler<HTMLInputElement> = event => {
        if (!table) return;
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        table.setPageIndex(page);
    };

    return (
        <div className="flex items-center justify-self-end text-balance text-lg">
            <span className="flex items-center gap-1">
                <span>Страница</span>
                <strong>
                    {currentPage} из {totalPages}
                </strong>
                &nbsp;
            </span>
            <span className="flex items-center gap-1">
                | Перейти на страницу:
                <input
                    type="number"
                    inputMode="numeric"
                    autoComplete="off"
                    min={1}
                    max={totalPages}
                    disabled={!table}
                    onChange={goToPage}
                    className="w-16 rounded-md border-2 border-solid border-neutral-400 bg-white bg-clip-padding px-2 py-1 font-normal text-neutral-700 transition duration-200 ease-in-out focus-visible:border-blue-500 focus-visible:text-neutral-700 focus-visible:outline-neutral-500"
                />
            </span>
        </div>
    );
};

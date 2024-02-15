import { FC } from "react";

interface PageNavigationProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
}

export const PageNavigator: FC<PageNavigationProps> = ({
    currentPage,
    totalPages,
    goToPage
}) => {
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
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    min={1}
                    max={totalPages}
                    onChange={e => {
                        const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                        goToPage(page);
                    }}
                    className="w-16 rounded-md border-2 border-solid border-neutral-300 bg-clip-padding px-2 py-1 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:text-neutral-700  focus:outline-none"
                />
            </span>
        </div>
    );
};

import { FC } from "react";

import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

interface PaginatorProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    goToTheNextPage: () => void;
    goToThePreviousPage: () => void;
    goToTheFirstPage: () => void;
    goToTheLastPage: () => void;
}

export const Pagination: FC<PaginatorProps> = ({
    hasNextPage,
    hasPreviousPage,
    goToTheNextPage,
    goToThePreviousPage,
    goToTheFirstPage,
    goToTheLastPage
}) => {
    return (
        <div className="self-center justify-self-center text-xl">
            <button
                title="Первая страница"
                disabled={hasPreviousPage}
                onClick={goToTheFirstPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardDoubleArrowLeft className="m-auto block" />
            </button>
            <button
                title="Предыдущая страница"
                disabled={hasPreviousPage}
                onClick={goToThePreviousPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardArrowLeft className="m-auto block" />
            </button>
            <button
                title="Следующая страница"
                disabled={hasNextPage}
                onClick={goToTheNextPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardArrowRight className="m-auto block" />
            </button>
            <button
                title="Последняя страница"
                disabled={hasNextPage}
                onClick={goToTheLastPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardDoubleArrowRight className="m-auto block" />
            </button>
        </div>
    );
};

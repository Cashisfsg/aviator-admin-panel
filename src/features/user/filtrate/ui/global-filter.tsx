import { useEffect } from "react";

import { useAppDispatch, setSearchQuery } from "@/app/providers/redux-provider";

import { SearchFilter } from "@/shared/ui";

export const GlobalFilter = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSearchQuery(""));
    }, [dispatch]);

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = event => {
        const { query } = event.currentTarget;

        dispatch(setSearchQuery(query.value));
    };

    const onResetHandler: React.FormEventHandler<HTMLFormElement> = () => {
        dispatch(setSearchQuery(""));
    };

    return (
        <SearchFilter
            onSubmit={onSubmitHandler}
            onReset={onResetHandler}
        />
    );
};

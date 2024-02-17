import { useTableContext } from "@/shared/ui/table/use-table-context";
import { SearchFilter } from "@/shared/ui";

export const GlobalFilter = () => {
    const { table } = useTableContext();

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = event => {
        const { query } = event.currentTarget;
        table?.setGlobalFilter(query.value);
    };

    const onResetHandler: React.FormEventHandler<HTMLFormElement> = () => {
        table?.setGlobalFilter("");
    };

    return (
        <SearchFilter
            onSubmit={onSubmitHandler}
            onReset={onResetHandler}
        />
    );
};

import { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

export const TableContext = createContext<{
    table: Table<unknown>;
} | null>(null);

export const useTableContext = () => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of table component"
        );
    }

    return context;
};

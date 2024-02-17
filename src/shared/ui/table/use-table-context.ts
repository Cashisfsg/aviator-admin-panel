import { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

export const TableContext = createContext<{
    table: Table<any> | null;
    setTable: React.Dispatch<React.SetStateAction<Table<any> | null>>;
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

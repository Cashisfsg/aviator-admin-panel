import { useAppDispatch } from "@/app/providers/redux-provider";
import {
    replenishmentApi,
    useLazyFetchAllReplenishmentsQuery
} from "@/entities/replenishment";
import { DatePicker, FormFields } from "@/shared/ui/date-picker";
import { useSessionStorage } from "@/shared/lib/hooks";

export const ReplenishmentPeriodSelector = () => {
    const [refetch, { isLoading }] = useLazyFetchAllReplenishmentsQuery();
    const dispatch = useAppDispatch();
    const { getItem: getElapsedDate } = useSessionStorage("elapsedDateTime");

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        const { startDate, endDate } = event.currentTarget;

        const start = new Date(startDate.value);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate.value);
        end.setHours(23, 59, 59, 999);

        const response = await refetch({
            startDate: start.toISOString(),
            endDate: endDate.value
                ? new Date(endDate.value).toISOString()
                : undefined
        });

        dispatch(
            replenishmentApi.util.updateQueryData(
                "fetchAllReplenishments",
                { startDate: getElapsedDate() },
                () => {
                    return response?.data;
                }
            )
        );
    };

    return (
        <DatePicker
            onSubmit={onSubmitHandler}
            isLoading={isLoading}
        />
    );
};

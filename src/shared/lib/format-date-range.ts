export const formatDateRange = (
    currentDate?: string,
    elapsedDate?: string
): {
    startDate: string;
    endDate: string | undefined;
} => {
    const endDate = currentDate ? new Date(currentDate) : new Date();
    endDate.setHours(23, 59, 59, 999);

    if (!elapsedDate) {
        const startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth() - 3,
            endDate.getDate(),
            0,
            0,
            0,
            0
        );

        return {
            endDate: endDate.toISOString(),
            startDate: startDate.toISOString()
        };
    }

    console.log("Not elapsedDate: " + elapsedDate);

    const startDate = new Date(endDate);
    startDate.setHours(0, 0, 0, 0);

    return {
        endDate: endDate.toISOString(),
        startDate: startDate.toISOString()
    };
};

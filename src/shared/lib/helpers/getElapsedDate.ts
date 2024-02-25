export const getElapsedDateTime = () => {
    const currentDate = new Date();

    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        currentDate.getDate(),
        0,
        0,
        0,
        0
    );
};

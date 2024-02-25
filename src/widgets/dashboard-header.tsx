import { useFetchUserInfoQuery } from "@/entities/user";

export const DashboardHeader = () => {
    const { data: user, isLoading } = useFetchUserInfoQuery();

    return (
        <header className="flex min-h-16 items-center rounded-lg bg-yellow-100 px-3 text-xl text-black">
            {isLoading ? (
                <>
                    <span className="h-3 w-28 animate-pulse rounded-full bg-slate-400" />
                    <span className="ml-2 h-4 w-4 animate-pulse rounded-full bg-slate-400" />
                </>
            ) : (
                <>
                    <span>{Math.round(user?.balance || 0)} USDT</span>
                    <span
                        className={`ml-2 inline-block h-4 w-4 rounded-full ${user?.requisite?.active ? "bg-lime-500" : "bg-red-500"}`}
                    />
                </>
            )}
        </header>
    );
};

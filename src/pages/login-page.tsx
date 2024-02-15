import { LoginForm } from "@/features/user/login";

export const LoginPage = () => {
    return (
        <section className="fixed left-1/2 top-1/2 mx-auto w-full max-w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-slate-100">
            <h1 className="bg-lime-900 p-2 text-center text-xl font-semibold">
                Добро пожаловать
            </h1>
            <LoginForm />
        </section>
    );
};

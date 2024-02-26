import { Button } from "./button";

interface ClipboardCopyProps extends React.ComponentPropsWithRef<"button"> {
    textToCopy: string | null | undefined;
}

export const ClipboardCopy: React.FC<ClipboardCopyProps> = ({
    onClick,
    textToCopy,
    ...props
}) => {
    const copyToClipboard: React.MouseEventHandler<
        HTMLButtonElement
    > = async event => {
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);

            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    const notification = new Notification(
                        "Реквизит скопирован в буфер обмена"
                    );

                    notification.addEventListener("error", () => {
                        alert(
                            "Произошла ошибка при попытке скопировать ссылку в буфер обмена"
                        );
                    });
                }

                // if (permission === "denied") {
                //     confirm("Вы не сможете получать всплывающие уведомления");
                // }
            });
        } catch (error) {
            console.error(error);
        }

        onClick?.(event);
    };

    return (
        <Button
            title="Скопировать в буфер обмена"
            variant="success"
            onClick={copyToClipboard}
            {...props}
        />
    );
};

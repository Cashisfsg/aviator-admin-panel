interface ClipboardCopyProps extends React.ComponentProps<"button"> {
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
        } catch (error) {
            console.error(error);
        }

        onClick?.(event);
    };

    return (
        <button
            title="Скопировать в буфер обмена"
            onClick={copyToClipboard}
            {...props}
        />
    );
};

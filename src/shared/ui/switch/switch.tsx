import "./switch.css";

interface SwitchProps
    extends Omit<React.ComponentProps<"button">, "children"> {}

export const Switch: React.FC<SwitchProps> = props => {
    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const button = event.currentTarget;
        const checked = button.getAttribute("aria-checked") === "true";

        if (checked) {
            button.setAttribute("aria-checked", "false");
        } else {
            button.setAttribute("aria-checked", "true");
        }
    };

    return (
        <button
            role="switch"
            aria-checked={props?.["aria-checked"] || false}
            onClick={onClickHandler}
            className="switch"
        >
            <div className="checkbox">
                <div className="thumb"></div>
            </div>
        </button>
    );
};

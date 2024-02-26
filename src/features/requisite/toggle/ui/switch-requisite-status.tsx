import { useToggleRequisiteStatusMutation } from "@/entities/requisite";
import { Switch } from "@/shared/ui/switch/switch";

interface SwitchRequisiteStatusProps extends React.ComponentProps<"button"> {
    requisiteId: string;
}

export const SwitchRequisiteStatus: React.FC<SwitchRequisiteStatusProps> = ({
    requisiteId,
    ...props
}) => {
    const [toggleStatus, { isLoading }] = useToggleRequisiteStatusMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async event => {
        const button = event.currentTarget;
        const checked = button.getAttribute("aria-checked") === "true";

        const response = await toggleStatus({ id: requisiteId });

        if (response?.error) {
            alert(response?.error?.data?.message);
        } else {
            button.setAttribute("aria-checked", String(!checked));
        }
    };

    return (
        <Switch
            onClick={onClickHandler}
            disabled={isLoading}
            className="disabled:cursor-not-allowed"
            {...props}
        />
    );
};

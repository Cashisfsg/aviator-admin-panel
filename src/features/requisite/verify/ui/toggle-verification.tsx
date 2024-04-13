import {
    useToggleRequisiteCardVerificationMutation,
    useToggleRequisiteReceiptVerificationMutation
} from "@/entities/requisite";
import { handleErrorResponse } from "@/shared/lib/helpers";

import { Switch } from "@/shared/ui/switch/switch";

interface ToggleVerificationProps {
    requisiteId: string;
}

export const ToggleVerification: React.FC<ToggleVerificationProps> = ({
    requisiteId
}) => {
    const [toggleCardVerification, { isLoading: isCardToggling }] =
        useToggleRequisiteCardVerificationMutation();
    const [toggleReceiptVerification, { isLoading: isReceiptToggling }] =
        useToggleRequisiteReceiptVerificationMutation();

    const toggleVerification = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        type: "card" | "receipt"
    ) => {
        const button = event.currentTarget;
        const checked = button.getAttribute("aria-checked") === "true";

        try {
            if (type === "card") {
                await toggleCardVerification({ id: requisiteId }).unwrap();
            } else if (type === "receipt") {
                await toggleReceiptVerification({ id: requisiteId }).unwrap();
            }

            button.setAttribute("aria-checked", String(!checked));
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <p className="space-x-4">
            <Switch
                title="Сменить статус верификации кредитной карты"
                disabled={isCardToggling}
                onClick={event => toggleVerification(event, "card")}
                className="disabled:cursor-not-allowed"
            />
            <Switch
                title="Сменить статус верификации квитанции об оплате"
                disabled={isReceiptToggling}
                onClick={event => toggleVerification(event, "receipt")}
                className="disabled:cursor-not-allowed"
            />
        </p>
    );
};

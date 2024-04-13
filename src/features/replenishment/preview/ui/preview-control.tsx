import { Link } from "react-router-dom";
import PreviewCardIcon from "../assets/card-preview-image.png";
import PreviewReceiptIcon from "../assets/receipt-preview-image.png";

interface PreviewControlProps {
    replenishmentId: string;
    cardEnabled: boolean;
    receiptEnabled: boolean;
}

export const PreviewControl: React.FC<PreviewControlProps> = ({
    replenishmentId,
    cardEnabled,
    receiptEnabled
}) => {
    if (cardEnabled && receiptEnabled)
        return (
            <div className="flex items-center justify-center gap-2">
                <Link
                    to={`preview/${replenishmentId}/card`}
                    title="Открыть фото кредитной карты"
                    className="transition-all duration-150 hover:scale-125"
                >
                    <img
                        src={PreviewCardIcon}
                        alt="Открыть фото кредитной карты"
                        width="36"
                    />
                    <span className="sr-only">
                        Открыть фото кредитной карты
                    </span>
                </Link>

                <Link
                    to={`preview/${replenishmentId}/receipt`}
                    title="Открыть фото квитанции об оплате"
                    className="transition-all duration-150 hover:scale-125"
                >
                    <img
                        src={PreviewReceiptIcon}
                        alt="Открыть фото квитанции об оплате"
                        width="36"
                    />
                    <span className="sr-only">
                        Открыть фото квитанции об оплате
                    </span>
                </Link>
            </div>
        );

    if (cardEnabled && !receiptEnabled)
        return (
            <Link
                to={`preview/${replenishmentId}/card`}
                title="Открыть фото кредитной карты"
                className="transition-all duration-150 hover:scale-125"
            >
                <img
                    src={PreviewCardIcon}
                    alt="Открыть фото кредитной карты"
                    width="36"
                />
                <span className="sr-only">Открыть фото кредитной карты</span>
            </Link>
        );

    if (!cardEnabled && receiptEnabled)
        return (
            <Link
                to={`preview/${replenishmentId}/receipt`}
                title="Открыть фото квитанции об оплате"
                className="transition-all duration-150 hover:scale-125"
            >
                <img
                    src={PreviewReceiptIcon}
                    alt="Открыть фото квитанции об оплате"
                    width="36"
                />
                <span className="sr-only">
                    Открыть фото квитанции об оплате
                </span>
            </Link>
        );
};

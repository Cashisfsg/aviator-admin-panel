import PreviewCardIcon from "../assets/card-preview-image.png";
import PreviewReceiptIcon from "../assets/receipt-preview-image.png";

export const PreviewControl = () => {
    return (
        <div>
            <button>
                <img
                    src={PreviewCardIcon}
                    alt="Открыть фото кредитной карты"
                />
                <span className="sr-only">Открыть фото кредитной карты</span>
            </button>
            <button>
                <img
                    src={PreviewReceiptIcon}
                    alt="Открыть фото квитанции об оплате"
                />
                <span className="sr-only">
                    Открыть фото квитанции об оплате
                </span>
            </button>
        </div>
    );
};

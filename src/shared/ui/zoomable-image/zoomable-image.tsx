import "./index.css";

import { cn } from "@/shared/lib/tailwind-merge";

interface ZoomableImageProps extends React.ComponentProps<"img"> {
    src: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
    className,
    ...props
}) => {
    const onMouseMoveHandler: React.MouseEventHandler<
        HTMLImageElement
    > = event => {
        const target = event.currentTarget;
        const { x, y, height, width } = target.getBoundingClientRect();

        const horizontal = ((event.clientX - x) / width) * 100;
        const vertical = ((event.clientY - y) / height) * 100;

        target.style.setProperty("--x", horizontal + "%");
        target.style.setProperty("--y", vertical + "%");
    };

    return (
        <div className="image-wrapper">
            <img
                className={cn("zoomable-image", className)}
                onMouseMove={onMouseMoveHandler}
                {...props}
            />
        </div>
    );
};

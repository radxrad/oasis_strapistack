import { getMicropubMedia} from "../lib/media";
import NextImage from "next/image";

const Image = ({ image }) => {
    const { alternativeText, width, height } = image.attributes;

    return (
        <NextImage
            layout="responsive"
            width={width}
            height={height}
            objectFit="contain"
            src={getMicropubMedia(image)}
            alt={alternativeText || ""}
        />
    );
};

export default Image;

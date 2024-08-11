import OpenAI from "openai";
import { useState } from "react";


export const StickerGenerator = () => {
    const openai = new OpenAI()

    const [stickerUrl, setStickerUrl] = useState<string | undefined>(undefined)

    const handleClick = async () => {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "256x256",
        })

        const url = (response.data[0].url)

        if(url === undefined) {
            setStickerUrl("")
        } else {
            setStickerUrl(url)
        }
    }

    return (
        <div>
            {stickerUrl ? <img src={stickerUrl} width="256px" height="256px"/> : null}
            <div className="p-4 bg-white text-black">
                <a>Click Me</a>
            </div>
        </div>
    )
}
import { useState } from "react";
import { PiArrowFatDownLight } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";

interface ChildProps {
    disliked: boolean
}

export const DownVoteButton: React.FC<ChildProps> = ({disliked}) => {

    const [open, SetOpen] = useState(false)

    return (
        <div
            onMouseEnter={() => SetOpen(true)}
            onMouseLeave={() => SetOpen(false)}
            className={open ? "border-cyan-950 border rounded select-none" : "select-none"}
            >
                {disliked ? <PiArrowFatUpFill/> : <PiArrowFatDownLight />}
            </div>
    )
}
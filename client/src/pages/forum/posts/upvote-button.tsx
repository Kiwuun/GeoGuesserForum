
import { useState } from "react";
import { PiArrowFatUpLight } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";

interface ChildProps {
    liked: boolean
}

export const UpVoteButton: React.FC<ChildProps> = ({liked}) => {

    const [open, SetOpen] = useState(false)

    return (
        <div
            onMouseEnter={() => SetOpen(true)}
            onMouseLeave={() => SetOpen(false)}
            
            className={open ? "border-cyan-950 border rounded select-none" : "select-none"}
            >
                {liked ?  <PiArrowFatUpFill /> : <PiArrowFatUpLight />}
            </div>
    )
}
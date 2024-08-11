import { CommentText } from "./comment-text"
import { CommentInput } from "./comment-input"
import { TipRecord } from "../../../context/tip-post-context"

import React from "react"


interface ChildProps {
    record: TipRecord
}

export const CommentBox: React.FC<ChildProps> = ({record}) => {

    return (
        <div className={record.comment_numbers ? "border border-black" : ""}>
            <CommentInput record={record}/>
            {record.comments.map((comment, index) => {
                return (
                    <div key={index}>
                        <CommentText comment={comment}/>
                    </div>
                )
            })}
        </div>
    )
}
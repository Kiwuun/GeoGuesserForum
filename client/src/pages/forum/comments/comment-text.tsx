import React from "react"
import { CommentRecord } from "../../../context/tip-post-context"

interface Comment {
    comment: CommentRecord
}

export const CommentText: React.FC<Comment> = ({comment}) => {
    
    return (
        <div>
            <p>{comment.username + ": " + comment.comment}</p>
        </div>
    )
}
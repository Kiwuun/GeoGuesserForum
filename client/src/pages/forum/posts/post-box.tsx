import { TipRecord } from "../../../context/tip-post-context"
import { UpVoteButton } from "./upvote-button";
import { DownVoteButton } from "./downvote-button";
import { useTipRecords } from "../../../context/tip-post-context";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { DeleteButton } from "./delete-button";


interface ChildProps {
    record: TipRecord
}

export const PostBox: React.FC<ChildProps> = ({record}) => {

    const { updateRecord } = useTipRecords()
    const { user } = useUser()

    const checkLiked = () => {
        const userId = user?.id ?? "";
        return record.liked_comments.includes(userId);
    }

    const checkDisliked = () => {
        const userId = user?.id ?? "";
        return record.disliked_comments.includes(userId);
    }

    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    useEffect(() => {
        setLiked(checkLiked());
        setDisliked(checkDisliked());
    }, [user]);

    const increment = () => {
        record.upvotes += 1
        updateRecord(record._id ?? "", record)
    }

    const decrement = () => {
        record.upvotes -= 1
        updateRecord(record._id ?? "", record)
    }

    const upVote = () => {
        if(!liked) {
            setLiked(() => true)
            setDisliked(() => false)
            increment()
            record.liked_comments.push(user?.id ?? "")
            record.disliked_comments = record.disliked_comments.filter(id => id !== user?.id);
            updateRecord(record?._id ?? "", record)
        }
        if(liked) {
            setLiked(() => false)
            decrement()
            record.liked_comments = record.liked_comments.filter(id => id !== user?.id)
            updateRecord(record?._id ?? "", record)
        }
    }

    const downVote = () => {
        if(!disliked) {
            setDisliked(() => true)
            setLiked(() => false)
            decrement()
            record.disliked_comments.push(user?.id ?? "");
            record.liked_comments = record.liked_comments.filter(id => id !== user?.id);
            updateRecord(record?._id ?? "", record);
        }
        if(disliked) {
            setDisliked(() => false)
            increment()
            record.disliked_comments = record.disliked_comments.filter(id => id !== user?.id);
            updateRecord(record?._id ?? "", record);
        }
    }

    const checkUser = () => {
        if(record.userId === user?.id) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            <h1>{record.full_name}</h1>
            <h1>{record.tip}</h1>
            <h1>{record.country}</h1>
            <h1>{record.tags}</h1>
            {checkUser() ? <DeleteButton userId={record.userId} post_id={record._id ?? ""}/>: ""}
            <div className="inline-flex items-center">
                <div onClick={upVote}>
                    <UpVoteButton liked={liked}/>
                </div>
                <h1 className="p-1">{record.upvotes}</h1>
                <div onClick={downVote}>
                    <DownVoteButton disliked={disliked}/>
                </div>
            </div>
        </>
    )
}
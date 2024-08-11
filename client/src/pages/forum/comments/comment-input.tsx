import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { TipRecord, useTipRecords } from "../../../context/tip-post-context"

interface ChildProps {
    record: TipRecord
}

export const CommentInput: React.FC<ChildProps> = ({record}) => {
    const { updateRecord } = useTipRecords()
    const { user } = useUser()

    const [text, setText] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()

        const newComment = {
            comment: text,
            username: user?.fullName ?? "",
            date_posted: new Date
        }

        record.comments.push(newComment)

        updateRecord(record._id ?? "", record)

        setText("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                    autoFocus
                    placeholder="Comment..."
                    className="w-1/4 rounded border border-cyan-950 bg-cyab-900/20 p-3 text-sm text-neutral-900
                    placeholder-cyan-900 focus:outline-0"/>
                    <button type="submit" className="button border-cyan-950 border p-2 rounded">Add Comment</button>
            </form>
        </div>
    )
}
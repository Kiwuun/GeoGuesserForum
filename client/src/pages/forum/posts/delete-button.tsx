import { useUser } from "@clerk/clerk-react"
import { useTipRecords } from "../../../context/tip-post-context"

interface ChildProps {
    userId: string
    post_id: string
}

export const DeleteButton: React.FC<ChildProps> = ({userId, post_id}) => {

    const { deleteRecord } = useTipRecords()
    const { user } = useUser()

    const checkUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(userId === user?.id) {
            deleteRecord(post_id)
        }
    }

    return (
        <div>
            <form onSubmit={checkUser}>
                <button type="submit" className="border border-black">Delete</button>
            </form>
        </div>
    )
}
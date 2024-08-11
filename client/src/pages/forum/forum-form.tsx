import { useState } from "react"
import { useTipRecords } from "../../context/tip-post-context"
import { useUser } from "@clerk/clerk-react"

interface ChildProps {
    countryParam: string
}

export const ForumInput: React.FC<ChildProps> = ({countryParam}) => {

    const checkCountryParam = () => {
        if(countryParam !== "") {
            return countryParam
        }
        return ""
    }

    const [tip, setTip] = useState("")
    const [country, setCountry] = useState(checkCountryParam())
    const [tags, setTags] = useState("")

    const { addRecord } = useTipRecords()
    const { user } = useUser()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()

        const tip_object = {
            userId: user?.id ?? "",
            full_name: user?.fullName ?? "",
            tip: tip ?? "",
            country: country.toLowerCase() ?? "",
            tags: tags ?? "",
            date: new Date(),
            upvotes: 1,
            comment_numbers: 0,
            liked_comments: [],
            disliked_comments: [],
            comments: []
        }
        addRecord(tip_object)

        setTip("")
        setCountry("")
        setTags("")
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="text-area">
                        <label>GeoTip</label>
                    <textarea
                        onChange={(e) => setTip(e.target.value)}
                        value={tip}
                            autoFocus
                            placeholder="Add new task..."
                            className="w-1/4 rounded border border-cyan-950 bg-cyab-900/20 p-3 text-sm text-neutral-900
                            placeholder-cyan-900 focus:outline-0"/>
                    </div>

                    <div className="country-input">
                        <label>Country</label>
                        <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)}
                        className="border-cyan-950 border rounded p-2"/>
                    </div>

                    <div className="tags-input">
                        <label>Tags</label>
                        <input type="text" required value={tags} onChange={(e) => setTags(e.target.value)}
                        className="border-cyan-950 border rounded p-2"/>
                    </div>
                    <button type="submit" className="button border-cyan-950 border p-2 rounded">Submit Tip</button>
                </div>
            </form>
        </div>
    )
}
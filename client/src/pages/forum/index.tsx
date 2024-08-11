import { ForumInput } from "./forum-form"
import { TipRecordList } from "./forum-list"
import { useParams } from "react-router-dom"
import { Header } from "./header/header"

export const Forum = () => {
    const { country } = useParams()

    return (
        <>
            <Header/>
            <ForumInput countryParam={country ?? ""}/>
            <TipRecordList country={country ?? ""}/>
        </>
    )
}
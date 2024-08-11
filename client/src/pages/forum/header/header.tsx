import { SignOutButton } from "@clerk/clerk-react"
import { MapButton } from "../../map/map-button"
import { HomeButton } from "../home-button"


export const Header = () => {

    return (
        <div className="inline-flex">
            <SignOutButton/>
            <MapButton/>
            <HomeButton/>
        </div>
    )
}
import { VectorMap } from "@react-jvectormap/core"
import { worldMill } from "@react-jvectormap/world"
import { useNavigate } from "react-router-dom"


export const WorldMap = () => {

    const countryName = new Intl.DisplayNames(["en"], {type: "region"})
    const navigate = useNavigate()

    const clickableCountries = ["canada", "united states", "greenland", "mexico", "guatemala", "costa rica", "panama", "dominican republic", "peurto rico", "colombia",
        "equador", "bolivia", "brazil", "peru", "chile", "argentina", "uruguay", "iceland", "norway", "sweden", "finland", "faroe islands", "denmark",
        "netherlands", "belgium", "france", "luxembourg", "germany", "spain", "portugal", "switzerland", "austria", "italy", "czechia", "slovakia",
        "slovenia", "croatia", "poland", "estonia", "latvia", "lithuania", "hungary", "serbia", "montenegro", "north macedonia", "albania", "romania",
        "bulgaria", "greece", "türkiye", "ukraine", "russia", "isreal", "jordan", "tunisia", "senegal", "ghana", "nigeria", "uganda", "kenya", "rwanda",
        "bostwana", "south africa", "lesotho", "eswatini", "madagascar", "kazakhstan", "kyrgyzstan", "mongolia"
    ]

    return (
        <div className="h-screen w-full bg-neutral-900 text-neutral-50">
            <VectorMap
                map={worldMill}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                onRegionClick={function handleNavigate(event, code) {
                    var name = (code)
                    var full_country = countryName.of(name)?.toLowerCase()
                    document.querySelectorAll('.jvectormap-tip').forEach((element) => { element.remove()})
                    navigate(`/forum/${full_country}`)
                }}
            />
        </div>
    )
}

import { useNavigate } from "react-router-dom"

export const HomeButton = () => {

    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate("/")
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button border-cyan-950 border p-2 ml-2 rounded">Home</button>
            </form>
        </div>
    )
}
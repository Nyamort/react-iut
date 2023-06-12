import { Fragment } from "react"

const TokenEnded = () => {
    localStorage.removeItem("jwt");
    window.location = "/";
    return (
        <div>
            <h1> Token not valid </h1>
        </div>
    )
}

export default TokenEnded
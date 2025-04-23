import { useState } from "react"
import Search from "./Search"
import Info from "./Info"

export default function Appcomp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "mumbai",
        temp: 30,
        humidity: 42,
        tempMax: 30.2,
        tempMin: 30.2,
        weather: " haze",
        feelLike: 25.5,
    });



    let updateInfo = (result) => {
        setWeatherInfo(result);
    };
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Weather APP</h1>
            <Search updateInfo={updateInfo} />
            <Info info={weatherInfo} />

        </div>
    )
}
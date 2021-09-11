import { useState, useEffect } from "react"
import { IMAGE_BASE_URL } from "../constants/constants"
import { randomPoster, truncate } from "../helpers/helpers"
import axios from "../services/axios"
import requests from "../services/requests"
import './banner.css'

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchOriginals)
            
            setMovie(request.data.results[
                randomPoster(request.data.results)
            ]);
        }
        fetchData()
    }, [])
    
    console.log("this is banner",movie);
    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                width: "100vw",
                backgroundImage: `url(
                    "${IMAGE_BASE_URL}${movie?.backdrop_path}"
                )`
        }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <a className="banner__button play">Play</a>
                    <a className="banner__button">My List</a>
                </div>

                <div className="banner__description">
                    <p>{ truncate(movie?.overview, 150) }</p>
                </div>

            </div>
            <div className="banner--fadeBottom"></div>

        </header>
    )
}

export default Banner

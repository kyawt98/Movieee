import { useState, useEffect } from "react"
import { IMAGE_BASE_URL } from "../constants/constants"
import axios from '../services/axios'
import { Link } from 'react-router-dom'
import './row.css'

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        // if [], run once when the row loads, and don't run again\
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            // console.log(request.data.results)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    // console.table(movies);

    return (

        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((data) => {
                    return  (
                            <div className="row__poster_container" key={data.id}>
                                <Link to={`/detail/${data.id}`}>
                                    <img
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    src={`${IMAGE_BASE_URL}${isLargeRow ? data.poster_path : data.backdrop_path}`} alt={data.name} />
                                </Link>
                            </div>
                        )
                }) }
            </div>
        </div>
                
    )
}

export default Row

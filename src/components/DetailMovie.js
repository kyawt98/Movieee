import axios from "../services/axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_KEY, IMAGE_BASE_URL } from "../constants/constants"
import './detailmovie.css'

const DetailMovie = () => {
    const { movie_id } = useParams()
    const [detail, setDetail] = useState({})
    console.log(movie_id);
    const fetchMovieDetail = `/movie/${movie_id}?api_key=${API_KEY}&append_to_response=videos`
    
    useEffect(() => {
        axios.get(fetchMovieDetail)
            .then(res => {
                if (res !== null) {
                    setDetail(res.data)
                } else {
                    console.log("Something is wrong");
                }
                console.log("data are",res.data);
            })
            .catch(err => {
            console.error(err);
            })
        // console.log(`Detail Movie: ${detail.title}`);
    }, [movie_id])

    console.log("detail is", detail.original_title);

    return (
        <div className="detail">
            <img
                className="detail__img"
                src={`${IMAGE_BASE_URL}${detail.backdrop_path}`} alt={detail.name} />
            
            <div className="detail__content">
                <div className="detail__top">
                    <span className="tagline">{ detail.tagline }</span> 
                    <h3 className="detail__title">{detail.original_title}</h3>

                    <div className="detail__labels">
                        <span className="detail__label">Released Date: <span className="label">{detail.release_date}</span></span>
                        
                        <span className="detail__label runtime">Duration: <span className="label">{detail.runtime}</span></span>
                        
                        <span className="detail__label">Rating: <span className="rating">{detail.vote_average}</span></span>
                    </div>
                    {/* {detail.genres.map((genre) => {
                        <span className="detail__genres">{genre.name}</span>
                        console.log(genre.name);
                    })} */}
                </div>
                <div className="detail__description">
                    <p className="detail__overview">{detail.overview}</p>
                    <a className="detail__trailer">trailer</a>
                </div>
            </div>
        </div>
    )
}

export default DetailMovie

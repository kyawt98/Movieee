import axios from "../services/axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_KEY, IMAGE_BASE_URL } from "../constants/constants"
import './detailmovie.css'
import YouTube from "react-youtube"
import { opts } from "../helpers/helpers"
import { Link } from "react-router-dom"

const DetailMovie = () => {
    const { movie_id } = useParams()
    const [detail, setDetail] = useState([])
    const [trailerUrl, setTrailerUrl] = useState([])
    const [similars, setSimilars] = useState([])

    // console.log(movie_id);
    const fetchMovieDetail = `/movie/${movie_id}?api_key=${API_KEY}&append_to_response=videos`
    
    useEffect(() => {
        async function fechDetail() {
            const request = await axios.get(fetchMovieDetail)
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
        }
        fechDetail()
        // console.log(`Detail Movie: ${detail.title}`);
    }, [movie_id])

    console.log("detail is", detail.original_title);

    const fetchTrailer = `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    useEffect(() => {
        const fetchData = async(movie_id) => {
            const request = await axios.get(fetchTrailer)
            console.log("trailers ",request.data.results)
            setTrailerUrl(request.data.results)
            return request
        }
        fetchData()
    }, [])

    const fetchSimilar = `/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US`
    useEffect(() => {
        const fetchData = async(movie_id) => {
            const request = await axios.get(fetchSimilar)
            // console.log("similars ",request.data.results)
            setSimilars(request.data.results)
            return request
        }
        fetchData()
    }, [])
    
    return (
    <>
        { detail && (
        <div className="detail">
            <img
                className="detail__img"
                src={`${IMAGE_BASE_URL}${detail?.backdrop_path || detail?.poster_path}`} alt={detail?.name} />
            <div className="detail--fadeBottom"></div>

            <div className="detail__content">
                <div className="detail__top">
                    <span className="tagline">{ detail.tagline }</span> 
                    <h3 className="detail__title">{detail?.original_title || detail?.titlle || detail?.name}</h3>
                    {/* <div className="detail__buttons">
                        <a className="detail__play">play</a>
                        <a  className="detail__trailer">trailer</a>
                    </div> */}
                    <div className="detail__labels">
                        <span className="detail__label">Released Date: <span className="label">{detail?.release_date}</span></span>
                        
                        <span className="detail__label runtime">Duration: <span className="label">{detail?.runtime} min</span></span>
                        
                        <span className="detail__label">Rating: <span className="rating">{detail?.vote_average}</span></span>
                    </div>
                </div>
                <div className="detail__description">
                    <p className="detail__overview">{detail?.overview}</p>
                    <div className="sub_description">
                        {/* <div className="sub__description_box">
                            <span className="desc_title">Genres: </span>
                            { detail.genres.map((genre) => {
                                
                                return (
                                    <>
                                        <span className="detail__genres" key={genre?.id}>{genre?.name}</span>
                                    </>
                                )
                            })}
                        </div> */}
                        {/* <div className="sub__description_box">
                            <span className="desc_title">Production companies: </span>
                            {detail.production_companies.map((company) => {
                                return (
                                    <>
                                        <span className="company_name">{company.name}</span>
                                    </>
                                )
                            })}
                        </div> */}
                    </div>       
                </div>
            </div>
                    
            {/* <div className="detail__detail">
                        {detail && <div className="images">
                            {detail.}
                </div>
                            
                }        
            </div> */}
                
                <h2 className="similar_label"> Similar Movies </h2>
  
                <div className="detail__trailer_section">
                {similars && <div className="detail__similars">
                            {
                                similars.map((similar) => {
                                    return (
                                        <Link sensitive="true" to={`/detail/${similar.id}`}>
                                        <img className="detail__similar" key={similar.id} src={`${IMAGE_BASE_URL}${similar.poster_path}`} />
                                        </Link>
                                    )
                                })
                    }
                </div>}
                {trailerUrl && <YouTube className="youtube" videoId={ trailerUrl[0]?.key || trailerUrl[1]?.key } opts={ opts }/>}        
            </div>
            
        </div>
            
        )}
    </>
        
    )
}

export default DetailMovie

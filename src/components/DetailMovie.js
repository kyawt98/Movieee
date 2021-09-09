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
    const [genre, setGenre] = useState([])
    const [trailerUrl, setTrailerUrl] = useState([])
    const [similars, setSimilars] = useState([])
    const [companies, setCompanies] = useState([])
    const [languages, setLanguages] = useState([])

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
            return request
        }
        fechDetail()
        // console.log(`Detail Movie: ${detail.title}`);
    }, [movie_id])

    console.log("detail is", detail.original_title);

    const fetchTrailer = `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    useEffect(() => {
        const fetchData = async(movie_id) => {
            const request = await axios.get(fetchTrailer)
            // console.log("trailers ",request.data.results)
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

    useEffect(() => {
        const genreList = () => {
            setGenre(detail.genres)
        }
        genreList()
    }, [detail])

    useEffect(() => {
        const companyList = () => {
            setCompanies(detail.production_companies)
        }
        companyList()
    }, [detail])

    useEffect(() => {
        const languageList = () => {
            setLanguages(detail.spoken_languages)
        }
        languageList()
    }, [detail])
    
    // console.log("company list", companies);

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
                         
                </div>
            </div>
                
                    <div className="detail__banner">
                        <div className="sub_description">
                            <div className="sub__description_box">
                                <span className="desc_title">Genres: </span>
                                {genre && genre.map((gen) => {    
                                    return (
                                        <>
                                            <span className="detail__genre" key={gen?.id}>{gen?.name}</span>
                                        </>
                                    )
                                })}    
                            </div>

                            {detail.adult === true && <div className="sub__description_box">
                                <span className="desc_title">Adult</span>
                            </div>}

                            <div className="sub__description_box">
                                <span className="desc_title">Duration: </span>
                                <span className="detail__des">{detail?.runtime} min</span>              
                            </div>

                            <div className="sub__description_box">
                                <span className="desc_title">Rating: </span>
                                <span className="detail__des">{detail?.vote_average}</span>              
                            </div>

                            <div className="sub__description_box">
                                <span className="desc_title">Production companies: </span>
                                {companies && companies.map((company) => {    
                                    return (
                                        <>
                                            <span className="detail__des" key={company?.id}>{company?.name}</span>
                                        </>
                                    )
                                })}               
                            </div>

                            <div className="sub__description_box">
                                <span className="desc_title">Languages: </span>
                                {languages && languages.map((language) => {    
                                    return (
                                        <>
                                            <span className="detail__des" key={language?.id}>{language?.english_name}</span>
                                        </>
                                    )
                                })}               
                            </div>

                            <div className="sub__description_box">
                                <span className="desc_title">Released Date: </span>
                                <span className="detail__des">{detail?.release_date}</span>              
                            </div>

                            <div className="sub__description_box">
                                <span className="desc_title">Status: </span>
                                <span className="detail__des">{detail?.status}</span>              
                            </div>
                        </div>
                        {trailerUrl && <YouTube className="youtube" videoId={ trailerUrl[0]?.key || trailerUrl[1]?.key } opts={ opts }/>} 
                    </div>

                <h2 className="similar_label"> Similar Movies </h2>
  
                <div className="detail__trailer_section">
                {similars && <div className="detail__similars">
                            {
                                similars.map((similar) => {
                                    return (
                                        <Link key={similar.id} sensitive="true" to={`/detail/${similar.id}`}>
                                        <img className="detail__similar" src={`${IMAGE_BASE_URL}${similar.poster_path}`} />
                                        </Link>
                                    )
                                })
                    }
                </div>}
            </div>
            
        </div>
            
        )}
    </>
        
    )
}

export default DetailMovie

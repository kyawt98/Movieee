import Row from "../components/Row"
import requests from "../services/requests"
import Banner from "../components/Banner"
const Home = () => {
    return (
        <>
            <Banner />
            <Row title="Netflix Originals" fetchUrl={requests.fetchOriginals}
            isLargeRow/>
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action" fetchUrl={ requests.fetchActionMovies }/>
            <Row title="Comdey" fetchUrl={ requests.fetchComedyMovies }/>
            <Row title="Horror" fetchUrl={ requests.fetchHorrorMovies }/>
            <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocmentaries} isLargeRow/>
        </>
    )
}

export default Home

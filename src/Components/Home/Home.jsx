import React, { useState } from 'react';
import "./Home.scss";
import axios from "axios";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";

const apiKey="299908cf94c98d93bed5d499c5e1d6c1";
const url="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming";
const topRated="top_rated";
const popular="popular";
const nowPlaying="now_playing";

const Card = ({img})=>(
    <img className="card" src={img} alt="cover" />
)

const Row=({title,arr = [],})=>(

    <div className="row" >

        <h2>{title}</h2>
        <div>
           {
            arr.map((item,index) => (
                <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
            ))
           }
        </div>

    </div>

);

const Home = () => {

    const [upcomingMovies, setUpcomingMoives] = useState([]);
    const [nowPlayingMovies, setNowPlayingMoives] = useState([]);
    const [popularMovies, setPopularMoives] = useState([]);
    const [topRatedMovies, setTopRatedMoives] = useState([]);
    const [genre, setGenre] = useState([]);
   useEffect(() => {
    
    const fetchUpcoming = async()=>{
        const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
        setUpcomingMoives(results)
    };

    const fetchNowPlaying = async()=>{
        const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
        setNowPlayingMoives(results)
    };

    const fetchPopular = async()=>{
        const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
        setPopularMoives(results)
    };

    const fetchTopRated = async()=>{
        const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
        setTopRatedMoives(results)
    };

    const getAllGenre = async()=>{
        const {data:{genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
        setGenre(genres);
    };
       getAllGenre();
       fetchUpcoming();
       fetchNowPlaying();
       fetchPopular();
       fetchTopRated();
       
   }, [])


  return (
    <section className="home">
        <div className="banner" style={{
            backgroundImage: popularMovies[0]? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"rgb(16,16,16);"
        }}>
  
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
        <button><BiPlay/> Play</button>
        <button>My List <AiOutlinePlus/></button>
        </div>

        </div>

        <Row title={"Upcomig"} arr={upcomingMovies}/>
        <Row title={"Now Playing"} arr={nowPlayingMovies}/>
        <Row title={"Top Rated"} arr={topRatedMovies}/>
        <Row title={"Popular"} arr={popularMovies}/>

        <div className ="genreBox">
            {
                genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                ))}
        </div>        
    </section>
  )
}

export default Home
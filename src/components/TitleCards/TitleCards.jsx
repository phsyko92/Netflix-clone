import './TitleCards.css';


import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {
  const [apiData, setAppiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2RmMzgzZDhiMDcwYTUxMTQ5Y2JlMGM1NmU3YjJlMiIsIm5iZiI6MTczMzQyNDk5OS43Niwic3ViIjoiNjc1MWY3Njc4MGU1YjhmMGE3NTYxOGMyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E6lV7xHH4S1O0p2fFp-_ApRLagl2YGMa5MoSx6Ia_d4'
    }
  };


  const handleWheel = (event) => {
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() =>{

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing" }?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setAppiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[]);

  return (
    <div className='titlecards'>
      <h2>{title? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`}className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='' />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;

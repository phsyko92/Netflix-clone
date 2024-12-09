import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2RmMzgzZDhiMDcwYTUxMTQ5Y2JlMGM1NmU3YjJlMiIsIm5iZiI6MTczMzQyNDk5OS43Niwic3ViIjoiNjc1MWY3Njc4MGU1YjhmMGE3NTYxOGMyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.E6lV7xHH4S1O0p2fFp-_ApRLagl2YGMa5MoSx6Ia_d4'
    }
  };

  useEffect(() =>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])



  return (
    <div className="player">
      <img src={back_arrow_icon} alt='' />
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`} title="trailer" frameBorder='0 allowFullScreen'></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player

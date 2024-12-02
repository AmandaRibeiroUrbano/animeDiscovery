import { sanitizedBug } from "utils/sanitizing";
import "./AnimeCards.css";

const AnimeCards = ({anime}) => {

  const isLongTitle = anime.title.length > 30;
  const sanitizedRating = sanitizedBug(anime.rating);

  return (
    <div className="anime-card">
      <div className="anime-card-images">
        <img className="image-anime" src={anime.images.jpg.large_image_url} alt={anime.title} />
        <img
          className="image-rating"
          src={`${process.env.PUBLIC_URL}/images/${sanitizedRating}.png`}
          alt={anime.rating}
          tabIndex="0"
        />
      </div>
      <div className="anime-card-content">
        <h3
          className={`anime-card-title ${isLongTitle ? "long-title" : ""}`}
          tabIndex="0"
        >
          {anime.title}
        </h3>
        <div className="anime-card-descriptions" tabIndex="0">
          <p className="anime-card-rating">Nota: {anime.score || "N/A"}</p>
          <p className="anime-card-length">{anime.type === "Movie"
                      ? "Filme"
                      : `Nº de episódios: ${anime.episodes || "Em lançamento"}`}</p>
        </div>
        <div className="anime-card-links">
          <a
            href={anime.trailer?.url}
            target="_blank"
            rel="noopener noreferrer"
            className={anime.trailer?.url ? "anime-card-link" : "disable-button"}
          >
            Trailer
          </a>
          <a
            href={`https://myanimelist.net/anime/${anime.mal_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="anime-card-link"
          >
            +info
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimeCards;

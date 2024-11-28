import "./AnimeCards.css";

const AnimeCards = (props) => {
  const {
    title,
    imgSrc,
    imgAlt,
    imgRating,
    altImgRating,
    score,
    duration,
    linkTrailer,
    trailerClassName,
    linkMyAnimeList,
    sinopseClassName
  } = props;

  const isLongTitle = title.length > 30;

  return (
    <div className="anime-card">
      <div className="anime-card-images">
        <img className="image-anime" src={imgSrc} alt={imgAlt} />
        <img
          className="image-rating"
          src={imgRating}
          alt={altImgRating}
          tabIndex="0"
        />
      </div>
      <div className="anime-card-content">
        <h3
          className={`anime-card-title ${isLongTitle ? "long-title" : ""}`}
          tabIndex="0"
        >
          {props.title}
        </h3>
        <div className="anime-card-descriptions" tabIndex="0">
          <p className="anime-card-rating">Nota: {score}</p>
          <p className="anime-card-length">{duration}</p>
        </div>
        <div className="anime-card-links">
          <a
            href={linkTrailer}
            target="_blank"
            rel="noopener noreferrer"
            className={trailerClassName}
          >
            Trailer
          </a>
          <a
            href={linkMyAnimeList}
            target="_blank"
            rel="noopener noreferrer"
            className={sinopseClassName}
          >
            +info
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimeCards;

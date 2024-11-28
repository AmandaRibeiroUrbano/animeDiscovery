import "./AnimeList.css";
import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AnimeCards from "./components/AnimeCards";
import PageActions from "./components/PageActions";
import PlaceholderCards from "./components/PlaceholderCards";
import ErrorUI from "../../components/ErrorUI";
import Footer from "../../components/Footer";

const API_URL = "https://api.jikan.moe/v4/anime?";

const categories = {
  Cientista: [24, 29, 78, 18],
  Investigativo: [39, 7, 41, 40],
  Engraçado: [4, 57],
  Romantico: [22, 64, 43, 80],
  Perigoso: [68, 38, 13, 17],
  Relaxado: [36, 47, 23, 42],
  Vampiresco: [32, 37],
  Reflexivo: [1, 2, 8, 27],
  Esportivo: [30, 77, 54, 3],
};

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleAndFilter(animes, count = 4) {
  const nonRepeatAnimes = animes.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );
  return [...nonRepeatAnimes].sort(() => Math.random() - 0.5).slice(0, count);
}

const AnimeList = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [visibleAnimes, setVisibleAnimes] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [loadedpages, setLoadedpages] = useState({});

  async function fetchAnimes(isInitialLoad = true) {
    try {
      setLoading(true);
      setError(null);

      const category = searchParams.get("category");
      const genre = categories[category];
      const avaliation = searchParams.get("avaliation");
      const avaliationParsed = avaliation === "any" ? 0 : 8;
      const animeStatus = searchParams.get("finished");
      const safeToWork = searchParams.get("sfw");
      const rating = searchParams.get("rating");
      let fetchedAnimes = [];

      for (let i = 0; i < genre.length; i++) {
        const genreId = genre[i];
        let pageToLoad = isInitialLoad ? 1 : randomIntFromInterval(1, loadedpages[genreId]?.last_visible_page || 1);
        let endPointApi = `${API_URL}${animeStatus === "true" ? `&status=complete` : ""}${safeToWork === "true" ? "&sfw=true" : ""}${rating === "all" ? "" : `&rating=${rating}`}&min_score=${avaliationParsed}&genres=${genreId}&page=${pageToLoad}&unapproved=false`;

        const response = await fetch(endPointApi, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        await delay();

        const data = await response.json();
        if (data.data) {
          fetchedAnimes = [...fetchedAnimes, ...data.data];
        }

        if (isInitialLoad && data.pagination) {
          setLoadedpages((prev) => ({
            ...prev,
            [genreId]: { last_visible_page: data.pagination.last_visible_page }
          }));
        }
      }
      setVisibleAnimes(shuffleAndFilter(fetchedAnimes));
    } catch (error) {
      console.error("Erro ao buscar os dados da API:", error);
      setLoading(false);
      setError("Houve um problema ao buscar os animes. Por favor, tente novamente.");
    }finally{
      setLoading(false);
    }
  }

  const handleRetry = () => {
    setError(null);
    fetchAnimes();
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  return (
    <div className="anime-list-page">
      {loading && <PlaceholderCards count={4} />}
      {error && <ErrorUI error={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <div className="anime-list-container">
          <div className="anime-list">
            {visibleAnimes.map((anime) => (
              <AnimeCards
                key={anime.mal_id}
                imgSrc={anime.images.jpg.large_image_url}
                imgAlt={anime.title}
                imgRating={`${process.env.PUBLIC_URL}/images/${anime.rating}.png`}
                altImgRating={anime.rating}
                title={anime.title}
                score={anime.score || "N/A"}
                duration={
                  anime.type === "Movie"
                    ? "Filme"
                    : `Nº de episódios: ${anime.episodes || "Em lançamento"}`
                }
                linkTrailer={anime.trailer?.url}
                trailerClassName={
                  anime.trailer?.url ? "anime-card-link" : "disable-button"
                }
                linkMyAnimeList={`https://myanimelist.net/anime/${anime.mal_id}`}
                sinopseClassName="anime-card-link"
              />
            ))}
          </div>
          <PageActions
            newFilters={() => navigate("/anime_filters")}
            generateNewAnimes={() => fetchAnimes(false)}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnimeList;

import "./AnimeList.css";
import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AnimeCards from "./components/AnimeCards";
import PageActions from "./components/PageActions";
import PlaceholderCards from "./components/PlaceholderCards";
import ErrorUI from "components/ErrorUI";
import Footer from "components/Footer";
import { API_URL } from "constants/APIURL";
import { delay } from "utils/time";
import { randomIntFromInterval } from "utils/randomInterval";

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
        
        await delay();

        const genreId = genre[i];
        let pageToLoad = isInitialLoad
          ? 1
          : randomIntFromInterval(
              1,
              loadedpages[genreId]?.last_visible_page || 1
            );
        let endPointApi = `${API_URL}${
          animeStatus === "true" ? `&status=complete` : ""
        }${safeToWork === "true" ? "&sfw=true" : ""}${
          rating === "all" ? "" : `&rating=${rating}`
        }&min_score=${avaliationParsed}&genres=${genreId}&page=${pageToLoad}&unapproved=false`;

        const response = await fetch(endPointApi, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.data) {
          fetchedAnimes = [...fetchedAnimes, ...data.data];
        }

        if (isInitialLoad && data.pagination) {
          setLoadedpages((prev) => ({
            ...prev,
            [genreId]: { last_visible_page: data.pagination.last_visible_page },
          }));
        }
      }
      setVisibleAnimes(shuffleAndFilter(fetchedAnimes));
    } catch (error) {
      console.error("Erro ao buscar os dados da API:", error);
      setLoading(false);
      setError(
        "Houve um problema ao buscar os animes. Por favor, tente novamente."
      );
    } finally {
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
            {visibleAnimes.map((anime) => {
              return(
                <AnimeCards anime = {anime} key={anime.mal_id}/>
              )
            })}
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

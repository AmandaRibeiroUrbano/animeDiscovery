import Main from "./pages/Main";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [animes, setAnimes] = useState([]);
  const [animeImages, setAnimeImages] = useState([]);

  const shuffleAnimes = (animes) => {
    return animes.sort(() => Math.random() - 0.5);
  };

  const getAnimes = async () => {
    try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(`https://api.jikan.moe/v4/anime?page=${randomPage}&sfw=true`);
      const data = await response.json();
      setAnimes(shuffleAnimes(data.data));
    } catch (error) {
      console.error("Erro ao buscar os dados da API:", error);
    }
  };

  const getAnimeImages = () => {
    if (animes && animes.length > 0) {
      const images = animes.map((anime) => anime.images.jpg.large_image_url);
      setAnimeImages(images);
    }
  };

  useEffect(() => {
    getAnimes();
  }, []);

  useEffect(() => {
    getAnimeImages();
  }, [animes]);

  return (
    <div className="app">
        <Main
          animeImages={animeImages}
        />
    </div>
  );
}

export default App;

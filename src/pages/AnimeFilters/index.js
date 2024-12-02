import "./AnimeFilters.css";
import Modal from "react-modal";
import FormItems from "components/FormItems";
import { useState } from "react";
import Footer from "components/Footer";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FaFlask,
  FaHeart,
  FaSkull,
  FaCoffee,
  FaRegLaughSquint,
} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiVampireDracula } from "react-icons/gi";
import { TfiThought } from "react-icons/tfi";
import { IoMdFootball } from "react-icons/io";
import { Md18UpRating } from "react-icons/md";
import { useNavigate } from "react-router";
import NeonButton from "../../components/NeonButton";

const customStyles = {
  content: {
    display: "flex",
    width: "80%",
    maxWidth: "500px",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#1a0225",
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const AnimeFilters = () => {
  let navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [isEnded, setIsEnded] = useState("");
  const [animeRating, setAnimeRatinganime] = useState("");
  const [audienceRating, setAudienceRating] = useState("");
  const [checked, setChecked] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [confirmedSfw, setConfirmedSfw] = useState(false);

  const moodOptions = [
    {
      value: "Cientista",
      label: (
        <span>
          <FaFlask /> Cientista
        </span>
      ),
    },
    {
      value: "Investigativo",
      label: (
        <span>
          <FaMagnifyingGlass /> Investigativo
        </span>
      ),
    },
    {
      value: "Engraçado",
      label: (
        <span>
          <FaRegLaughSquint /> Engraçado
        </span>
      ),
    },
    {
      value: "Romantico",
      label: (
        <span>
          <FaHeart /> Romântico
        </span>
      ),
    },
    {
      value: "Perigoso",
      label: (
        <span>
          <FaSkull /> Perigoso
        </span>
      ),
    },
    {
      value: "Relaxado",
      label: (
        <span>
          <FaCoffee /> Relaxado
        </span>
      ),
    },
    {
      value: "Vampiresco",
      label: (
        <span>
          <GiVampireDracula /> Vampiresco
        </span>
      ),
    },
    {
      value: "Reflexivo",
      label: (
        <span>
          <TfiThought /> Reflexivo
        </span>
      ),
    },
    {
      value: "Esportivo",
      label: (
        <span>
          <IoMdFootball /> Esportivo
        </span>
      ),
    },
  ];

  const isEndedOptions = [
    { value: true, label: "Sim" },
    { value: false, label: "Não ligo" },
  ];

  const animeRatingOptions = [
    { value: "above8", label: "Prefiro ver o que a galera curte" },
    { value: "any", label: "Claro! Posso me surpreender" },
  ];

  const audienceRatingOptions = [
    { value: "all", label: "Todas as classificações" },
    { value: "g", label: "Apenas Livre para todos os públicos" },
    { value: "pg", label: "Apenas Infantil" },
    { value: "pg13", label: "Apenas conteúdo para maiores de 12 anos" },
    {
      value: "r17",
      label: "Apenas conteúdo para maiores de 16 anos (violência)",
    },
    { value: "r", label: "Apenas conteúdo para maiores de 18 anos (nudez)" },
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    if (!isChecked && !confirmedSfw) {
      openModal();
      return;
    }
    setChecked(isChecked);
  };

  const handleCheckboxKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChange({target: { checked: !checked }})
    }
  };

  return (
    <div className="anime-filters">
      <form
        className="form-anime-filters"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(
            `/anime_list?category=${mood}&finished=${isEnded}&avaliation=${animeRating}&rating=${audienceRating}&sfw=${
              checked ? "true" : "false"
            }`
          );
        }}
      >
        <h1> Vamos nessa! </h1>

        <FormItems
          label="Qual é o seu mood de hoje?"
          value={mood}
          options={moodOptions}
          changeOption={setMood}
        />

        <FormItems
          label="O anime precisa estar finalizado?"
          value={isEnded}
          options={isEndedOptions}
          changeOption={setIsEnded}
        />

        <FormItems
          label="Aceita anime com a nota abaixo de nota 8 no MyAnimeList?"
          value={animeRating}
          options={animeRatingOptions}
          changeOption={setAnimeRatinganime}
        />

        <FormItems
          label="Classificação Indicativa"
          value={audienceRating}
          options={audienceRatingOptions}
          changeOption={setAudienceRating}
        />

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={checked}
              onChange={handleChange}
              onKeyDown={handleCheckboxKeyDown}
            />
          }
          label=<p>
            {" "}
            Mostrar apenas animes{" "}
            <abbr title="Abreviação para: Safe To Work"> SFW* </abbr>{" "}
            apropriados para todos os públicos{" "}
          </p>
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            "& .MuiFormControlLabel-label": {
              fontSize: "0.85rem",
            },
          }}
        />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Confirmação de Maioridade"
        >
          <h1 className="modal-title">
            Confirmação de Maioridade
            <span className="icon18">
              <Md18UpRating />
            </span>
          </h1>
          <p className="modal-text">
            Ao desmarcar esta opção, você confirma que é{" "}
            <span className="boldText">maior de 18 anos</span> e está ciente de
            que alguns conteúdos podem não ser apropriados para todos os
            públicos.
          </p>
          <div className="modal-button-container">
            <NeonButton
              classNameButton="neon-button modal-neon-button"
              fontSize="1rem"
              content="Confirmar"
              action={() => {
                setConfirmedSfw(true);
                setChecked(false);
                closeModal();
              }}
            />
            <NeonButton
              autoFocus={true}
              classNameButton="neon-button modal-neon-button"
              fontSize="1rem"
              color="#bababa"
              content="Cancelar"
              action={closeModal}
            />
          </div>
        </Modal>

        <NeonButton content="Gerar Animes" fontSize="1.4rem" />
      </form>
      <Footer />
    </div>
  );
};

export default AnimeFilters;

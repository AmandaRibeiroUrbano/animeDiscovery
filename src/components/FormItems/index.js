import "./FormItems.css";
import Select from "react-select";
import { useState } from "react";

const FormItems = ({ label, labelId, value, changeOption, options }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1e293b",
      color: "#fff",
      borderRadius: "8px",
      border: state.isFocused ? "2px solid #18fbb3" : "2px solid #1e293b",
      boxShadow: state.isFocused ? "0 0 10px #18fbb3" : "none",
      padding: "2px 4px",
      fontSize: "0.85rem",
      cursor: "pointer",
      "&:hover": {
        border: "2px solid #18fbb3",
      },
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#3b82f6" : "#1e293b",
      color: "#fff",
      fontSize: "0.85rem",
      letterSpacing: ".6px",
      fontWeight: "400",
      padding: "8px",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
      fontSize: "0.85rem",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      maxHeight: "300px",
      overflow: "hidden",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#8a8a8a",
      fontSize: "0.8rem",
    }),
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setMenuIsOpen(true);
    }
  };


  return (
    <div className="select-container">
      <label id={labelId} htmlFor={labelId}>
        {label}
      </label>
      <Select
        placeholder="Escolha uma das opções..."
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => changeOption(selectedOption.value)}
        styles={customStyles}
        isSearchable
        required
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        aria-labelledby={labelId}
        aria-live="polite"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default FormItems;

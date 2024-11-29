import "./NeonButton.css"

const NeonButton = ({classNameButton="neon-button", autoFocus=false, action, content, fontSize = "1.5rem", color = "#18fbb3"}) =>{
    return(
    <button
    autoFocus={autoFocus}
    className= {classNameButton} 
    onClick={action}
    style={{
        fontSize: fontSize, 
        "--button-color": color,
      }}
    >
        {content}
    </button>
    )
}

export default NeonButton
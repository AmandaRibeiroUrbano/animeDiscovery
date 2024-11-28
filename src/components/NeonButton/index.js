import "./NeonButton.css"

const NeonButton = ({action, content, fontSize = "1.5rem", color = "#18fbb3"}) =>{
    return(
    <button 
    className="neon-button" 
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
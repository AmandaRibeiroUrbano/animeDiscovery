import "./ErrorUI.css"

const ErrorUI = ({error, onRetry}) => {
    return (
        <div className="error-ui">
          <p>{error}</p>
          <button
            onClick={onRetry}
          >
            Tentar novamente
          </button>
        </div>
    )
}

export default ErrorUI;
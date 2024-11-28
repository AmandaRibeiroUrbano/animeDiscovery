import "./PageActions.css"

const PageActions = ({newFilters, generateNewAnimes, className="page-actions"}) => {
    return(
        <div className={className}>
              <button onClick={newFilters}>
                Novas preferências
              </button>

              <button onClick={generateNewAnimes}>
                Gerar outros animes
            </button>
        </div>
    )
}

export default PageActions
import PageActions from '../PageActions';
import './PlaceholderCards.css';

const PlaceholderCards = ({ count }) => {
  return (
    <div className="anime-list-container">
      <div className="anime-list">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="anime-card placeholder">
            <div className="loading-icon"></div>
          </div>
        ))}
      </div>
      <PageActions className='disabled'/>
    </div>
  );
};

export default PlaceholderCards;
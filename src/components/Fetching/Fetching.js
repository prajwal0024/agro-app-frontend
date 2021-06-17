import './Fetching.css';
import { ReactComponent as WeatherSvg } from '../../assests/illustration/fetching-weather.svg';
import { ReactComponent as MarketSvg } from '../../assests/illustration/market-loading.svg';
const Fetching = ({ svg, text }) => {
  return (
    <div className="fetching">
      {svg === 'weather' ? (
        <WeatherSvg className="fetching-svg" />
      ) : (
        <MarketSvg className="fetching-svg" />
      )}
      <p className="fetching-text">{text}</p>
    </div>
  );
};

export default Fetching;

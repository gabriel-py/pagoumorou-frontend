import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import RoomCard from './components/RoomCard';
import SearchFrame from './components/SearchFrame';


const Search = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)

  return (
    <div className={styles.screen}>
      <SearchFrame />
      <div className={styles.roomsResults}>
        <RoomCard index={0} />
        <RoomCard index={1} />
        <RoomCard index={2} />
      </div>
    </div>
  );
};

export default Search;

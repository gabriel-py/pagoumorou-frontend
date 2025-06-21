import { useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import RoomCard from './components/RoomCard';
import SearchFrame from './components/SearchFrame';
import { SearchServicePayload } from '@/services/api/search/types';
import { useAppDispatch } from '@/store';
import { search } from '@/store/services';


const Search = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const initialData = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      location: queryParams.get('location') || '',
      lat: queryParams.get('lat') || '',
      lon: queryParams.get('lon') || '',
      gender: queryParams.get('gender') || '',
      moveDate: queryParams.get('moveDate') || '',
      stayDuration: queryParams.get('stayDuration') || '',
    };
  }, [location.search]);

  useEffect(() => {
    if (!initialData.lat || !initialData.lon) return;

    const payload: SearchServicePayload = {
      location: initialData.location,
      lat: parseFloat(initialData.lat),
      lon: parseFloat(initialData.lon),
      gender: initialData.gender,
      moveDate: initialData.moveDate,
      stayDuration: Number(initialData.stayDuration),
    };

    dispatch(search(payload));
  }, [initialData]);

  return (
    <div className={styles.screen}>
      <SearchFrame defaultValues={initialData} />
      <div className={styles.roomsResults}>
        <RoomCard index={0} />
        <RoomCard index={1} />
        <RoomCard index={2} />
      </div>
    </div>
  );
};

export default Search;

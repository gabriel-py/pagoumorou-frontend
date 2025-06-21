import { useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import Button from '@/components/Button';
import { fetchBrazilianLocations } from '@/utils/destination';

type LocationOption = {
    label: string;
    lat: number;
    lon: number;
};

const genderOptions = [
  { label: 'Homem', value: 'male' },
  { label: 'Mulher', value: 'female' },
  { label: 'Não quero informar', value: 'other' },
];

const stayOptions = [
    { label: '7 dias', value: 7 },
    { label: '15 dias', value: 15 },
    { label: '1 mês', value: 30 },
    { label: '1 semestre', value: 180 },
    { label: '1 ano', value: 365 },
];

interface SearchFrameProps {
  defaultValues?: {
    location: string;
    lat: string;
    lon: string;
    gender: string;
    moveDate: string;
    stayDuration: string;
  };
}


const SearchFrame = ({ defaultValues }: SearchFrameProps) => {
  const [location, setLocation] = useState<LocationOption | null>(
    defaultValues?.location
      ? {
          label: defaultValues.location,
          lat: parseFloat(defaultValues.lat),
          lon: parseFloat(defaultValues.lon),
        }
      : null
  );

  const [options, setOptions] = useState<LocationOption[]>([]);
  const [moveDate, setMoveDate] = useState<Dayjs | null>(
    defaultValues?.moveDate ? dayjs(defaultValues.moveDate) : null
  );
  const [gender, setGender] = useState<string>(defaultValues?.gender || '');
  const [stayDuration, setStayDuration] = useState<number | undefined>(
    defaultValues?.stayDuration ? Number(defaultValues.stayDuration) : undefined
  );

  const [searchInput, setSearchInput] = useState(defaultValues?.location || '');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log({ location, moveDate, gender });

    const params = new URLSearchParams({
      location: location?.label || '',
      lat: String(location?.lat || ''),
      lon: String(location?.lon || ''),
      gender: gender || '',
      moveDate: moveDate?.format('YYYY-MM-DD') || '',
      stayDuration: String(stayDuration || ''),
    });

    navigate(`/search?${params.toString()}`);
  };

  console.log(options)

  useEffect(() => {
    if(searchInput?.length === 0 || searchInput === location?.label) return;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(async () => {
      const results = await fetchBrazilianLocations(searchInput);

      const seenLabels = new Set<string>();
      const formattedResults: LocationOption[] =
        (results?.map((result) => {
            const name = result?.name ?? '';
            const city = result?.address?.city ?? '';
            const country = result?.address?.country ?? '';
            const label = [name, city, country].filter(Boolean).join(', ');
            return {
            label,
            lat: result?.lat,
            lon: result?.lon,
            };
        }) ?? []).filter((item) => {
            if (seenLabels.has(item.label)) return false;
            seenLabels.add(item.label);
            return true;
        });

      console.log(formattedResults)
      setOptions(formattedResults);
    }, 1000);

    setDebounceTimeout(timeout);
  }, [searchInput]);

  return (
    <div className={styles.container}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={location}
        onInputChange={(_, value) => setSearchInput(value)}
        onChange={(_, newValue) => setLocation(newValue || '')}
        renderInput={(params) => <TextField {...params} label="Destino" />}
        disableClearable
        openOnFocus
        sx={{ minWidth: 200, flex: 1 }}
      />

      <FormControl sx={{ minWidth: 200, flex: 1 }}>
        <InputLabel>Gênero do hóspede</InputLabel>
        <Select
          value={gender}
          label="Gênero"
          onChange={(e) => setGender(e.target.value)}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePicker
        label="Data de mudança"
        value={moveDate}
        onChange={(newDate) => setMoveDate(newDate)}
        format='DD/MM/YYYY'
        sx={{ minWidth: 200, flex: 1 }}
      />

      <FormControl sx={{ minWidth: 200, flex: 1 }}>
        <InputLabel>Tempo de estadia</InputLabel>
        <Select
          value={stayDuration}
          label="Tempo de estadia"
          onChange={(e) => setStayDuration(Number(e.target.value))}
        >
          {stayOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button label="Pesquisar" onClick={handleSearch} />
    </div>
  )
};

export default SearchFrame;

import { useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './styles.module.scss';
import Button from '@/components/Button';
import { fetchBrazilianLocations } from '@/utils/destination';


const genderOptions = [
  { label: 'Não quero informar', value: 'other' },
  { label: 'Homem', value: 'male' },
  { label: 'Mulher', value: 'female' },
];

type LocationOption = {
    label: string;
    lat: number;
    lon: number;
};


const SearchFrame = () => {
  const [location, setLocation] = useState<LocationOption | null>(null);
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [moveDate, setMoveDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState('other');
  const [searchInput, setSearchInput] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = () => {
    console.log({ location, moveDate, gender });
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

      <DatePicker
        label="Data de mudança"
        value={moveDate}
        onChange={(newDate) => setMoveDate(newDate)}
        format='DD/MM/YYYY'
        sx={{ minWidth: 200, flex: 1 }}
      />

      <FormControl sx={{ minWidth: 200, flex: 1 }}>
        <InputLabel>Gênero</InputLabel>
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

      <Button label="Pesquisar" onClick={handleSearch} />
    </div>
  )
};

export default SearchFrame;

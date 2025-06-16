import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

interface SelectMultipleProps {
  options: string[];
  label: string;
  onChange: (selected: string[]) => void;
}

const SelectMultiple: React.FC<SelectMultipleProps> = ({ options, label, onChange }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const {
      target: { value },
    } = event;

    const newSelectedOptions = typeof value === 'string' ? value.split(',') : value;
    setSelectedOptions(newSelectedOptions);
    
    onChange(newSelectedOptions);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMultiple;

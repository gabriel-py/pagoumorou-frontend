import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';

dayjs.extend(customParseFormat);

interface SingleInputDateRangePickerProps {
  onChange: (value: [Dayjs | null, Dayjs | null]) => void;
}

export default function SingleInputDateRangePicker({ onChange }: SingleInputDateRangePickerProps) {
  const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const handleDateRangeChange = (newDateRange: [Dayjs | null, Dayjs | null]) => {
    setValue(newDateRange);
    onChange(newDateRange);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']}>
        <DateRangePicker
          value={value}
          onChange={handleDateRangeChange}
          slots={{ field: SingleInputDateRangeField }}
          name="allowedRange"
          format="DD/MM/YYYY"
          slotProps={{ textField: { placeholder: 'Período' } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

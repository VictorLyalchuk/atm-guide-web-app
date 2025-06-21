import React from 'react';
import { FormControl, MenuItem, TextField } from '@mui/material';

interface Option {
  id: string;
  name: string;
}

interface SelectComponentProps {
  id?: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  id = '',
  name,
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <FormControl fullWidth>
      <TextField
        variant="standard"
        id={id}
        name={name}
        select
        value={value}
        onChange={onChange}
        error={!!error}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {error ? (
        <div className="h-6 text-xs text-red-500">Помилка: {error}</div>
      ) : (
        <div className="h-6 text-xs">&nbsp;</div>
      )}
    </FormControl>
  );
};

export default SelectComponent;

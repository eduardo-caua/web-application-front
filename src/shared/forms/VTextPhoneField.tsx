import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import InputMask, { Props } from 'react-input-mask';

type TVTextPhoneFieldProps = TextFieldProps & {
  name: string;
};
export const VTextPhoneField: React.FC<TVTextPhoneFieldProps> = ({ name, label, fullWidth, disabled, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  return (
    <InputMask
      name={name}
      defaultValue={defaultValue}
      value={value}
      mask="(999) 999-9999"
      disabled={disabled}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}>
      {(inputProps: Props & TextFieldProps) => <TextField {...inputProps} label={label} fullWidth={fullWidth} type="tel" error={!!error} helperText={error} />}
    </InputMask>
  );
};

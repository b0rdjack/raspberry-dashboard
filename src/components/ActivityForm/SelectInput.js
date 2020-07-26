import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  custom_select: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectInput({
  input_label_id,
  input_label,
  select_id,
  select_name,
  onChange,
  value,
  items,
  item_value_key,
  item_label_key,
  message,
  array,
}) {
  let classes = useStyles();
  return (
    <FormControl
      fullWidth={true}
      required={true}
      variant="outlined"
      error={value === "" ? true : false}
      className={classes.custom_select}
    >
      <InputLabel id={input_label_id}>{input_label}</InputLabel>
      <Select
        id={select_id}
        label={input_label}
        labelId={input_label_id}
        name={select_name}
        onChange={e => onChange(e, items)}
        value={value}
      >
        {items.map(item => {
          return (
            <MenuItem key={item.id} value={item[item_value_key]}>
              {item[item_label_key]}
            </MenuItem>
          );
        })}
      </Select>
      {value === "" ? <FormHelperText>{message}</FormHelperText> : <></>}
    </FormControl>
  );
}

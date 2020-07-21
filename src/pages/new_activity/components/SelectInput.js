import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Checkbox,
  ListItemText,
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
  multiple,
}) {
  let classes = useStyles();

  const render_simple = item => {
    return (
      <MenuItem key={item.id} value={item[item_value_key]}>
        {item[item_label_key]}
      </MenuItem>
    );
  };
  const render_multiple = item => {
    return (
      <MenuItem key={item.id} value={item[item_value_key]}>
        <Checkbox
          checked={
            items
              .map(tmp => {
                return tmp[item_value_key];
              })
              .indexOf(item[item_value_key]) > -1
          }
        />
        <ListItemText primary={item} />
      </MenuItem>
    );
  };

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
          return multiple ? render_multiple(item) : render_simple(item);
        })}
      </Select>
      {value === "" ? <FormHelperText>{message}</FormHelperText> : <></>}
    </FormControl>
  );
}

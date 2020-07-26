import React from "react";
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  custom_select: {
    marginTop: theme.spacing(2),
  },
}));

export default function MultipleSelectInput({
  input_label_id,
  input_label,
  select_id,
  select_name,
  onChange,
  selected_items,
  items,
  item_value_key,
  message,
}) {
  let classes = useStyles();
  return (
    <FormControl
      fullWidth={true}
      required={true}
      className={classes.custom_select}
      error={selected_items.length === 0 ? true : false}
    >
      <InputLabel id={input_label_id}>{input_label}</InputLabel>
      <Select
        id={select_id}
        label={input_label}
        labelId={input_label_id}
        multiple
        value={selected_items.map(item => item[item_value_key])}
        onChange={e => onChange(e, items)}
        input={<Input />}
        MenuProps={{ getContentAnchorEl: () => null }}
        renderValue={selected => selected.join(", ")}
      >
        {items.map(item => {
          return (
            <MenuItem key={item[item_value_key]} value={item[item_value_key]}>
              <Checkbox
                checked={
                  selected_items.findIndex(
                    tmp => tmp[item_value_key] === item[item_value_key],
                  ) > -1
                }
              />
              <ListItemText primary={item[item_value_key]} />
            </MenuItem>
          );
        })}
      </Select>
      {selected_items.length === 0 ? (
        <FormHelperText>{message}</FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
}

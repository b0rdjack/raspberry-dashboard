import React from "react";
import { TextField } from "@material-ui/core";

export default function Input({
  autoFocus, label, message, name, onChange, regexCheck, value
}) {
  return (
    <>
      <TextField
        autoFocus={autoFocus}
        error={regexCheck(value) ? false : true }
        fullWidth={true}
        helperText={regexCheck(value) ? "" : message}
        id={"_" + name}
        label={label}
        margin="normal"
        name={name}
        onChange={e => onChange(e)}
        placeholder={label}
        required={true}
        value={value}
        variant="outlined"
      />
    </>
  )
}
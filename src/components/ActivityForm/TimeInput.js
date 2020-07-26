import React from "react";
import { TextField } from "@material-ui/core";

export default function TimeInput({ label, name, onChange, value }) {
  return (
    <>
      <TextField
        fullWidth={true}
        id={"_" + name}
        label={label}
        margin="normal"
        name={name}
        onChange={onChange}
        required={true}
        type="time"
        value={value}
      />
    </>
  );
}

import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import { API_URL } from "../../constant";

import PageTitle from "../../components/PageTitle/PageTitle";
import Input from "./components/Input";
import TimeInput from "./components/TimeInput";
import MainForm from "./components/MainForm";

export default function NewActivity() {
  const [activity, setActivity] = useState({
    name: "",
    address: "",
    siren: "",
    phone_number: "",
    opening_hours: "07:30",
    closing_hours: "21:30",
    average_time_spent: "00:30",
    disabled_access: "0",
  });

  return (
    <>
      <PageTitle title="Création d'une activité" />
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <MainForm activity={activity} setActivity={setActivity} />
        </Grid>
      </Grid>
    </>
  );
}

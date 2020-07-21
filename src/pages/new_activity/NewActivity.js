import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import { API_URL } from "../../constant";

import PageTitle from "../../components/PageTitle/PageTitle";
import MainForm from "./components/MainForm";
import RelationForm from "./components/RelationForm";

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
    postal_code: {
      id: "",
      code: "",
    },
    subcategory: {
      id: "",
      label: "",
    },
    state: {
      id: "",
      label: "",
    },
    quantity: {
      id: "",
      label: "",
    },
  });

  return (
    <>
      <PageTitle title="Création d'une activité" />
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <MainForm activity={activity} setActivity={setActivity} />
        </Grid>
        <Grid item xs={3}>
          <RelationForm activity={activity} setActivity={setActivity} />
        </Grid>
      </Grid>
    </>
  );
}

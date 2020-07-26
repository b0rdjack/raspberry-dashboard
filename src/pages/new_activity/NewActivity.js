import React, { useState } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";

import { API_URL } from "../../constant";

import PageTitle from "../../components/PageTitle/PageTitle";
import MainForm from "../../components/ActivityForm/MainForm";
import RelationForm from "../../components/ActivityForm/RelationForm";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Snackbar from "@material-ui/core/Snackbar";

export default function NewActivity() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
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
    tags: [],
    prices: [
      {
        amount: 0.00,
        quantity: {
          id: "",
          label: ""
        }
      }
    ]
  });

  const onHandleClick = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    fetch(API_URL + "activities", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: activity.name,
        address: activity.address,
        siren: activity.siren,
        phone_number: activity.phone_number,
        opening_hours: getSecondes(activity.opening_hours),
        closing_hours: getSecondes(activity.closing_hours),
        average_time_spent: getSecondes(activity.average_time_spent),
        disabled_access: activity.disabled_access,
        postal_code: activity.postal_code,
        subcategory: activity.subcategory,
        state: activity.state,
        quantity: activity.quantity,
        tags: activity.tags,
        prices: activity.prices,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setMessage(response.messages[0]);
        setOpen(true);
      });
  };

  const getSecondes = value => {
    let splitted = value.split(":");
    let hour = splitted[0] * 3600;
    let minute = splitted[1] * 60;
    return hour + minute;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <PageTitle title="Création d'une activité" />
      <Grid container spacing={4}>
        {isLoading ? (
          <CircularProgress size={52} />
        ) : (
          <>
            <Grid item xs={3}>
              <MainForm activity={activity} setActivity={setActivity} />
            </Grid>
            <Grid item xs={3}>
              <RelationForm activity={activity} setActivity={setActivity} />
            </Grid>
            <Grid item xs={6}></Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={onHandleClick}
            disabled={isLoading ? true : false}
          >
            Créer l'activité
          </Button>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message={message}
        />
      </Grid>
    </>
  );
}

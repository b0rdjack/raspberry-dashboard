import React, { useEffect, useState } from "react";

import PageTitle from "../../components/PageTitle";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constant";
import { CircularProgress, Grid, Snackbar, Button } from "@material-ui/core";
import MainForm from "../../components/ActivityForm/MainForm";
import RelationForm from "../../components/ActivityForm/RelationForm";

export default function EditActivity() {
  const [token, setToken] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState({
    id: null,
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
        amount: 0.0,
        quantity: {
          id: "",
          label: "",
        },
      },
    ],
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
    setIsLoading(true);
    fetch(API_URL + "activities/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        if (!response.error) {
          let tmp_activity = response.activity;
          tmp_activity.average_time_spent = secondsToHm(
            tmp_activity.average_time_spent,
          );
          tmp_activity.closing_hours = secondsToHm(tmp_activity.closing_hours);
          tmp_activity.opening_hours = secondsToHm(tmp_activity.opening_hours);
          tmp_activity.disabled_access === 1
            ? (tmp_activity.disabled_access = "1")
            : (tmp_activity.disabled_access = "0");
          setActivity(tmp_activity);
        }
      });
  }, []);

  const secondsToHm = duration => {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration % 3600) / 60);
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ":" + minutes;
  };

  const getSecondes = value => {
    let splitted = value.split(":");
    let hour = splitted[0] * 3600;
    let minute = splitted[1] * 60;
    return hour + minute;
  };

  const onHandleClick = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    fetch(API_URL + "activities/" + id, {
      method: "PUT",
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <PageTitle title="Modification d'une activité" />
      <Grid container spacing={2}>
        {isLoading || activity.id === null ? (
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
            onClick={onHandleClick}
            disabled={isLoading ? true : false}
          >
            Modifier l'activité
          </Button>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
        />
      </Grid>
    </>
  );
}

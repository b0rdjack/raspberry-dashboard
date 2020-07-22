import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Button } from "@material-ui/core";
import {
  Check as CheckIcon,
  PanTool as PanToolIcon,
  Clear as ClearIcon,
} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import { API_URL } from "../../constant";

// components
import PageTitle from "../../components/PageTitle";
import { useParams } from "react-router-dom";
import TagCard from "./components/TagCard";
import InformationCard from "./components/InformationCard";
import ProfessionalCard from "./components/ProfessionalCard";

export default function Activity() {
  const [token, setToken] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState({
    professional: { user: {} },
    tags: [{}],
    subcategory: {},
    state: {},
    postal_code: {},
    prices: [{}],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

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
          setActivity(response.activity);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const changeState = state => {
    let url;
    switch (state) {
      case "accept":
        url = "/accept";
        break;
      case "deny":
        url = "/deny";
        break;
      case "pend":
        url = "/pend";
        break;
      default:
        url = "";
        console.error("No state corresponding");
    }
    fetch(API_URL + "activities/" + id + url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setMessage(response.messages[0]);
        if (!response.error) {
          setActivity(response.activity);
        }
        setOpen(true);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const getButton = () => {
    if (
      activity.state.label === "Accepted" ||
      activity.state.label === "Denied"
    ) {
      return (
        <Button
          variant="contained"
          color="default"
          startIcon={<PanToolIcon />}
          onClick={() => changeState("pend")}
        >
          Passer en attente
        </Button>
      );
    } else {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
            onClick={() => changeState("accept")}
          >
            Accepter
          </Button>
          <span> </span>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={() => changeState("deny")}
          >
            Refuser
          </Button>
        </>
      );
    }
  };

  const getHMS = duration => {
    let date = new Date(null);
    date.setSeconds(duration);
    return date.toISOString().substr(11, 8);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <PageTitle title="Activité" />
      <Grid container spacing={2}>
        {isLoading || activity.id == null ? (
          <CircularProgress size={52} />
        ) : (
          <>
            <InformationCard
              id={activity.id}
              name={activity.name}
              address={activity.address}
              postal_code={activity.postal_code.code}
              opening_hours={getHMS(activity.opening_hours)}
              closing_hours={getHMS(activity.closing_hours)}
              average_time_spent={getHMS(activity.average_time_spent)}
              amount={activity.prices[0].amount}
              disabled_access={activity.disabled_access}
            />
            <TagCard
              subcategory={activity.subcategory}
              state={activity.state}
              tags={activity.tags}
            />
            {activity.professional ? (
              <>
                <ProfessionalCard
                  last_name={activity.professional.user.last_name}
                  first_name={activity.professional.user.first_name}
                  email={activity.professional.user.email}
                />
                <Grid item xs={3}></Grid>
              </>
            ) : (
              <Grid item xs={6}></Grid>
            )}
            <Grid item xs={3}>
              {getButton(activity.state.label, activity.id)}
            </Grid>
          </>
        )}
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message={message}
        ></Snackbar>
      </Grid>
    </>
  );
}

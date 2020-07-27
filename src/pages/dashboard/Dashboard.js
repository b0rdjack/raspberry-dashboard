import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { LineChart, Line } from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import { API_URL } from "../../constant";
import MUIDataTable from "mui-datatables";

export default function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    setIsLoading(true);
    fetch(API_URL + "customers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setCustomers(cleanArray(response.customers));
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const cleanArray = customers => {
    let updatedCustomers = [];
    customers.forEach(customer => {
      updatedCustomers.push({
        id: customer.id,
        user_id: customer.user_id,
        first_name: customer.user.first_name,
        last_name: customer.user.last_name,
        email: customer.user.email,
      });
    });
    return updatedCustomers;
  };

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "user_id",
      label: "User ID",
    },
    {
      name: "first_name",
      label: "Prénom",
    },
    {
      name: "last_name",
      label: "Nom",
    },
    {
      name: "email",
      label: "E-mail",
    },
  ];

  const options = {
    download: false,
    print: false,
    selectableRows: "none",
    selectableRowsHeader: false,
  };

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Nombres total d'utilisateurs"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {customers.length}
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={10}>
          <MUIDataTable
            title="Utilisateurs"
            data={customers}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}

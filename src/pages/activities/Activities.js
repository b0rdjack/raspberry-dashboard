import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { API_URL } from "../../constant";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Nom",
    },
    {
      name: "address",
      label: "Adresse",
    },
    {
      name: "postal_code",
      label: "Code Postal",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "category",
      label: "Catégorie",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "state",
      label: "État",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    selectableRows: "none",
    selectableRowsHeader: false,
    onRowClick: rowData => console.log(rowData),
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch(API_URL + "activities", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then(response => {
        setActivities(cleanArray(response.activities));
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const cleanArray = activities => {
    let updatedActivities = [];
    activities.map((activity, index) => {
      updatedActivities.push({
        id: activity.id,
        name: activity.name,
        address: activity.address,
        postal_code: activity.postal_code.code,
        category: activity.subcategory.label,
        state: activity.state.label,
      });
    });
    return updatedActivities;
  };

  return (
    <>
      <PageTitle title="Activitées" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des activités"
            data={activities}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}

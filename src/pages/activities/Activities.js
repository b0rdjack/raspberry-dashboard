import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { API_URL } from "../../constant";

// components
import PageTitle from "../../components/PageTitle";
import { useHistory } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
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
    onRowClick: rowData => history.push("activities/" + rowData[0]),
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    setIsLoading(true);
    fetch(API_URL + "activities", {
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
          setActivities(cleanArray(response.activities));
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const cleanArray = activities => {
    let updatedActivities = [];
    activities.forEach(activity => {
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
      <Grid container spacing={4} justify="center" alignItems="center">
        <Grid item xs={12}>
          {isLoading ? (
            <CircularProgress size={52} />
          ) : (
            <MUIDataTable
              title="Liste des activités"
              data={activities}
              columns={columns}
              options={options}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

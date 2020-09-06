import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Accessible as AccessibleIcon } from "@material-ui/icons";

export default function InformationCard({
  id,
  name,
  address,
  postal_code,
  opening_hours,
  closing_hours,
  average_time_spent,
  amount,
  disabled_access,
}) {
  return (
    <Grid item xs={3}>
      <Card>
        <CardHeader title="Informations principales" />
        <CardContent>
          <Typography>
            <b>ID:< /b> {id}
          </Typography>
          <Typography>
            <b>Nom: </b> {name}
          </Typography>
          <Typography>
            <b>Adresse: </b> {address}
          </Typography>
          <Typography>
            <b>Code Postal: </b>
            {postal_code}
          </Typography>
          <Typography>
            <b>Heure d'ouverture: </b>
            {opening_hours}
          </Typography>
          <Typography>
            <b>Heure de fermeture: </b>
            {closing_hours}
          </Typography>
          <Typography>
            <b>Temps passé en moyen: </b>
            {average_time_spent}
          </Typography>
          <Typography>
            <b>Prix par personne: </b>
            {amount}
          </Typography>
          <Typography>
            {disabled_access ? <AccessibleIcon /> : <></>}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

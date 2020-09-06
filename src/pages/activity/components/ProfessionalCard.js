import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";

export default function ProfessionalCard({last_name, first_name, email}) {
  return (
    <Grid item xs={3}>
      <Card>
        <CardHeader title="Professionel" />
        <CardContent>
          <Typography>
            <b>Nom: </b> {last_name}
          </Typography>
          <Typography>
            <b>Prénom: </b> {first_name}
          </Typography>
          <Typography>
            <b>E-mail: </b> {email}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
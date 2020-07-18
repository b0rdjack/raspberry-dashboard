import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function TagCard({ subcategory, state, tags }) {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card>
        <CardHeader title="Étiquettes" />
        <CardContent>
          <Typography>
            <b>Catégorie:</b> {subcategory.label}
          </Typography>
          <Typography>
            <b>État:</b> {state.label}
          </Typography>
          <br />
          <div className={classes.root}>
            {tags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  label={tag.label}
                  color="primary"
                  variant="outlined"
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

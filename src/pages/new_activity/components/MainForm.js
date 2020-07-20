import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@material-ui/core";

import Input from "./Input";
import TimeInput from "./TimeInput";

export default function MainForm({ activity, setActivity }) {
  const onChange = event => {
    const { name, value } = event.target;
    setActivity(prevState => ({ ...prevState, [name]: value }));
  };

  const checkString = value => {
    const regex = /^[a-z ,.'-]+.{3,}$/i;
    return regex.test(value);
  };

  const checkAddress = value => {
    const regex = /^([A-Z0-9 '-]+)(?:[A-Z0-9])$/i;
    return regex.test(value);
  };

  const checkSiren = value => {
    const regex = /^[0-9]{9}$/g;
    return regex.test(value);
  };

  const checkTelephone = value => {
    const regex = /^[0-9]{10}$/g;
    return regex.test(value);
  };

  return (
    <>
      <Card>
        <CardContent>
          <form>
            <Input
              autoFocus={true}
              label="Nom"
              message="Veuillez saisir un nom valide"
              name="name"
              onChange={onChange}
              regexCheck={checkString}
              value={activity.name}
            />
            <Input
              autoFocus={false}
              label="Adresse"
              message="Veuillez saisir une adresse valide"
              name="address"
              onChange={onChange}
              regexCheck={checkAddress}
              value={activity.address}
            />
            <Input
              autoFocus={false}
              label="Siren"
              message="Veuillez saisir un numéro de SIREN valide"
              name="siren"
              onChange={onChange}
              regexCheck={checkSiren}
              value={activity.siren}
            />
            <Input
              autoFocus={false}
              label="Téléphone"
              message="Veuillez saisir un numéro de téléphone valide"
              name="phone_number"
              onChange={onChange}
              regexCheck={checkTelephone}
              value={activity.phone_number}
            />
            <TimeInput
              label="Heure d'ouverture"
              name="opening_hours"
              onChange={e => onChange(e)}
              value={activity.opening_hours}
            />
            <TimeInput
              label="Heure de fermeture"
              name="closing_hours"
              onChange={e => onChange(e)}
              value={activity.closing_hours}
            />
            <TimeInput
              label="Temps moyen passé"
              name="average_time_spent"
              onChange={e => onChange(e)}
              value={activity.average_time_spent}
            />
            <FormControl component="fieldset" required={true}>
              <FormLabel component="legend">Accès handicapé</FormLabel>
              <RadioGroup
                name="disabled_access"
                value={activity.disabled_access}
                onChange={e => onChange(e)}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Oui"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Non"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

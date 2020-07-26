import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@material-ui/core";

import SelectInput from "./SelectInput";
import { API_URL } from "../../constant";
import MultipleSelectInput from "./MultipleSelectInput";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      allowEmptyFormatting={false}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      suffix="€"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function RelationForm({ activity, setActivity }) {
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [states, setStates] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let token = localStorage.getItem("token");
    fetch(API_URL + "options", {
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
          setSubcategories(response.subcategories);
          setTags(response.tags);
          setStates(response.states);
          setQuantities(response.quantities);
        }
      });
  }, []);

  const onChange = (event, array) => {
    const { name, value } = event.target;
    let selected = array.find(item => item.id === value);
    setActivity(prevState => ({
      ...prevState,
      [name]: selected,
    }));
  };

  const onChangeTags = (event, array) => {
    const { value } = event.target;
    setActivity(prevState => ({
      ...prevState,
      tags: array.filter(item => value.indexOf(item.label) !== -1),
    }));
  };

  const onChangeAmount = event => {
    console.log(event.target);
    const { value, name } = event.target;
    let prices = [...activity.prices];
    let price = { ...prices[0] };
    price[name] = value;
    prices[0] = price;
    setActivity(prevState => ({
      ...prevState,
      prices: prices,
    }));
  };

  const onChangeQuantity = event => {
    const { value, name } = event.target;
    let prices = [...activity.prices];
    let price = { ...prices[0] };
    price[name].id = value;
    prices[0] = price;
    setActivity(prevState => ({
      ...prevState,
      prices: prices,
    }));
  };
  return (
    <>
      <Card>
        <CardContent>
          {isLoading ||
          !subcategories.length ||
          !tags.length ||
          !states.length ||
          !quantities.length ? (
            <CircularProgress size={52} />
          ) : (
            <form>
              <SelectInput
                input_label_id="_select_subcategory_label"
                input_label="Catégorie"
                select_id="_select_subcategory"
                select_name="subcategory"
                onChange={onChange}
                value={activity.subcategory.id}
                items={subcategories}
                item_label_key="label"
                item_value_key="id"
                message="Veuillez saisir la catégorie"
              />
              <MultipleSelectInput
                input_label_id="_select_tags_label"
                input_label="Tags"
                select_id="_select_tags"
                select_name="tags"
                onChange={onChangeTags}
                selected_items={activity.tags}
                items={tags}
                item_value_key="label"
                message="Veuillez saisir au moins un tag"
              />
              <SelectInput
                input_label_id="_select_quantity_label"
                input_label="Quantité"
                select_id="_select_quantity"
                select_name="quantity"
                onChange={onChangeQuantity}
                value={activity.prices[0].quantity.id}
                items={quantities}
                item_label_key="label"
                item_value_key="id"
                message="Veuillez saisir la quantité"
              />
              <TextField
                fullWidth={true}
                id="_amount"
                label="Montant"
                margin="normal"
                name="amount"
                onChange={onChangeAmount}
                placeholder="Montant"
                required={true}
                value={activity.prices[0].amount}
                variant="outlined"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <SelectInput
                input_label_id="_select_state_label"
                input_label="État"
                select_id="_select_state"
                select_name="state"
                onChange={onChange}
                value={activity.state.id}
                items={states}
                item_label_key="label"
                item_value_key="id"
                message="Veuillez saisir l'état"
              />
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}

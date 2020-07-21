import React, { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress } from "@material-ui/core";

import SelectInput from "./SelectInput";
import { API_URL } from "../../../constant";

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
                multiple={false}
              />
              <br />
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
                multiple={false}
              />
              <SelectInput
                input_label_id="_select_quantity_label"
                input_label="Quantité"
                select_id="_select_quantity"
                select_name="quantity"
                onChange={onChange}
                value={activity.quantity.id}
                items={quantities}
                item_label_key="label"
                item_value_key="id"
                message="Veuillez saisir la quantité"
                multiple={false}
              />
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}

import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "./DataProvider";

export default function HiddenInterest({
  name,
  subinterest,
  newItem,
  toRender,
}) {
  const { clickedChipsHidden, setClickedChipsHidden } = useAuth();
  const [changes, setChanges] = React.useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  //const currentStatus = (new URLSearchParams(window.location.search)).get('taskStatus')
  //console.log(currentStatus);

  const [renderArray, setRenderArray] = React.useState([]);
  const queryParams = new URLSearchParams(window.location.search);

  const valueFilter = queryParams.get(name);
  console.log(valueFilter);
  const interestIds = valueFilter?.split(",");
  const [renderList, setRendertList] = React.useState(interestIds ?? []);
  console.log(renderList);
  React.useEffect(() => {
    handleUrl();
    console.log(changes);
    console.log(clickedChipsHidden);
  }, [changes]);
  React.useEffect(() => {
    console.log(clickedChipsHidden);
    onRender();
    console.log(subinterest, "FBug");
  }, []);
  console.log({ clickedChipsHidden });

  const onRender = () => {
    let arr = [];
    console.log({ childs: renderList, name });
    if (renderList !== undefined) {
      renderList.forEach((newItemId) => {
        console.log(newItemId);
        const subCatObj = subinterest.find((item) => item.id == newItemId);
        console.log(subCatObj);
        if (subCatObj) arr.push(subCatObj);
      });
      console.log({ arr });

      // setRenderArray(arr);
      console.log(arr, renderArray, "arr");

      let newClickedChipsHidden = [];
      //let newTriggeredList = [];
      arr.map((Item, index) => {
        if (clickedChipsHidden.includes(Item)) {
          // If the item is already clicked, remove it from the state
          console.log("here");

          setClickedChipsHidden((prev) =>
            prev.filter((item) => item.id !== Item.id)
          );
        } else {
          // If the item is not clicked, add it to the state
          const Name = newItem.name;
          Item["parentName"] = Name;
          console.log(Item, "here");
          newClickedChipsHidden.push(Item);
          // setClickedChipsInterest([...clickedChipsInterest, Item]);
        }
      });
      console.log({ newClickedChipsHidden });
      let lol = newClickedChipsHidden.flatMap((item) => item);
      console.log(lol);
      setClickedChipsHidden((prev) => [...prev, ...lol]);
    }
  };
  const handleUrl = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(name);
    console.log(name);
    if (clickedChipsHidden.length >= 0) {
      const interestIds = clickedChipsHidden
        .filter((interest) => interest.parentName === newItem.name)
        .map((item) => item.id);

      newSearchParams.append(name, interestIds.join(","));
      console.log(newSearchParams.toString());
      setSearchParams(newSearchParams.toString());
    }
    console.log(searchParams.toString(), "opysearch params");
  };
  const handleClick = (itemId) => {
    console.info("You clicked the Chip.", itemId);
    if (clickedChipsHidden.includes(itemId)) {
      // If the item is already clicked, remove it from the state
      setClickedChipsHidden(
        clickedChipsHidden.filter((item) => item.id !== itemId.id)
      );
    } else {
      const Name = newItem.name;
      itemId["parentName"] = Name;
      //const clickedItem = [...itemId, parentName.Name];
      // If the item is not clicked, add it to the state
      setClickedChipsHidden([...clickedChipsHidden, itemId]);
    }
    setChanges(!changes);
  };

  return (
    <div>
      <h3>{name}</h3>
      <Stack
        direction="row"
        spacing={1}
        sx={{ maxWidth: 170, flexWrap: "wrap" }}
      >
        {subinterest.map((item) => (
          <div>
            <Chip
              key={item.id + item.name}
              label={item.name}
              onClick={() => {
                handleClick(item);
              }}
              sx={{
                backgroundColor: clickedChipsHidden.includes(item)
                  ? "pink"
                  : "lightblue",
              }}
            />
          </div>
        ))}
      </Stack>
    </div>
  );
}

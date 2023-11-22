import React, { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Triggeredinterest } from "./TriggeredInterest";
import { useAuth } from "./DataProvider";
import { render } from "react-dom";

const InterestFilter = () => {
  const {
    clickedChipsInterest,
    setClickedChipsInterest,
    clickedChipsHidden,
    setClickedChipsHidden,
    triggeredList,
    setTriggeredList,
  } = useAuth();
  const [interestList, setInterestList] = useState([]);
  const [allinterestList, setAllInterestList] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState([]);

  const [renderArray, setRenderArray] = useState([]);

  //const [clickedChipsInterest, setClickedChipsInterest] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  //const currentStatus = (new URLSearchParams(window.location.search)).get('taskStatus')
  //console.log(currentStatus);
  const queryParams = new URLSearchParams(window.location.search);

  const valueFilter = queryParams.get(`interest`);
  const interestIds = valueFilter?.split(",");
  const [renderList, setRendertList] = useState([interestIds] || []);
  useEffect(() => {
    onRender();
    console.log(renderArray);

    console.log(clickedChipsInterest, "onrenderr2");
    console.log(triggeredList, "triggred list");
  }, [interestList]);
  useEffect(() => {
    console.log(triggeredList, "FBug");
    handleUrl();
  }, [clickedChipsInterest]);
  useEffect(() => {
    console.log(clickedChipsHidden);
  }, [clickedChipsHidden]);
  const handleUrl = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("interest");
    if (clickedChipsInterest.length >= 0) {
      // const interestIds = clickedChipsInterest.some(Array.isArray)
      //   ? clickedChipsInterest.flatMap((items) => items.map((item) => item.id))
      //   : clickedChipsInterest.map((item) => item.id);

      const interestIds = clickedChipsInterest.map((item) => item.id);
      newSearchParams.append("interest", interestIds.join(","));
      setSearchParams(newSearchParams.toString());
    }
  };

  const removeHidden = (Item) => {
    console.log(Item, "nowhere");
    let updatedHidden = [...clickedChipsHidden];
    let name = "";
    let newsearchParams = searchParams;
    console.log(newsearchParams);

    clickedChipsHidden.forEach((item) => {
      // Item.triggerFilterGroup.filter(() => findtrgger.id == item.id)
      console.log(item.id, "loggeditem");
      Item.triggerFilterGroup.map((findtrgger) => {
        console.log(findtrgger, item, "loggeditem");
        //updatedHidden=updatedHidden.filter((newL)=)
        if (findtrgger.name == item.parentName) {
          //remove item from clickedChipsHidden If true
          console.log(item.parentName);
          name = item.parentName;
          console.log(name);
          updatedHidden = updatedHidden.filter((newL) => newL.id !== item.id);
          const newSearchParams = new URLSearchParams(newsearchParams);
          newSearchParams.delete(name);
          console.log(updatedHidden);
          if (updatedHidden.length >= 0) {
            const interestIds = updatedHidden
              .filter((interest) => interest.parentName === findtrgger.name)
              .map((ITEM) => ITEM.id);

            newSearchParams.append(name, interestIds.join(","));
            console.log(newSearchParams.toString());
            newsearchParams = newSearchParams;
          }
          console.log(searchParams.toString(), "opysearch params");
        }
      });
    });
    console.log(updatedHidden);
    setClickedChipsHidden(updatedHidden);
    setSearchParams(newsearchParams.toString());
    name = "";
  };
  const handleClick = (Item, triggered) => {
    if (triggered !== "") {
      console.log(triggered, Item);
      let updatedList = [...triggeredList]; // Create a copy of the existing triggeredList

      triggered.map((item) => {
        console.log(item);
        if (!triggeredList.find((duplicate) => duplicate.id === item.id)) {
          // Check if item not present in triggeredList, then add it to the temporary array
          updatedList.push(item);
        } else {
          // If the item is already in triggeredList, remove it from the temporary array
          updatedList = updatedList.filter(
            (duplicate) => duplicate.id !== item.id
          );
        }
      });
      console.log(updatedList, "onrenderr1");
      setTriggeredList(updatedList); // Update the triggeredList state with the new array
    }

    // if (triggered != "") {
    //   let arrnew = [];
    //   console.log(triggered, "triggered item");

    //   triggered.map((item) => {
    //     console.log(item, "travering trig item");
    //     if (!triggeredList.includes(item)) {
    //       console.log(item, "travering trig item in if cndition");

    //       setTriggeredList([...triggeredList, item]);
    //     } else {
    //       setTriggeredList(
    //         triggeredList.filter((duplicate) => duplicate.id !== item.id)
    //       );
    //     }
    //   });
    // } else {
    //   console.log(triggered);
    // }
    if (clickedChipsInterest.includes(Item)) {
      // If the item is already clicked, remove it from the state
      setClickedChipsInterest(
        clickedChipsInterest.filter((item) => item.id !== Item.id)
        // clickedChipsInterest.flatMap((items) =>
        //   items.filter((item) => item.id !== Item.id)
        // )
      );
      removeHidden(Item);
    } else {
      // Item['Clicked']=true;
      // If the item is not clicked, add it to the state
      setClickedChipsInterest([...clickedChipsInterest, Item]);
    }
  };
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const fetchApi = async () => {
    try {
      console.log("api");
      const response = await fetch(
        "https://api.toandfrom.com/v2/filter?partnerId=null"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const arr = [];
      if (result) {
        setAllInterestList(result);
        result.forEach((item) => {
          if (item.name == "Interests") {
            const Item = item.topics;
            arr.push(Item);
            console.log(arr);
          }
          setInterestList(...arr);
        });
      } else {
        console.error("Data is not an array.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(interestList);
  };

  const onRender = () => {
    let arr = [];
    if (renderList[0] !== undefined) {
      renderList[0].forEach((newItemId) => {
        console.log(newItemId);
        const newlist = interestList.filter((item) => item.id == newItemId);
        console.log(newlist);
        arr.push(newlist);
      });

      setRenderArray(arr);
      console.log(arr, renderList, "onrenderr", interestList);

      //setRendertList(arr);
      let trigger = [];
      arr.map((item) => {
        //console.log(item[0].triggerFilterGroup);
        const triggeredgroup = item[0] ? item[0].triggerFilterGroup : null;
        triggeredgroup && trigger.push(triggeredgroup);
      });
      console.log(trigger[0]);
      setRenderTrigger(trigger);
      //setTriggeredList(trigger);
      console.log(trigger);

      //temp array
      let newClickedChipsInterest = [];
      let newTriggeredList = [];
      if (trigger !== undefined) {
        console.log(trigger);
        let updatedList = [...triggeredList]; // Create a copy of the existing triggeredList

        trigger.forEach((item) => {
          console.log(item);
          item.map((das) => {
            if (!updatedList.find((duplicate) => duplicate.id === das.id)) {
              // Check if item not present in triggeredList, then add it to the temporary array

              console.log(das);
              updatedList.push(das);
            } else {
              // If the item is already in triggeredList, remove it from the temporary array
              console.log(das);
              console.log(
                updatedList.filter((duplicate) => duplicate.id !== item.id)
              );
              updatedList = updatedList.filter(
                (duplicate) => duplicate.id !== das.id
              );
            }
          });
        });
        console.log(updatedList, "onrenderr1");
        newTriggeredList = [...updatedList]; // Update the triggeredList state with the new array
      }

      arr.map((Item, index) => {
        //const triggered = trigger[index];

        if (clickedChipsInterest.includes(Item)) {
          // If the item is already clicked, remove it from the state
          console.log("here");

          setClickedChipsInterest(
            clickedChipsInterest.filter((item) => item.id !== Item.id)
          );
        } else {
          // If the item is not clicked, add it to the state
          console.log(Item, "here");
          newClickedChipsInterest.push(Item);
          //setClickedChipsInterest([...clickedChipsInterest, Item]);
        }
      });
      console.log([newClickedChipsInterest]);
      let lol = newClickedChipsInterest.flatMap((item) => item);
      console.log(trigger.flatMap((items) => items));

      setClickedChipsInterest([...lol]);

      console.log(...newTriggeredList);
      trigger ? setTriggeredList(newTriggeredList) : null;
    } else {
      console.log("initial rendered");
    }
  };
  useEffect(() => {
    fetchApi();

    console.log(interestIds, "saved ids");

    console.log(renderList, "checkk");
    // renderList.map((item) => {
    //   renderTrigger.map((triggered) => {
    //     console.log(item[0], triggered, "checking render");
    //     //onclick(item[0], triggered);
    //   })
    // });
    console.log(clickedChipsInterest, "clieked chips");
  }, []);
  // fetchApi();
  return (
    <div>
      <Stack
        direction="row"
        spacing={1}
        sx={{ maxWidth: 180, flexWrap: "wrap" }}
      >
        {interestList.map((item) => (
          <div>
            <Chip
              key={item.id + item.name}
              label={item.name}
              onClick={() => {
                let triggered = []; // Initialize it as an empty string

                if (item.triggerFilterGroup.length !== 0) {
                  triggered = item.triggerFilterGroup;
                }

                handleClick(item, triggered);
              }}
              sx={{
                backgroundColor: clickedChipsInterest.includes(item)
                  ? "pink"
                  : "lightblue",
              }}
            />
          </div>
        ))}
      </Stack>

      {triggeredList?.length !== 0 &&
        triggeredList.map((Item) => (
          <Triggeredinterest
            triggeredList={triggeredList}
            allinterestList={allinterestList}
            Item={Item}
            Hidden={clickedChipsInterest.includes(Item)}
          />
        ))}
    </div>
  );
};
export default InterestFilter;

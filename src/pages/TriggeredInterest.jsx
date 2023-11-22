import React, { useEffect, useState } from "react";
import HiddenInterest from "./Hiddeninterest";
import { useAuth } from "./DataProvider";

export const Triggeredinterest = ({
  triggeredList,
  allinterestList,
  Item,
  Hidden,
}) => {
  const filterdList = allinterestList?.filter((item) => Item.id === item.id);

  const [toRender, setTorender] = useState(false);
  const { clickedChipsInterest, setClickedChipsInterest } = useAuth();

  useEffect(() => {
    checkRender();
    console.log(
      triggeredList.flatMap((item) => item),
      "FBug"
    );
  }, [clickedChipsInterest, triggeredList]);

  const checkRender = () => {
    let render = false;
    clickedChipsInterest.map((item) => {
      item.triggerFilterGroup.map((trigItem) => {
        if (trigItem == Item) {
          render = true;
          console.log(trigItem, Item, render);
        }
      });
    });
    setTorender(render);
  };
  const [subinterest, setSubinterest] = useState();
  console.log({ Item }, "item here");
  console.log(Item.id, Hidden);
  return (
    <ul>
      {filterdList.map((newItem) => (
        <HiddenInterest
          name={newItem.name}
          subinterest={newItem.topics}
          newItem={newItem}
          toRender={toRender}
        />
      ))}
    </ul>
  );
};

import React, { useEffect } from "react";
import { useAuth } from "./DataProvider";
import { useSearchParams } from "react-router-dom";
import "../App.css";
import fetchData from "./fetchData";
export const FilterTag = () => {
  const [sp, ssp] = useSearchParams();

  const giftFor = sp.get("gender");
  const occasion = sp.get("occasion");
  const relationship = sp.get("relationship");
  const {
    genderApi,
    occasionApi,
    relationshipApi,
    filterApi,
    SetFilterApi,
    clickedChipsInterest,
    setClickedChipsInterest,
    clickedChipsHidden,
    setClickedChipsHidden,
    triggeredList,
    setTriggeredList,
  } = useAuth();

  const genderNames = fetchData({ Api: genderApi });
  const occasionNames = fetchData({ Api: occasionApi });
  const relationshipNames = fetchData({ Api: relationshipApi });
  const filterList = [
    { paramName: "gender", id: giftFor, label: "Gender", List: genderNames },
    {
      paramName: "occasion",
      id: occasion,
      label: "Occasion",
      List: occasionNames,
    },
    {
      paramName: "relationship",
      id: relationship,
      label: "Relationship",
      List: relationshipNames,
    },
  ];
  //const filterList = [giftFor, occasion, relationship];

  const [updatedFilterList, setUpdatedFilterList] = React.useState(filterList);
  const [updatedIterestList, setUpdateInterestList] = React.useState(
    clickedChipsInterest.map((item) => item.id)
  );
  const [parentName, setParentName] = React.useState("");
  const [updatedHiddenList, setUpdatedHiddenList] = React.useState(
    clickedChipsHidden.map((item) => item.id)
  );

  useEffect(() => {
    // Update the filterList when queryParams change
    //const newFilterList = [giftFor, occasion, relationship];
    const newFilterList = filterList.filter((filter) =>
      sp.get(filter.paramName)
    );
    setUpdatedFilterList(newFilterList);
    SetFilterApi(newFilterList);
    console.log(clickedChipsInterest, "interest chips");
  }, [sp]);
  useEffect(() => {
    console.log(updatedIterestList, "onrenderr filtertag");
  }, []);
  // useEffect(()=>{
  //   console.log(clickedChipsHidden);
  //   clickedChipsHidden.forEach(element => {
  //     const newSearchParams = new URLSearchParams(sp)

  //   });
  // },[clickedChipsHidden])
  const fetchNames = ({ items, names }) => {
    console.log(items, names, "filtertag ");
    const name = names.find((name) => name[1] === items);
    return name ? name[0] : "";
    // names.map((name) => {
    //   if (name[1] == item) {
    //     return name[0];
    //   }
    // });
  };

  // const fetchInterestName = ({ cool }) => {
  //   console.log(cool);

  //   const idName = clickedChipsInterest?.filter((Id) => Id.id === cool);

  //   idName[0] ? console.log(idName[0].name) : null;
  //   return idName[0] ? idName[0].name : null;
  // };

  // const fetchHiddenName = ({ Hidden }) => {
  //   console.log(Hidden);

  //   const idName = clickedChipsHidden?.filter((Id) => Id.id === Hidden);

  //   idName[0] ? console.log(idName[0].name) : null;
  //   return Hidden.name ? Hidden.name : null;
  // };

  const onclickHandler = (paramName) => {
    const newSearchParams = new URLSearchParams(sp);
    newSearchParams.delete(paramName);
    ssp(newSearchParams.toString());
    console.log();
  };
  const removeHidden = (Item) => {
    console.log(Item, "nowhere");
    let updatedHidden = [...clickedChipsHidden];
    let name = "";
    let newsearchParams = sp;
    console.log(newsearchParams);

    console.log(clickedChipsHidden);

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
          console.log(sp.toString(), "opysearch params");
        }
      });
    });
    console.log(updatedHidden);
    setClickedChipsHidden(updatedHidden);
    ssp(newsearchParams.toString());
    name = "";
  };

  const onclickHandlerInterest = (cool, triggered) => {
    const newSearchParams = new URLSearchParams(sp);
    const idsAll = newSearchParams.get("interest");
    console.log(idsAll);
    const interestIds = idsAll.split(",");
    const updatedInterestIds = interestIds.filter((id) => id !== cool.id);
    newSearchParams.set("interest", updatedInterestIds.join(","));
    console.log(newSearchParams.toString(), "new searxh");
    // ssp(newSearchParams.toString());

    //Remove from clickedchips

    setClickedChipsInterest(
      clickedChipsInterest.filter((item) => item.id !== cool.id)
    );

    let updatedList = [...triggeredList];
    if (triggered != "") {
      triggered.map((item) => {
        console.log(item);

        // If the item is already in triggeredList, remove it from the temporary array
        updatedList = updatedList.filter(
          (duplicate) => duplicate.id !== item.id
        );
      });
    }
    setTriggeredList(updatedList);
    removeHidden(cool);
  };
  const onclickHandlerHidden = (Hidden) => {
    const newSearchParams = new URLSearchParams(sp);
    const idsAll = newSearchParams.get(Hidden.parentName);

    console.log(idsAll, "idss");
    const interestIds = idsAll.split(",");
    const updatedInterestIds = interestIds.filter((id) => id !== Hidden.id);
    newSearchParams.set(Hidden.parentName, updatedInterestIds.join(","));
    ssp(newSearchParams.toString());

    // Remove from clickedchips
    setClickedChipsHidden(
      clickedChipsHidden.filter((item) => item.id !== Hidden.id)
    );
  };

  useEffect(() => {
    // Update the filterList when queryParams change
    //const newFilterList = [giftFor, occasion, relationship];
    const newInterestList = sp.get("interest");
    const valid = newInterestList?.split(",");
    setUpdateInterestList(valid);
    console.log(clickedChipsInterest, "clieked chips");
  }, []);
  const renderInterest = (valid) => {};
  // Update the Hidden list when queryParams change
  useEffect(() => {
    const newHiddenList = sp.get(parentName);
    const valid = newHiddenList?.split(",");
    setUpdatedHiddenList(valid);
    console.log(clickedChipsHidden, "hidden chips");
  }, [sp]);

  return (
    <ul className="FilterList">
      {updatedFilterList.map((item, index) => (
        <li
          className={`item${(item, index)}`}
          key={`filter${item.id}`}
          style={{ display: updatedFilterList ? "flex" : "none" }}
        >
          {fetchNames({
            items: item.id,
            names: item.List,
          })}
          <button
            style={{ display: updatedFilterList.length ? "flex" : "none" }}
            onClick={() => onclickHandler(item.paramName)}
            type="button"
          >
            delete
          </button>
        </li>
      ))}
      {clickedChipsInterest &&
        clickedChipsInterest.map((cool) => (
          <li style={{ display: clickedChipsInterest ? "flex" : "none" }}>
            {/* {cool && fetchInterestName({ cool })} */}
            {cool.name}
            <button
              style={{ display: clickedChipsInterest.length ? "flex" : "none" }}
              onClick={() => {
                let triggered = []; // Initialize it as an empty string

                if (cool.triggerFilterGroup.length !== 0) {
                  triggered = cool.triggerFilterGroup;
                }

                onclickHandlerInterest(cool, triggered);
              }}
              type="button"
            >
              delete
            </button>
          </li>
        ))}
      {clickedChipsHidden.map((Hidden) => (
        <li>
          {Hidden.name}
          {/* {Hidden && fetchHiddenName({ Hidden })} */}
          <button
            style={{ display: clickedChipsHidden.length ? "flex" : "none" }}
            onClick={() => {
              onclickHandlerHidden(Hidden);
              setParentName(Hidden.parentName);
            }}
            type="button"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default FilterTag;

import React, { createContext, useContext, useEffect, useState } from "react";
import fetchData from "./fetchData";
import { useSearchParams } from "react-router-dom";

export const MyDataContext = createContext();

const MyDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterApi, SetFilterApi] = useState([]);
  const [genderData, setGenderData] = useState("");
  const [occasionData, setOccasionData] = useState("");
  const [relationshipData, setRelationshipData] = useState("");
  const [price, setPrice] = useState([0, 1000]);
  const [sp, ssp] = useSearchParams();
  const [triggeredList, setTriggeredList] = useState([]);

  const [clickedChipsInterest, setClickedChipsInterest] = useState([]);

  const [clickedChipsHidden, setClickedChipsHidden] = React.useState([]);

  const occasionApi =
    "https://api.toandfrom.com/v2/occasion?all=true&status=activate";
  const genderApi =
    "https://api.toandfrom.com/v2/gender?all=true&status=activate";
  const relationshipApi =
    "https://api.toandfrom.com/v2/relationship?all=true&status=activate";

  const giftFor = sp.get("gender");
  const occasion = sp.get("occasion");
  const relationship = sp.get("relationship");

  const interest = sp.get("interest");

  const searchParamsnew = new URLSearchParams(window.location.search);

  // Create an object to store the URL parameters and their values
  const urlParams = {};

  // Iterate through all parameter-value pairs
  for (const [param, value] of searchParamsnew.entries()) {
    urlParams[param] = value;
  }
  const queryString = new URLSearchParams(urlParams).toString();
  console.log(queryString, "all params");

  useEffect(() => {
    fetchApi();
    console.log(data);
  }, [sp]);

  const fetchApi = async () => {
    const param = {
      limit: 100,
    };
    try {
      // const response = await fetch(
      //   `https://api.toandfrom.com/v2/product?${
      //     giftFor ? `gender=${giftFor}&` : ""
      //   }${occasion ? `occasion=${occasion}&` : ""}${
      //     relationship ? `relationship=${relationship}&` : ""
      //   }${price ? `minPrice=${price[0] * 83}&` : ""}${
      //     price[1] ? `maxPrice=${price[1] * 83}&` : ""
      //   }${interest ? `Interest=${interest}&` : ""}limit=100&offset=0`
      const response = await fetch(
        `https://api.toandfrom.com/v2/product?${queryString}limit=100&offset=0`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log(result.data)
      const arr = result.data;
      // console.log(arr);
      setData((prevNamesList) => [...arr]);

      if (result) {
        console.log();
      } else {
        console.error("Data is not an array.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MyDataContext.Provider
      value={{
        data,
        setData,
        occasionApi,
        genderApi,
        relationshipApi,
        filterApi,
        SetFilterApi,
        genderData,
        setGenderData,
        occasionData,
        setOccasionData,
        relationshipData,
        setRelationshipData,
        price,
        setPrice,
        clickedChipsInterest,
        setClickedChipsInterest,
        clickedChipsHidden,
        setClickedChipsHidden,
        triggeredList,
        setTriggeredList,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};
export const useAuth = () => useContext(MyDataContext);
export { MyDataProvider };

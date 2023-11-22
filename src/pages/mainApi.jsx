import React from "react";

import { useAuth } from "./DataProvider";
import fetchData from "./fetchData";
import { useSearchParams } from "react-router-dom";

const ChooseFilter = () => {
  const {
    data,
    genderApi,
    occasionApi,
    relationshipApi,
    filterApi,
    SetFilterApi,

    occasionData,
    setOccasionData,
    genderData,
    setGenderData,
    relationshipData,
    setRelationshipData,
  } = useAuth();
  const genderList = fetchData({ Api: genderApi });
  const occasionList = fetchData({ Api: occasionApi });
  const relationshipList = fetchData({ Api: relationshipApi });

  const [searchParams, setSearchParams] = useSearchParams();
  const giftFor = searchParams.get("Gift`s for");
  const occasion = searchParams.get("Occasion");
  const relationship = searchParams.get("relationship");

  const Genderdata = [];
  genderList.map((item) => {
    if (item[0] == giftFor) {
      console.log(item[1]);
      Genderdata.push(item[1]);
    }
  });
  const Occasiondata = [];
  occasionList.map((item) => {
    if (item[0] == occasion) {
      console.log(item[1]);
      Occasiondata.push(item[1]);
    }
  });
  const Relationshipdata = [];
  relationshipList.map((item) => {
    if (item[0] == relationship) {
      console.log(item[1]);
      Relationshipdata.push(item[1]);
    }
  });
  setGenderData(Genderdata);
  setOccasionData(Occasiondata);
  setRelationshipData(Relationshipdata);
};

export default ChooseFilter;

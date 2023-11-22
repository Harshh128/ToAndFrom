import React, { useEffect, useState } from "react";
import SelectOtherProps from "./Dropdown";

import fetchData from "./fetchData";
import RangeSlider from "./priceSlider";
import InterestFilter from "./interests";
const occasionApi =
  "https://api.toandfrom.com/v2/occasion?all=true&status=activate";
const genderApi =
  "https://api.toandfrom.com/v2/gender?all=true&status=activate";
const relationshipApi =
  "https://api.toandfrom.com/v2/relationship?all=true&status=activate";

function Filter() {
  const [data, setData] = useState([]);
  const genderNames = fetchData({ Api: genderApi });
  const occasionNames = fetchData({ Api: occasionApi });
  const relationshipNames = fetchData({ Api: relationshipApi });

  return (
    <div>
      <div>
        <h3>filters</h3>
        <button type="button">Buy on our site</button>
      </div>
      <SelectOtherProps selectName="gender" selectValues={genderNames} />
      <SelectOtherProps selectName="occasion" selectValues={occasionNames} />
      <SelectOtherProps
        selectName="relationship"
        selectValues={relationshipNames}
      />

      <RangeSlider />
      <InterestFilter />
    </div>
  );
}
export default Filter;

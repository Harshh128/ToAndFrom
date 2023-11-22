import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useAuth } from "./DataProvider";
import { useSearchParams } from "react-router-dom";

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 500,
    label: "$500",
  },
  {
    value: 1000,
    label: "$1000",
  },
];

function valuetext(value) {
  return `${value}$`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([0, 1000]);
  const { price, setPrice } = useAuth();
  let [searchParams, setSearchParams] = useSearchParams();
  let [sp, ssp] = useSearchParams();

  //const currentStatus = (new URLSearchParams(window.location.search)).get('taskStatus')
  //console.log(currentStatus);
  const [selectedValue, setSelectedValue] = React.useState("");
  const queryParams = new URLSearchParams(window.location.search);

  const valueFilter = queryParams.get(`minPrice= `);
  // console.log(relationship,occasion)

  //   React.useEffect(() => {
  //     setSelectedValue(valueFilter);
  //   }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const minPrice = newValue[0];
    const maxPrice = newValue[1];
    console.log(minPrice, maxPrice, "newvalue");
    setPrice(newValue);
    setSelectedValue(valueFilter);

    const copyMin = new URLSearchParams(searchParams);

    copyMin.set(`minPrice`, minPrice);
    copyMin.set(`maxPrice`, maxPrice);
    setSearchParams(copyMin);
  };

  return (
    <Box sx={{ maxWidth: 180 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks}
        min={0}
        max={1000}
      />
    </Box>
  );
}

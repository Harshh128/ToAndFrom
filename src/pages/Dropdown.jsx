import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

export default function SelectOtherProps({ selectName, selectValues }) {
  let [searchParams, setSearchParams] = useSearchParams();
  //const currentStatus = (new URLSearchParams(window.location.search)).get('taskStatus')
  //console.log(currentStatus);
  const [selectedValue, setSelectedValue] = React.useState("");
  const queryParams = new URLSearchParams(window.location.search);

  const valueFilter = queryParams.get(`${selectName}`);
  // console.log(relationship,occasion)

  React.useEffect(() => {
    setSelectedValue(valueFilter);
  }, [searchParams]);

  const handleChange = (event) => {
    console.log(event);
    const copy = new URLSearchParams(searchParams);
    copy.set(`${selectName}`, event.target.value);

    setSelectedValue(event.target.value);
    setSearchParams(copy);
  };

  return (
    <div>
      <FormControl required sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-required-label">
          {selectName}
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={selectedValue}
          label="Age *"
          onChange={handleChange}
        >
          {selectValues.map((value) => (
            <MenuItem name={value[0]} value={value[1]} key={value[1]}>
              {value[0]}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}

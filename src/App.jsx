import React from "react";
import "./App.css";
import Header from "./pages/heading";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountMenu from "./pages/navbar";
import Filter from "./pages/filter";
import TitlebarBelowImageList from "./pages/Content";
import FilterTag from "./pages/filtertag";
import { MyDataProvider } from "./pages/DataProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components

const theme = createTheme();
function App() {
  return (
    <Router>
      {" "}
      {/* Wrap your components with the Router component */}
      <MyDataProvider>
        <ThemeProvider theme={theme}>
          <AccountMenu />
          <FilterTag />
          <div className="main">
            <Filter /> {/* Define a Filter route */}
            <TitlebarBelowImageList />
          </div>
        </ThemeProvider>
      </MyDataProvider>
    </Router>
  );
}

export default App;

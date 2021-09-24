import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyle from "./mapStyle";

import Location from "./components/Location/Location";
import GlobalStyle, { Container } from "./globalStyle";
import { Route } from "wouter";

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Route exact path="/">
          <Location />
        </Route>
      </div>
    </>
  );
}

export default App;

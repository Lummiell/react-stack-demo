import React, { useState } from "react";
import "./App.css";
import ParenthesisChecker from "./Pages/ParenthesisChecker";
import CardStackToy from "./Pages/CardStackToy";
import { Tabs, Tab, Paper } from "@material-ui/core";
function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return ( <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Parênteses"  />
          <Tab label="Pilha de baralho" />
        </Tabs>
      </Paper>
      <div>
        {value===0?<ParenthesisChecker/> : <CardStackToy/>}
      </div>
      </>
  );
}

export default App;

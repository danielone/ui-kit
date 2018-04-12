import * as React from "react";
import Component from "./Component";

const componentData = require("../config/componentData");

class App extends React.Component {
  public render() {
    return (
      <div>
        <header>
          <h1>This is the begining of a docs system</h1>
        </header>
        {componentData.map(({ name, code }, index) => (
          <Component key={`${name}.${index}`} name={name} code={code} />
        ))}
        <p>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

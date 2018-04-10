import * as React from "react";
import styled from "react-emotion";

const Code = styled("pre")`
  background: gainsboro;
  border: dimgray solid 0.1rem;
  padding: 0.2rem;
  font-size: 1.2rem;
`;
const componentData = require("../config/componentData");

class App extends React.Component {
  public render() {
    return (
      <div>
        <header>
          <h1>This is the begining of a docs system</h1>
        </header>
        <Code>{JSON.stringify(componentData, null, 2)}</Code>
        <p>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

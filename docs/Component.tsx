import * as React from "react";
import styled from "react-emotion";

export interface IComponentProps {
  code: string;
  name: string;
  key: string;
}

const Code = styled("pre")`
  background: gainsboro;
  border: dimgray solid 0.1rem;
  padding: 0.2rem;
  font-size: 1.2rem;
`;

const Component: React.SFC<IComponentProps> = props => {
  return (
    <div>
      <h2>{props.name.toUpperCase()}</h2>
      <Code>{props.code}</Code>
    </div>
  );
};

export default Component;

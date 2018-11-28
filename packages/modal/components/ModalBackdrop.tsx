import * as React from "react";
import { modalBackdrop } from "../style";

export interface ModalBackdropProps {
  onClick: (event?: React.SyntheticEvent<HTMLElement>) => void;
}

const ModalBackdrop: React.SFC<ModalBackdropProps> = props => {
  return <div onClick={props.onClick} className={modalBackdrop} />;
};

export default ModalBackdrop;

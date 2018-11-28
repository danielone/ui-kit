import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ModalPortalProps {
  modalRoot?: HTMLElement;
}

export class ModalPortal extends React.PureComponent<ModalPortalProps, {}> {
  private modalRoot: HTMLElement = document.body;
  private readonly portalElement: HTMLDivElement;

  constructor(props) {
    super(props);
    if (this.props.modalRoot) {
      this.modalRoot = this.props.modalRoot;
    }
    this.portalElement = document.createElement("div");
  }

  public componentDidMount() {
    this.modalRoot.appendChild(this.portalElement);
  }

  public componentWillUnmount() {
    this.modalRoot.removeChild(this.portalElement);
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.portalElement);
  }
}

export default ModalPortal;

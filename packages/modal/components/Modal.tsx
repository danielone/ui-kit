import * as React from "react";
import { cx } from "emotion";
import ModalPortal from "./ModalPortal";
import ModalBackdrop from "./ModalBackdrop";
/**
 * Lifecycle of a Modal:
 * initial page load -> empty ReactCSSTransitionGroup
 * interaction changes open to true -> render modal content without scrollbars
 * get height of content -> rerender modal content and cap the height
 */
import { TransitionGroup } from "react-transition-group";

function getViewportHeight(): number {
  return Math.ceil(
    Math.max(
      document.documentElement !== null
        ? document.documentElement.clientHeight || 0
        : 0,
      window.innerHeight || 0
    )
  );
}

export interface ModalProps {
  /**
   * Modal contents
   */
  children: React.ReactElement<HTMLElement>;
  /**
   * Specify a custom modal height
   */
  modalHeight?: number;
  closeButton?: React.ReactElement<HTMLElement>;
  /**
   * Allows closing the Modal when a click happens outside of the Modal.
   * Defaults to true.
   */
  closeByBackdropClick: boolean;
  /**
   * Optionally set full screen modal to avoid content height restriction
   */
  isFullScreen?: boolean;
  /**
   * Set true to show header. Defaults to false.
   */
  showHeader?: boolean;
  /**
   * Optional header for Modal
   */
  header?: React.ReactElement<HTMLElement> | string;
  /**
   * Optional sub-header for Modal
   */
  subHeader?: React.ReactElement<HTMLElement> | string;
  /**
   * Set true to show footer. Defaults to false.
   */
  showFooter?: boolean;
  /**
   * Optional footer for Modal
   */
  footer?: React.ReactElement<HTMLElement>;
  /**
   * Optional event handler for when the modal is closed
   */
  onClose?: (event?: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * True if modal is open, false otherwise
   */
  open: boolean;
  /**
   * Optional, enter and leave transition name for Modal
   */
  transitionNameModal?: string;
  /**
   * Appear transition length, must be non-zero
   */
  transitionAppearTimeoutModal: number;
  /**
   * Enter transition length, must be non-zero
   */
  transitionEnterTimeoutModal: number;
  /**
   * Leave transition length, must be non-zero
   */
  transitionLeaveTimeoutModal: number;
  /**
   * Optional, disable Appear transition
   */
  transitionAppear?: boolean;
  /**
   * Optional, disable Enter transition
   */
  transitionEnter?: boolean;
  /**
   * Optional, disable Leave transition
   */
  transitionLeave?: boolean;
  /**
   * Additional styles for the backdrop
   */
  backdropClass?: string;
  bodyClass?: string;
  closeButtonClass?: string;
  headerClass?: string;
  footerClass?: string;
  modalClass?: string;
  modalWrapperClass?: string;
  scrollContainerClass?: string;
}

export interface ModalState {
  height: number | null;
}

// This value is used to designate "off-limits" vertical space, so that the
// modal never comes into contact with the edge of the viewport.
const MODAL_VERTICAL_INSET_DISTANCE = 48;

class Modal extends React.PureComponent<ModalProps, ModalState> {
  public static defaultProps: Partial<ModalProps> = {
    closeByBackdropClick: true,
    isFullScreen: false,
    open: false,
    showHeader: false,
    showFooter: false,
    transitionNameModal: "modal",
    transitionAppearTimeoutModal: 300,
    transitionEnterTimeoutModal: 300,
    transitionLeaveTimeoutModal: 300,
    transitionAppear: true,
    transitionEnter: true,
    transitionLeave: true,
    backdropClass: "modal-backdrop",
    bodyClass: "modal-body-wrapper",
    closeButtonClass: "modal-close",
    footerClass: "modal-footer",
    headerClass: "modal-header",
    modalClass: "modal modal-large",
    scrollContainerClass: "modal-body"
  };

  private modalRef: HTMLDivElement | null = null;
  private innerContentContainerRef: HTMLDivElement | null = null;
  private innerContentRef: HTMLDivElement | null = null;
  private headerRef: HTMLDivElement | null = null;
  private footerRef: HTMLDivElement | null = null;
  private lastViewportHeight: number | null = null;
  private lastConstrainedHeight: number | null = null;

  constructor(props: ModalProps) {
    super(props);

    this.calculateContentHeight = this.calculateContentHeight.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);

    this.state = {
      height: null
    };
  }

  public componentDidUpdate(
    prevProps: ModalProps,
    _prevState: ModalState
  ): void {
    if (this.props.open !== prevProps.open) {
      document.body.classList.toggle("no-overflow");
    }

    // If we don't already know the height of the content, we caclulate it.
    if (this.props.open) {
      this.lastViewportHeight = getViewportHeight();
      window.requestAnimationFrame(this.calculateContentHeight);
    }
  }

  public componentWillUpdate(nextProps: ModalProps): void {
    // Reset the height of the content to null when the modal is closing so
    // that the height will be recalculated next time it opens.
    if (this.props.open && !nextProps.open) {
      this.setState({ height: null });
      this.removeKeydownListener();
    }

    if (!this.props.open && nextProps.open) {
      this.addKeydownListener();
    }
  }

  public componentWillMount(): void {
    if (this.props.open) {
      document.body.classList.add("no-overflow");
    }

    window.addEventListener("resize", this.handleWindowResize);
  }

  public componentWillUnmount(): void {
    document.body.classList.remove("no-overflow");
    window.removeEventListener("resize", this.handleWindowResize);
  }

  public render(): React.ReactElement<HTMLElement> {
    const {
      open,
      modalWrapperClass
      // transitionAppear,
      // transitionEnter,
      // transitionLeave,
      // transitionNameModal,
      // transitionAppearTimeoutModal,
      // transitionEnterTimeoutModal,
      // transitionLeaveTimeoutModal
    } = this.props;
    let modalContent: React.ReactElement<HTMLElement> | null = null;

    if (open) {
      modalContent = (
        <div className={cx("modal-wrapper", modalWrapperClass)}>
          <ModalBackdrop onClick={this.handleBackdropClick} />
          {this.getModal()}
        </div>
      );
    }

    return (
      <ModalPortal>
        <TransitionGroup>{modalContent}</TransitionGroup>
      </ModalPortal>
    );
  }

  private getModal(): React.ReactElement<HTMLElement> {
    const modalBodyStyle: { height?: number } = {};
    if (this.state.height != null) {
      modalBodyStyle.height = this.state.height;
    }

    return (
      <div ref={el => (this.modalRef = el)} className={this.props.modalClass}>
        {this.getCloseButton()}
        {this.getHeader()}
        <div
          className={this.props.bodyClass}
          style={modalBodyStyle}
          ref={el => (this.innerContentContainerRef = el)}
        >
          {this.getModalContent()}
        </div>
        {this.getFooter()}
      </div>
    );
  }

  private getCloseButton(): React.ReactElement<HTMLElement> | null {
    if (this.props.closeButton) {
      return this.props.closeButton;
    }
    return null;
  }

  private getHeader(): React.ReactElement<HTMLElement> | null {
    if (this.props.showHeader === false || !this.props.header) {
      return null;
    }

    return (
      <div className={this.props.headerClass} ref={el => (this.headerRef = el)}>
        {this.props.header}
        {this.props.subHeader ? this.props.subHeader : null}
      </div>
    );
  }

  private getModalContent(): React.ReactElement<HTMLElement> {
    return (
      <div
        className={this.props.scrollContainerClass}
        ref={el => (this.innerContentRef = el)}
      >
        {this.props.children}
      </div>
    );
  }

  private getFooter(): React.ReactElement<HTMLElement> | null {
    if (this.props.showFooter === false || !this.props.footer) {
      return null;
    }

    return (
      <div className={this.props.footerClass} ref={el => (this.footerRef = el)}>
        {this.props.footer}
      </div>
    );
  }

  private closeModal(): void {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  private handleBackdropClick(): void {
    if (this.props.closeByBackdropClick) {
      this.closeModal();
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.closeModal();
    }
  }

  private handleWindowResize(): void {
    if (!this.props.open) {
      return;
    }

    const viewportHeight = getViewportHeight();

    // If the height of the viewport is getting shorter, or if it's growing
    // while the height is currently constrained, then we reset the restrained
    // height to null which will cause the height to be recalculated on the
    // next render.
    if (
      this.lastViewportHeight !== null &&
      (viewportHeight < this.lastViewportHeight ||
        (viewportHeight > this.lastViewportHeight &&
          this.state.height !== null))
    ) {
      this.setState({ height: null });
    }

    this.lastViewportHeight = viewportHeight;
    window.requestAnimationFrame(this.calculateContentHeight);
  }

  private addKeydownListener(): void {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }

  private removeKeydownListener(): void {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }

  private calculateContentHeight(): void {
    // A full screen modal doesn't need to restrict its height.
    if (this.props.isFullScreen) {
      return;
    }
    if (
      this.modalRef === null ||
      this.innerContentRef === null ||
      this.innerContentContainerRef === null
    ) {
      return;
    }

    let headerHeight = 0;
    let footerHeight = 0;

    if (this.headerRef != null) {
      headerHeight = Math.ceil(this.headerRef.getBoundingClientRect().height);
    }

    if (this.footerRef != null) {
      footerHeight = Math.ceil(this.footerRef.getBoundingClientRect().height);
    }

    const modalHeight = Math.ceil(this.modalRef.getBoundingClientRect().height);
    const innerContentHeight = Math.ceil(
      this.innerContentRef.getBoundingClientRect().height
    );
    const maxModalHeight =
      (this.lastViewportHeight || 0) - MODAL_VERTICAL_INSET_DISTANCE;

    const totalModalContentHeight =
      innerContentHeight + headerHeight + footerHeight;

    // When the modal's content fits on the screen, both the modal and body
    // height can be set to `auto` (default).
    let nextInnerContentContainerHeight = "auto";
    let nextModalHeight = "auto";

    // When the modal's content is too large to fit on the screen, then we need
    // to explicitly set the body's height to its exact pixel value and the
    // modal's height to `100%`.
    const shouldConstrainHeight =
      totalModalContentHeight >= maxModalHeight ||
      (this.lastViewportHeight || 0) < (this.lastConstrainedHeight || 0);

    if (shouldConstrainHeight) {
      const availableContentHeight = modalHeight - headerHeight - footerHeight;
      nextInnerContentContainerHeight = `${availableContentHeight}px`;
      nextModalHeight = "100%";

      // We need to keep track of the largest viewport height that results in a
      // constrained modal.
      if (
        this.lastConstrainedHeight == null ||
        (this.lastViewportHeight !== null &&
          this.lastViewportHeight > this.lastConstrainedHeight)
      ) {
        this.lastConstrainedHeight = this.lastViewportHeight;
      }

      if (this.state.height !== availableContentHeight) {
        this.setState({ height: availableContentHeight });
      }
    }
    this.innerContentContainerRef.style.height = nextInnerContentContainerHeight;
    this.modalRef.style.height = nextModalHeight;
  }
}

export default Modal;

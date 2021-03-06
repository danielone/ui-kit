import * as React from "react";
import DialogModalWithFooter, {
  DialogModalWithFooterProps
} from "./DialogModalWithFooter";
import { ModalSizes } from "./ModalBase";

const LargeDialogModalWithFooter = (props: DialogModalWithFooterProps) => (
  <DialogModalWithFooter size={ModalSizes.L} {...props} />
);

export default LargeDialogModalWithFooter;

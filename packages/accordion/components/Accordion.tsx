import * as React from "react";
import { Stack } from "../../styleUtils/layout";
import { Provider as AccordionProvider } from "./AccordionContext";
import { AccordionBaseProps } from "../types";

interface AccordionProps extends AccordionBaseProps {
  /**
   * An array of open accordion panel IDs
   */
  initialExpandedItems?: string[];
}

const Accordion: React.FC<AccordionProps> = ({
  allowMultipleExpanded,
  "data-cy": dataCy,
  children,
  initialExpandedItems,
  onChange
}) => {
  return (
    <AccordionProvider
      allowMultipleExpanded={allowMultipleExpanded}
      initialExpandedItems={initialExpandedItems}
      onChange={onChange}
    >
      <Stack data-cy={dataCy}>{children}</Stack>
    </AccordionProvider>
  );
};

Accordion.defaultProps = {
  allowMultipleExpanded: false,
  "data-cy": "accordion"
};

export default Accordion;

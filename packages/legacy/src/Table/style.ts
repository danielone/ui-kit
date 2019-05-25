import { injectGlobal } from "emotion";
import { greyDark, white } from "../../../design-tokens/build/js/designTokens";
import { hexToRgbA } from "../../../shared/styles/color";

export const injectTableStyles = () => injectGlobal`
  .table {

    th {
      outline: none;
      user-select: none;
    }
  }
  
  .caret {
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
    border-top: 0.45em solid ${hexToRgbA(greyDark, 0.5)};
    display: none;
    margin-left: 0.5em;
    vertical-align: middle;
  
    .inverse & {
      border-top: 0.45em solid ${hexToRgbA(white, 0.5)};
    }
  
    &--visible {
      display: inline-block;
    }
  
    &--asc {
      transform: rotate(180deg);
    }
  
    &--desc {
      transform: rotate(0);
    }
  }
  
  @keyframes table-fade-in-left {
  
    0% {
      opacity: 0;
      transform: translateX(-2em);
    }
  
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes table-fade-out-right {
  
    0% {
      opacity: 1;
      transform: translateX(0);
    }
  
    100% {
      opacity: 0;
      transform: translateX(2em);
    }
  }
  
  .table-row-enter {
    animation: table-fade-in-left 0.5s;
  }
  
  .table-row-exit {
    animation: table-fade-out-right 0.5s;
  }
`;

import * as React from "react";
import { cx } from "emotion";
import { tintSVG } from "../../shared/styles/styleUtils";
import {
  textColorPrimary,
  iconSizeXs,
  iconSizeS,
  iconSizeM,
  iconSizeL,
  iconSizeXl,
  iconSizeXxl
} from "../../design-tokens/build/js/designTokens";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { ProductIcons } from "../../icons/dist/product-icons-enum";
import { icon } from "../style";

export enum IconSizes {
  XS = iconSizeXs as any,
  S = iconSizeS as any,
  M = iconSizeM as any,
  L = iconSizeL as any,
  XL = iconSizeXl as any,
  XXL = iconSizeXxl as any
}

export interface IconProps {
  /** Can be used to give a better description of the icon than just it's name */
  ariaLabel?: string;
  /** The fill color of the icon */
  color?: string;
  /** The id of the SVG symbol we're rendering from a generated sprite */
  shape: SystemIcons | ProductIcons | string;
  /** The width and height of the icon */
  size?: IconSizes;
}

const Icon = (props: IconProps) => {
  const { color, size, shape, ariaLabel } = props;
  const svgColor = color || textColorPrimary;
  const getSizeAsNumber = (size?: IconSizes) => {
    const iconSize = size || IconSizes.S;

    return parseInt((iconSize as any) as string, 10);
  };

  return (
    <svg
      preserveAspectRatio="xMinYMin meet"
      width={getSizeAsNumber(size)}
      height={getSizeAsNumber(size)}
      viewBox={`0 0 ${getSizeAsNumber(size)} ${getSizeAsNumber(size)}`}
      role="img"
      aria-label={ariaLabel || `${shape} icon`}
      className={cx(icon, tintSVG(svgColor))}
    >
      <use xlinkHref={`#${shape}`} />
    </svg>
  );
};

export default Icon;

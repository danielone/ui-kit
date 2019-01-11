import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import { select, withKnobs } from "@storybook/addon-knobs";
import { Icon } from "../index";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { ProductIcons } from "../../icons/dist/product-icons-enum";
import IconGrid from "./helpers/IconPreviewGrid";
import {
  blue,
  green,
  purple,
  red,
  textColorPrimary,
  textColorSecondary,
  yellow
} from "../../design-tokens/build/js/designTokens";
import { IconSizes } from "../components/Icon";

const readme = require("../README.md");

storiesOf("Icon", module)
  .addDecorator(withReadme([readme]))
  .addDecorator(withKnobs)
  .addWithInfo("default", () => {
    const colors = {
      [textColorPrimary]: "textColorPrimary",
      [textColorSecondary]: "textColorSecondary",
      [red]: "red",
      [yellow]: "yellow",
      [green]: "green",
      [blue]: "blue",
      [purple]: "purple"
    };
    const sizes = {
      [IconSizes.XS]: "XS",
      [IconSizes.S]: "S",
      [IconSizes.M]: "M",
      [IconSizes.L]: "L",
      [IconSizes.XL]: "XL",
      [IconSizes.XXL]: "XXL"
    };
    const shapes = {
      [SystemIcons.ArrowRight]: "SystemIcons.ArrowRight",
      [SystemIcons.Check]: "SystemIcons.Check",
      [SystemIcons.Close]: "SystemIcons.Close",
      [SystemIcons.Folder]: "SystemIcons.Folder",
      [SystemIcons.Gear]: "SystemIcons.Gear",
      [SystemIcons.Services]: "SystemIcons.Services",
      [SystemIcons.Users]: "SystemIcons.Users"
    };

    const color = select("Color", colors, textColorPrimary);
    const size = select("Size", sizes, IconSizes.S);
    const shape = select("shape", shapes, SystemIcons.ArrowRight);

    return (
      <Icon shape={shape} color={color} size={size} ariaLabel="Sample icon" />
    );
  })
  .addWithInfo("system icons preview", () => (
    <IconGrid iconEnum={SystemIcons} iconEnumTitle="SystemIcons" />
  ))
  .addWithInfo("product icons preview", () => (
    <IconGrid
      iconEnum={ProductIcons}
      iconEnumTitle="ProductIcons"
      darkMode={true}
    />
  ));

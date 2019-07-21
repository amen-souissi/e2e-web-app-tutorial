import { configure, addParameters, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

// Project Storybook options
addParameters({
  options: {
    theme: {
      brandTitle: "Project Web Components"
    },
    panelPosition: "right"
  }
});

addDecorator(withA11y);
addDecorator(withKnobs);

// automatically import all files ending in *.stories.ts
const req = require.context("../stories", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

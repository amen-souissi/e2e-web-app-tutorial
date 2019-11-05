import * as React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/styles";
import { Provider as ReduxProvider } from "react-redux";

import muiDktTheme from "../theme";
import createAppStore from "../redux/store";

const store = createAppStore();

const AllTheProviders = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={muiDktTheme}>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

// Just using the same typing as react-testing-library render method.
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const customRender = (
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options });

/**
 * The MUI theme provider wrapper
 *
 * @param {() => JSX.Element} attributes a function to render the child component.
 *
 * @return {JSX.Element} The child wrapped by the MUI theme provider.
 */
export function withThemeProvider(renderChild: () => JSX.Element): JSX.Element {
  return (
    <MuiThemeProvider theme={muiDktTheme}>{renderChild()}</MuiThemeProvider>
  );
}

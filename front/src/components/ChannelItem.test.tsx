/// <reference path="../../node_modules/@types/jest/index.d.ts"/>

import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { mount } from "enzyme";

import ChannelItem, { DumbChannelItem } from "./ChannelItem";
import * as routeMap from "../utils/routeMap";
import { withThemeProvider } from "../tests/tests-utils";

//@ts-ignore Mock goTo
routeMap.goTo = jest.fn();

describe("ChannelItem component", () => {
  test("should render the default ChannelItem", () => {
    const props = { id: "foo", title: "Foo" };
    const shallowRenderer = createRenderer();
    shallowRenderer.render(<ChannelItem {...props} />);
    const rendered = shallowRenderer.getRenderOutput();
    expect(rendered).toMatchSnapshot();
  });

  test("should call goTo with the foo channel url on open", () => {
    const props = {
      id: "foo",
      title: "Foo"
    };
    const wrapper = mount(withThemeProvider(() => <ChannelItem {...props} />));
    const instance = wrapper
      .find(DumbChannelItem)
      .instance() as DumbChannelItem;
    //open the channel
    //@ts-ignore open is private
    instance.open();
    expect(routeMap.goTo).toBeCalledWith("/messages/foo");
  });
});

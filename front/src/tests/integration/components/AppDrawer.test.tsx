/// <reference path="../../../../node_modules/@types/jest/index.d.ts"/>

import * as React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { wait } from "@testing-library/react";

import ChannelsQuery, {
  Query as QueryData
} from "../../../graphql/queries/Channels";
import AppDrawer from "../../../components/AppDrawer";
import { customRender } from "../../tests-utils";

const channelsData: QueryData = {
  channels: [{ id: "foo", title: "Foo" }]
};

const mocks = [
  {
    request: {
      query: ChannelsQuery
    },
    result: {
      data: channelsData
    }
  }
];

describe("AppDrawer integration tests", () => {
  test("Should load then display channels", async () => {
    const { getByText, queryByTestId } = customRender(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppDrawer />
      </MockedProvider>
    );
    // loading started
    expect(queryByTestId("progress")).toBeDefined();
    // wait for response (Foo is defined)
    await wait(() => getByText(/Foo/g));
    // loading ended
    expect(queryByTestId("progress")).toBeNull();
  });
});

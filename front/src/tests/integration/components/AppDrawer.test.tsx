import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';

import ChannelsQuery, {
  Query as QueryData,
} from '../../../graphql/queries/Channels';
import AppDrawer from '../../../components/AppDrawer';
import { customRender } from '../../tests-utils';

const channelsData: QueryData = {
  // @ts-ignore
  channels: [{ id: '1', title: 'Foo', __typename: 'Channel' }],
};

const mocks = [
  {
    request: {
      query: ChannelsQuery,
    },
    result: {
      data: channelsData,
    },
  },
];

describe('AppDrawer integration tests', () => {
  test('Should load then display channels', async () => {
    customRender(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppDrawer />
      </MockedProvider>
    );
    // loading started
    expect(screen.queryByTestId('progress')).toBeDefined();
    // wait for response (Foo is defined)
    await waitFor(() => screen.getByText(/Foo/g));
    // loading ended
    expect(screen.queryByTestId('progress')).toBeNull();
  });
});

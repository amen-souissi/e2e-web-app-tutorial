import { createRenderer } from 'react-test-renderer/shallow';

import ChannelItem from './ChannelItem';
import * as routeMap from '../utils/routeMap';

//@ts-ignore Mock goTo
routeMap.goTo = jest.fn();

describe('ChannelItem component', () => {
  test('should render the default ChannelItem', () => {
    const props = { id: 'foo', title: 'Foo' };
    const shallowRenderer = createRenderer();
    shallowRenderer.render(<ChannelItem {...props} />);
    const rendered = shallowRenderer.getRenderOutput();
    expect(rendered).toMatchSnapshot();
  });
});

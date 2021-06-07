import * as React from 'react';
import { shallow } from 'enzyme';
import { InsightsPopup } from '../src/components/InsightsPopup/index';
import fixtures, { funcs } from './insights.fixtures';

describe('InsightsPopup ', () => {
  const functions = funcs();
  const props = {
    ...functions,
    ...fixtures,
    responses: { ...fixtures.propsForInsightsWidget.responses },
    k8sResult: { ...fixtures.propsForInsightsWidget.k8sResult },
  };

  const wrapper = shallow(<InsightsPopup {...props} />);
  it('main container renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render the correct popup if response status is isError ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render the correct popup if response status is isWaitingOrDisabled = true ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import * as React from 'react';
import { mount } from 'enzyme';
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

  const wrapper = mount(<InsightsPopup {...props} />);
  it('main container renders correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

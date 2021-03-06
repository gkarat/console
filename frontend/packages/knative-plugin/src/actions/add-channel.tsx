import * as React from 'react';
import { ImportOptions } from '@console/dev-console/src/components/import/import-types';
import {
  createKebabAction,
  KebabAction,
} from '@console/dev-console/src/utils/add-resources-menu-utils';
import * as channelIcon from '../imgs/channel.svg';

const eventChannelStyles = {
  width: '1em',
  height: '1em',
};
const EventChannelIcon: React.FC = () => (
  <img style={eventChannelStyles} src={channelIcon} alt="" />
);

export const addChannels: { id: string; action: KebabAction } = {
  id: 'knative-eventing-channel',
  action: createKebabAction(
    // t('knative-plugin~Channel')
    'knative-plugin~Channel',
    <EventChannelIcon />,
    ImportOptions.EVENTCHANNEL,
  ),
};

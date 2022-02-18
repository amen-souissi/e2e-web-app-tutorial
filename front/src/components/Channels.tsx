import * as React from 'react';
import { useQuery } from '@apollo/client';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Store } from '../redux/reducers';
import ChannelsQuery, { Query as QueryData } from '../graphql/queries/Channels';
import { STYLE_CONST } from '../constants';
import ChannelItem, { ChannelItemProps } from './ChannelItem';
import FlatList from './common/FlatList';
import { ChannelFragment } from '../graphql/fragments/Channel';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: STYLE_CONST.drawerWidth,
      height: '100%',
      marginTop: 15,
    },
    titleContainer: {
      fontSize: 16,
      color: palette.primary.light,
      width: '100%',
      height: 26,
      padding: '0 12px 0 15px',
      marginBottom: 2,
    },
  })
);

interface Props {
  activeChannelId?: string | null;
}

const Channels = ({ activeChannelId }: Props) => {
  const classes = useStyles();

  const { data } = useQuery<QueryData>(ChannelsQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const getItemProps = (item: ChannelFragment): ChannelItemProps => ({
    ...item,
    isActive: item.id === activeChannelId,
  });

  return (
    <div className={classes.listContainer}>
      <div className={classes.titleContainer}>
        <Typography>{I18n.t('channels.channels')}</Typography>
      </div>
      <FlatList<ChannelFragment, ChannelItemProps>
        items={data && data.channels}
        getItemProps={getItemProps}
        ListItem={ChannelItem}
      />
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  activeChannelId: state.currentChannel,
});

export default connect(mapStateToProps)(Channels);

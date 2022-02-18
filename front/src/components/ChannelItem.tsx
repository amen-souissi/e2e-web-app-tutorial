import * as React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/icons/FavoriteBorder';
import classNames from 'classnames';

import { getRoute } from '../utils/routeMap';
import { ChannelFragment } from '../graphql/fragments/Channel';
import { Link } from 'react-router-dom';

const styles = ({ palette }: Theme) =>
  createStyles({
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 16,
      paddingRight: 10,
    },
    listItemActive: {
      backgroundColor: palette.secondary.main,
      '&:hover': {
        backgroundColor: palette.secondary.main,
      },
    },
    text: {
      color: palette.primary.light,
      fontSize: 15,
      padding: 0,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    textActive: {
      fontWeight: 700,
      color: palette.secondary.light,
      '&:hover': {
        color: palette.secondary.light,
      },
    },
    iconActive: {
      opacity: 1,
      color: `${palette.secondary.light} !important`,
      '&:hover': {
        color: palette.secondary.light,
      },
    },
    icon: {
      width: 17,
      height: 17,
      color: palette.primary.light,
      opacity: 0.8,
    },
    listItemIcon: {
      minWidth: 30,
    },
  });

export interface ChannelItemProps extends ChannelFragment {
  isActive?: boolean;
}

interface Props extends ChannelItemProps, WithStyles<typeof styles> {}

export class DumbChannelItem extends React.PureComponent<Props> {
  public render() {
    const { id, title, isActive, classes } = this.props;
    return (
      <Link to={getRoute('messages', { channelId: id })}>
        <ListItem
          dense
          button
          ContainerComponent="div"
          data-testid={`channel-item-${id}`}
          classes={{
            root: classNames(classes.listItem, {
              [classes.listItemActive]: isActive,
            }),
          }}
        >
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <Icon
              className={classNames(classes.icon, {
                [classes.iconActive]: isActive,
              })}
            />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classNames(classes.text, {
                [classes.textActive]: isActive,
              }),
            }}
            primary={title}
          />
        </ListItem>
      </Link>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DumbChannelItem);

import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(
  createStyles({
    progress: {
      position: 'relative',
      textAlign: 'center',
      padding: 20,
    },
    revertedLisContainer: {
      display: 'flex',
      flexDirection: 'column-reverse',
      minHeight: '100%',
    },
    reverted: {
      display: 'flex',
      flexDirection: 'column-reverse',
      width: '100%',
    },
  })
);

interface Props<Item, ItemProps> {
  ListItem: React.ComponentType<ItemProps>;
  getItemProps: (item: Item) => ItemProps;
  items?: Item[];
  className?: string;
  reverted?: boolean;
  onMount?: () => void;
}

function FlatList<Item = any, ItemProps = Item>({
  items,
  ListItem,
  getItemProps,
  reverted,
  className,
  onMount,
}: Props<Item, ItemProps>) {
  const classes = useStyles();

  const scroller = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // if reverted => scroll to bottom
  React.useEffect(() => {
    if (reverted && scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  }, [items, reverted, scroller]);

  if (!items) {
    return (
      <div className={classes.progress}>
        <CircularProgress data-testid="progress" disableShrink size={30} />
      </div>
    );
  }
  return (
    <div className={className} ref={scroller}>
      <div className={reverted ? classes.revertedLisContainer : ''}>
        <div className={reverted ? classes.reverted : ''}>
          {items.map((item: any, index: number) => {
            return (
              <ListItem key={item.id} {...getItemProps(item)} index={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

FlatList.defaultProps = {
  className: '',
  getItemProps: (item: any) => item,
};

export default FlatList;

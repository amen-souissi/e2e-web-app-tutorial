import React from "react";
import { Drawer } from "native-base";

import Channels from "../components/Channels";
import Routes from "./Routes";
import { DrawerContext } from "../contexts";

export default function AppDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const drawer = React.useRef(null);

  const closeDrawer = () => {
    drawer.current._root.close();
  };

  const openDrawer = () => {
    drawer.current._root.open();
  };

  return (
    <DrawerContext.Provider value={{ closeDrawer, openDrawer, isOpen }}>
      <Drawer
        ref={drawer}
        content={<Channels />}
        styles={styles}
        onClose={close}
        onOpen={open}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <Routes />
      </Drawer>
    </DrawerContext.Provider>
  );
}

const styles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 }
};

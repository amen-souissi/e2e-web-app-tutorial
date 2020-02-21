import React from "react";
import { Header, Left, Body, Button, Icon } from "native-base";

interface IProps {
  openDrawer: () => void;
}

export default function AppHeader({ openDrawer }: IProps) {
  return (
    <Header>
      <Left>
        <Button transparent onPress={openDrawer}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body></Body>
    </Header>
  );
}

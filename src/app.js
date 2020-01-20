import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';

import {
  Home,
  Mine,
} from '@screen';

const RootScreen = (Screen) => props => <Screen {...props} {...{ rootScreen: true }}/>;

let Stacks = {
  'home':createSwitchNavigator()
}

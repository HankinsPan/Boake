import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  styles,
} from './Home.style';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{'home'}</Text>
      </View>
    );
  }
}

export default Home;

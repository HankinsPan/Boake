import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  NativeModules,
} from 'react-native';

import {
  SafeAreaView,
  withNavigation,
} from 'react-navigation';

const ios = Platform.OS === 'ios';

const getDisplayName = component => {
  return component.displayName || component.name || 'Component';
};

export default (title = '', {
  showHeader = true,
  headerProps = {},
  statusBarProps = {},
} = {}) => WrapperComponent => (
  class WithScreen extends WrapperComponent {
    static displayName = `HOC(${getDisplayName(WrapperComponent)})`;

    constructor(props) {
      super(props);
      this.state = {
        headerTitle: title,
      };
    }

    componentDidMount() {
      if (ios) {
        this.willFocusSubscription = this.props.navigation.addListener(
          'willFocus',
          payload => {
            NativeModules.ContextModule.rnViewWillAppear(this.props.rootScreen != null ? this.props.rootScreen : false);
          },
        );
      }
    }

    componentWillUnmount() {
      this.willFocusSubscription && this.willFocusSubscription.remove();
    }


    render() {
      const newProps = {
        changeTitle: this.changeTitle,
        ...this.props.navigation.state.params,
      };

      return (
        <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={'#37c'}
            translucent={false}
            {...statusBarProps}
          />

          <WrapperComponent {...this.props} {...newProps}/>

        </SafeAreaView>
      );
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  flex1: {
    flex: 1,
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '#37c',
  },
  iosStatusBar: {
    width: '100%',
    backgroundColor: '#37c',
  },
});


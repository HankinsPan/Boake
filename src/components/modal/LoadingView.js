import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SIZE = ['small', 'normal', 'large'];
const ANIMATION = ['none', 'slide', 'fade'];

class LoadingView extends PureComponent {
  static propTypes = {
    cancelable: PropTypes.bool,
    color: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    overlayColor: PropTypes.string,
    size: PropTypes.oneOf(SIZE),
    textContent: PropTypes.string,
    textStyle: PropTypes.object,
    visible: PropTypes.bool,
    indicatorStyle: PropTypes.object,
    customIndicator: PropTypes.element,
    children: PropTypes.element,
    spinnerKey: PropTypes.string,
  };

  static defaultProps = {
    visible: true,
    cancelable: true,
    textContent: 'Loading...',
    animation: 'fade',
    color: '#fff',
    size: 'large',
    overlayColor: 'rgba(0,0,0,0.25)',
  };

  constructor(props) {
    super(props);
    const { visible, textContent } = props || {};
    this.state = {
      visible,
      textContent: textContent || '',
    };
  }

  render() {
    const {
      customIndicator,
      color,
      size,
      indicatorStyle,
      textStyle,
    } = this.props;
    const { textContent } = this.state;
    return (
      <View style={styles.background}>
        {
          customIndicator
            ? (customIndicator)
            : (
              <ActivityIndicator
                color={color}
                size={size}
                style={[styles.activityIndicator, { ...indicatorStyle }]}
              />
            )
        }
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, { textStyle }]}>
            {textContent}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: 100,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width / 2 - 50,
    top: height / 2 - 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 30,
    fontSize: 12,
    color: '#EEE',
  },
  activityIndicator: {
    flex: 1,
  },
});

export default LoadingView;

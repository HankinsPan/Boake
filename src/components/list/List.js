import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import icEmpty from '../../image/ic_404_01.png';

const EmptyComponent = ({ content }) => (
  <View style={styles.emptyContainer}>
    <Image
      style={styles.emptyIcon}
      source={icEmpty}
    />

    <Text style={styles.emptyTips}>
      {content || '页面飞出太阳系了o(╥﹏╥)o'}
    </Text>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.emptyBtnView}
      onPress={() => {
        console.log('=== EmptyComponent');
      }}>
      <Text style={styles.emptyText}>{'点击重试'}</Text>
    </TouchableOpacity>
  </View>
);

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log('===== list props >>>>', this.props);
    const {
      style,
    } = this.props;

    return (
      <SafeAreaView style={[styles.container, style ? style : {}]}>
        <FlatList
          ref={ref => this._flatList = ref}
          data={[]}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          // ItemSeparatorComponent={() => this.renderSeparator()}
          // ListFooterComponent={() => renderFooter ? renderFooter() : this.renderDefaultFooter()}
          // ListHeaderComponent={() => renderHeader ? renderHeader(original) : this.renderDefaultHeader()}
          keyExtractor={(item, index) => index.toString()}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default List;

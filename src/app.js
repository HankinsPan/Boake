import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';

import Mock from 'mockjs';
import icEmpty from './image/ic_404_01.png';

const { width, height } = Dimensions.get('window');
const Random = Mock.Random;

const EmptyComponent = ({ title }) => (
  <View style={styles.emptyContainer}>

    <Image
      style={styles.emptyIcon}
      source={icEmpty}
    />

    <Text style={styles.emptyTips}>
      {'页面飞出太阳系了o(╥﹏╥)o'}
    </Text>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.emptyBtnView}
      onPress={() => {
        console.log('=== EmptyComponent');
      }}>
      <Text style={styles.emptyText}>{title}</Text>
    </TouchableOpacity>
  </View>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mock: [],
      isRefresh: false,
    };
  }

  componentDidMount() {
    this.initMock();
  }

  async initMock() {
    let mock = [];
    for (let i = 0; i < 30; i++) {
      const props = {
        title: Random.cparagraph(1, 3),
      };
      mock.push(props);
    }
    // this.setState({
    //   mock,
    // });
  }

  loadData(refreshing) {
    const params = {
      page: 0,
      pageSize: 20,
    };

    if (refreshing) {
      this.setState({
        isRefresh: true,
      }, () => this.onRefreshData(params));
    }
  }

  async onRefreshData(params) {
    console.log('====== onRefreshData params >>>>', params);
    let timer = setTimeout(() => {
      clearTimeout(timer);
      this.setState({
        isRefresh: false,
      });
    }, 1500);
  }

  renderListHeader() {
    return (
      <View style={styles.headerBlock}>
        <Text style={{ fontSize: 18, color: '#fff' }}>HEADER</Text>
      </View>
    );
  }

  renderListFooter() {
    return (
      <View style={styles.footerBlock}>
        <Text style={{ fontSize: 18, color: '#fff' }}>FOOTER</Text>
      </View>
    );
  }

  renderItemView(item, index) {

    return (
      <TouchableOpacity
        style={{ padding: 15, backgroundColor: '#fff', marginTop: 2.5 }}
        key={`item_${index}`}
        activeOpacity={0.8}
        onPress={() => this.onItemClick(item)}>
        <Text style={styles.itemTxt}>{item.title || ''}</Text>
      </TouchableOpacity>
    );
  }


  onItemClick(item) {
    console.log('====== onItemClick >>>> ', item);
  }

  render() {
    const { mock, isRefresh } = this.state;
    let _isEmpty = !(mock && mock.length);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={ref => this._flatList = ref}
          data={mock}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <EmptyComponent title="点击重试"/>
          }
          ListFooterComponent={_isEmpty ? null : this.renderListFooter()}
          ListHeaderComponent={_isEmpty ? null : this.renderListHeader()}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => this.renderItemView(item, index)}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  itemTxt: {
    fontSize: 16,
    color: '#363636',
    lineHeight: 20,
  },
  footerBlock: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F',
  },
  headerBlock: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37c',
  },
  emptyBtnView: {
    paddingHorizontal: 25,
    paddingVertical: 7.5,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cdcdcd',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  emptyIcon: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 10,
  },
  emptyTips: {
    fontSize: 18,
    color: '#d1d1d1',
    marginBottom: 25,
  },
});

export default App;

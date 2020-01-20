import {
  Alert,
  DeviceEventEmitter,
  NetInfo,
  Platform,
} from 'react-native';

import qs from 'qs';
import _ from 'lodash';

import * as request from './request';

const OS = Platform.OS;

export function get(url, data, domain = request.domain) {
  return request.get({ url: { path: url, prefix: domain }, data, dataType: 'json' });
}

export function getBaokeList(data) {
  console.log('===== getBaokeList data >>>>', data);
  return get(`list/jingxuan/1/bs0315-${OS}`, data);
}

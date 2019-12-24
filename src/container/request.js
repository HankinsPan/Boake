/**
 * API request libraries
 */
import qs from 'qs';
import _ from 'lodash';
import moment from 'moment';

const domain = 'http://d.api.budejie.com/topic/';

const contentType = {
  json: 'application/json;charset=utf-8',
  form: 'application/x-www-form-urlencoded;charset=utf-8',
};

function promiseCancelable(promise) {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({ isCanceled: true }) : reject(val),
    ).catch((error) =>
      hasCanceled_ ? reject({ isCanceled: true }) : reject(error),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
}

function timeoutPromise(promise, ms) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('TIME OUT'));
    }, ms);

    promise.then((res) => {
      resolve(res);
      clearTimeout(timeoutId);
    }).catch((err) => {
      reject(err);
      clearTimeout(timeoutId);
    });
  });
}

function filterStatus(requestMethod, res, url, data) {
  if (res.status >= 200 && res.status <= 500) {
    let response = JSON.parse(res._bodyText);
    if (res.status === 401) {

    }
    return res;
  } else {
    let error = new Error(res.statusText);
    error.res = res;
    error.type = 'http';
    throw  error;
  }
}

function filterJSON(res) {
  return res.json();
}

async function get(params = { url: { prefix: domain }, cancelable: false, dataType: 'form' }) {
  const {
    dataType,
    data,
    url: { prefix, path },
  } = params;

  let url = prefix ? `${prefix}${path}` : `${path}`;
  if (data) {
    url = `${url}?${qs.stringify(data, { indices: false })}`;
  }

  let headers = {
    'Accept': 'application/json',
    'Content-Type': dataType === 'json' ? contentType.json : contentType.form,
    'X-Requested-With': 'XMLHttpRequest',
    'x-channel': 'application',
    'version': '1.0.0',
  };

  let promise = fetch(url, headers);

  return promise
    .then(res => filterStatus('GET', res, url, data))
    .then(filterJSON)
    .catch(e => {
      const msg = e.message ? e.message : '服务器出错,请稍后再试';
      console.warn('http request get response error', url, data, JSON.stringify(headers), msg);
      return { success: false, msg };
    });
}

export {
  get,
};

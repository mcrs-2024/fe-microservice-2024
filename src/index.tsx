/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { SWRConfig } from 'swr';

import './i18n';

import axiosClient from './helpers/api/baseApi';
import store from './redux toolkit/store';
import { configureAppStore } from './redux/store';
import App from './App';
import themeConfig from './themeConfig';

const serializer = (payload: any): string => {
  return payload
    ? Object.keys(payload)
        .map(key => {
          if (payload[key] === undefined || payload[key] === null) return ''; // check filter null neu khong co thi bug khi 1 sex bug khi 1 filter de null
          return key + '=' + payload[key];
        })
        .join('&')
    : '';
};
const unSerializer = (queryString: string): any => {
  return queryString
    ? queryString.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        return { ...acc, [key]: value };
      }, {})
    : {};
};
const IDENTIFY_STRING = '7vUKqt6n3hdxSLg22lnufXCeyPlmIhEIJfmKB2cd';

const fetcher = (url: string) => {
  if (url.includes(IDENTIFY_STRING)) {
    const newUrl = url.split(IDENTIFY_STRING)[0];
    const dataString = url.split(IDENTIFY_STRING)[1];
    const data = dataString ? unSerializer(dataString) : undefined;
    return axiosClient({ url: newUrl, data }).then(res => res.data);
  } else {
    return axiosClient({ url }).then(res => res.data);
  }
};
type TPayload =
  | {
      url: string;
      params?: any;
      data?: any;
    }
  | string;

function serialize(useSWRNext: any) {
  return (payload: TPayload, fetcher: any, config: any) => {
    if (payload && typeof payload !== 'string') {
      // params, body
      const { url, params, data } = payload;
      const queryString = params
        ? Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&')
        : '';

      const serializedBody = data ? serializer(data) : '';

      const serializedString = `${url}?${queryString}${IDENTIFY_STRING}${serializedBody}`;
      return useSWRNext(
        serializedString,
        data ? () => fetcher(serializedString, data) : fetcher,
        config,
      );
    } else {
      // url
      return useSWRNext(payload, fetcher, config);
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <Provider store={configureAppStore({})}>
      <React.Fragment>
        <SWRConfig
          value={{
            fetcher,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
              if (error.status === 404) return;
              if (error.status === 403) return;
              if (retryCount >= 0) return;

              // Retry after 5 seconds.
              setTimeout(() => revalidate({ retryCount }), 5000);
            },
            refreshInterval: 0,
            revalidateOnFocus: false,
            use: [serialize as any],
          }}
        >
          <ConfigProvider theme={themeConfig}>
            <App />
          </ConfigProvider>
        </SWRConfig>
      </React.Fragment>
    </Provider>
  </Provider>,
);

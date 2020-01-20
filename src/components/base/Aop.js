import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import LoadingView from '../modal/LoadingView';

export function WithLoading(msg = 'Loading...') {
  return function wrappedFunction(target, name, descriptor) {
    const origin = descriptor.value;
    descriptor.value = async function () {
      let sibling = new RootSiblings(
        <LoadingView
          visible={true}
          textContent={msg}
        />,
      );

      let result;
      try {
        result = await origin.apply(this, arguments);
      } catch (e) {
        console.error(e);
        sibling && sibling.destroy();
        return result;
      }

      sibling && sibling.destroy();
      return result;
    };
    return descriptor;
  };
}

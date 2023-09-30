import React from 'react';
import { Button, Text, View } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

const toast = () => {
  Toast.show('Testing this out?', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    // onShow: () => {},
    // onShown: () => {},
    // onHide: () => {},
    // onHidden: () => {}
  });
};

export default function ToastScreen() {
  return (
    <RootSiblingParent>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Toast Page</Text>
        <Button
          onPress={toast}
          title="Toast"
          /* color = 'blue' /*messing around */
        />
      </View>
    </RootSiblingParent>
  );
}

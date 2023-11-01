import { BottomSheet, CheckBox } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-gesture-handler';
import styles from './styles';
import Icon from '../../../assets/icons';

type FilterModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

function FilterModal({ isVisible, setIsVisible, title }: FilterModalProps) {
  const [checked1, toggleChecked1] = useState(false);
  const [checked2, toggleChecked2] = useState(false);
  const [checked3, toggleChecked3] = useState(false);

  const genres = [
    {
      title: 'Fiction',
      state: checked1,
      setState: toggleChecked1,
    },
    {
      title: 'Erasure & Found Poetry',
      state: checked2,
      setState: toggleChecked2,
    },
    {
      title: 'Non-Fiction',
      state: checked3,
      setState: toggleChecked3,
    },
  ];

  return (
    <SafeAreaProvider>
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        containerStyle={styles.modalBackground}
        scrollViewProps={{ bounces: false }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.closeContainer}>
            <Pressable onPress={() => setIsVisible(false)}>
              <View>
                <Icon type="close_modal_button" />
              </View>
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.modalTitle}> {title} </Text>
            <ScrollView
              showsVerticalScrollIndicator
              bounces={false}
              style={styles.scrollView}
            >
              {genres.map(item => {
                return (
                  <CheckBox
                    key={item.title}
                    title={item.title}
                    checked={item.state}
                    onPress={() => item.setState(!item.state)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="black"
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaProvider>
  );
}

export default FilterModal;

import { BottomSheet, CheckBox } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-gesture-handler';
import styles from './styles';
import Icon from '../../../assets/icons';
import { TagFilter, useFilter } from '../../utils/FilterContext';
import ChildFilter from './ChildFilter';
import ParentFilter from './ParentFilter';

type FilterModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

function FilterModal({ isVisible, setIsVisible, title }: FilterModalProps) {
  const { dispatch, filters } = useFilter();

  const toggleParentFilter = useCallback(
    (id: number) => {
      dispatch({ type: 'TOGGLE_MAIN_GENRE', mainGenreId: id });
    },
    [dispatch],
  );

  const toggleChildFilter = useCallback(
    (id: number) => {
      dispatch({ type: 'TOGGLE_FILTER', id });
    },
    [dispatch],
  );

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
              bounces={true}
              style={styles.scrollView}
            >
              {Array.from(filters).map(([_, parentFilter]) => {
                return (
                  <>
                    <ParentFilter
                      id={parentFilter.id}
                      name={parentFilter.name}
                      checked={parentFilter.active}
                      onPress={toggleParentFilter}
                    />

                    {parentFilter.children.map(filter => {
                      return (
                        <ChildFilter
                          id={filter.id}
                          name={filter.name}
                          checked={filter.active}
                          onPress={toggleChildFilter}
                        />
                      );
                    })}
                  </>
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

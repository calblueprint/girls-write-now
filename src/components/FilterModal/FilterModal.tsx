import { BottomSheet, CheckBox } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ChildFilter from './ChildFilter';
import ParentFilter from './ParentFilter';
import styles from './styles';
import Icon from '../../../assets/icons';
import { TagFilter, useFilter } from '../../utils/FilterContext';

type FilterModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

export enum CATEGORIES {
  GENRE = 'genre-medium',
  TOPIC = 'topic',
  TONE = 'tone',
}

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
            <FlatList
              data={Array.from(filters)}
              renderItem={({ item }) => {
                const [_, parentFilter] = item;
                return (
                  <>
                    <ParentFilter
                      id={parentFilter.id}
                      name={parentFilter.name}
                      checked={parentFilter.active}
                      onPress={toggleParentFilter}
                    />

                    <FlatList
                      data={parentFilter.children}
                      renderItem={({ item }) => {
                        return (
                          <ChildFilter
                            id={item.id}
                            name={item.name}
                            checked={item.active}
                            onPress={toggleChildFilter}
                          />
                        );
                      }}
                    />
                  </>
                );
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaProvider>
  );
}

export default FilterModal;

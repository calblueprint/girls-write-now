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

type ParentFilter = { children: TagFilter[] } & TagFilter;

function FilterModal({ isVisible, setIsVisible, title }: FilterModalProps) {
  const { dispatch, filters } = useFilter();

  const toggleFilter = useCallback(
    (id: number) => {
      dispatch({ type: 'TOGGLE_FILTER', id });
    },
    [dispatch],
  );

  const nestFilters = (filters: TagFilter[]) => {
    const parents = new Map<number, ParentFilter>();
    filters
      .filter(filter => filter.parent === null)
      .map(parentFilter => {
        parents.set(parentFilter.id, {
          ...parentFilter,
          children: [],
        } as ParentFilter);
      });

    filters.map(childFilter => {
      if (childFilter.parent) {
        parents.get(childFilter.parent)?.children.push(childFilter);
      }
    });

    return parents;
  };

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
              {Array.from(nestFilters(filters)).map(([_, parentFilter]) => {
                console.log('rerendering ' + parentFilter.name);
                return (
                  <>
                    <ParentFilter
                      id={parentFilter.id}
                      name={parentFilter.name}
                      checked={parentFilter.active}
                      onPress={toggleFilter}
                    />

                    {parentFilter.children.map(filter => {
                      console.log('rerendering ' + filter.name);

                      return (
                        <ChildFilter
                          id={filter.id}
                          name={filter.name}
                          checked={filter.active}
                          onPress={toggleFilter}
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

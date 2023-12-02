import { BottomSheet, CheckBox } from '@rneui/themed';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-gesture-handler';
import styles from './styles';
import Icon from '../../../assets/icons';
import { TagFilter, useFilter } from '../../utils/FilterContext';
import { useEffect, useRef } from 'react';

type FilterModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

type ParentTagFilter = { children: TagFilter[] } & TagFilter;

function FilterModal({ isVisible, setIsVisible, title }: FilterModalProps) {
  const { dispatch, filters } = useFilter();
  const nestedFilters = useRef(new Map<number, ParentTagFilter>());

  useEffect(() => {
    nestFilters();
    // console.log(nestedFilters.current);
  }, [filters]);

  const nestFilters = () => {
    Array.from(filters)
      .filter(([_, { parent }]) => parent === null)
      .map(([id, parent]) =>
        nestedFilters.current.set(id, {
          ...parent,
          children: [],
        } as ParentTagFilter),
      );

    Array.from(filters).map(([_, filter]) => {
      if (filter.parent) {
        nestedFilters.current.get(filter.parent)?.children.push(filter);
      }
    });
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
              bounces={false}
              style={styles.scrollView}
            >
              {Array.from(nestedFilters.current).map(
                ([id, parentFilter]: [number, ParentTagFilter]) => {
                  return (
                    <CheckBox
                      key={id}
                      title={parentFilter.name}
                      checked={parentFilter.active}
                      onPress={() =>
                        dispatch({ type: 'TOGGLE_FILTER', id: parentFilter.id })
                      }
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor="black"
                    ></CheckBox>
                  );
                },
              )}
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaProvider>
  );
}

export default FilterModal;

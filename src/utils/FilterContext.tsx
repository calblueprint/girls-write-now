import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import supabase from './supabase';

type FilterAction =
  | { type: 'SET_TAGS'; tags: TagFilter[] }
  | { type: 'TOGGLE_FILTER'; id: number }
  | { type: 'CLEAR_ALL'; category: string }
  | { type: 'TOGGLE_MAIN_GENRE'; mainGenreId: number };

export type FilterDispatch = React.Dispatch<FilterAction>;

export type TagFilter = {
  id: number;
  name: string;
  category: string;
  active: boolean;
  parent: number | null;
};

export interface FilterState {
  filters: Map<number, TagFilter>;
  isLoading: boolean;
  dispatch: FilterDispatch;
}

const FilterContext = createContext({} as FilterState);

export const useFilterReducer = () =>
  useReducer(
    (prevState: FilterState, action: FilterAction) => {
      switch (action.type) {
        case 'SET_TAGS':
          const filterMap = new Map();
          action.tags.map(tag => filterMap.set(tag.id, tag));

          return {
            ...prevState,
            filters: filterMap,
            isLoading: false,
          };
        case 'TOGGLE_FILTER':
          const desiredTag: TagFilter =
            prevState.filters.get(action.id) ?? ({} as TagFilter);

          prevState.filters.set(action.id, {
            ...desiredTag,
            active: !desiredTag?.active,
          });
          return {
            ...prevState,
            filters: prevState.filters,
          };
        case 'CLEAR_ALL':
          const clearedFilters = Array.from(
            prevState.filters,
            ([id, filter]): [number, TagFilter] =>
              filter.category == action.category
                ? [id, { ...filter, active: false }]
                : [id, filter],
          );

          return {
            ...prevState,
            filters: new Map(clearedFilters),
          };
        case 'TOGGLE_MAIN_GENRE':
          const parentGenre = prevState.filters.get(action.mainGenreId);
          const newActiveState = !parentGenre?.active;

          const updatedFilters = Array.from(
            prevState.filters,
            ([id, filter]): [number, TagFilter] =>
              filter.parent == parentGenre?.id || id == action.mainGenreId
                ? [id, { ...filter, active: newActiveState }]
                : [id, filter],
          );

          return {
            ...prevState,
            filters: new Map(updatedFilters),
          };
        default:
          return prevState;
      }
    },
    {
      filters: new Map(),
      isLoading: true,
      dispatch: () => null,
    },
  );

export function useFilter() {
  const value = useContext(FilterContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error(
        'useFilter must be wrapped in a <FilterContextProvider />',
      );
    }
  }

  return value;
}

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filterState, dispatch] = useFilterReducer();

  const initTagsFromSupabase = async () => {
    const { data } = await supabase.from('tags').select(`*`);

    return data?.map(entry => {
      const { category, id, name, parent_id } = entry;
      console.log(entry);

      return {
        id,
        name,
        category,
        parent: parent_id,
        active: false,
      } as TagFilter;
    });
  };

  useEffect(() => {
    initTagsFromSupabase().then(tags =>
      dispatch({ type: 'SET_TAGS', tags: tags ?? [] }),
    );
  }, []);

  useEffect(() => {
    console.log(filterState);
  }, [filterState]);

  const filterContextValue = useMemo(
    () => ({
      ...filterState,
      dispatch,
    }),
    [filterState],
  );

  return (
    <FilterContext.Provider value={filterContextValue}>
      {children}
    </FilterContext.Provider>
  );
}

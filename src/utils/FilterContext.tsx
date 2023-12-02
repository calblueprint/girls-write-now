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
  | { type: 'TOGGLE_FILTER'; name: string }
  | { type: 'CLEAR_ALL'; category: string }
  | { type: 'TOGGLE_MAIN_GENRE'; mainGenre: string };

export type FilterDispatch = React.Dispatch<FilterAction>;

export type TagFilter = {
  id: number;
  name: string;
  category: string;
  active: boolean;
  parent: number | null;
};

export interface FilterState {
  filters: TagFilter[];
  isLoading: boolean;
  dispatch: FilterDispatch;
}

const FilterContext = createContext({} as FilterState);

export const useFilterReducer = () =>
  useReducer(
    (prevState: FilterState, action: FilterAction) => {
      switch (action.type) {
        case 'SET_TAGS':
          return {
            ...prevState,
            filters: action.tags,
            isLoading: false,
          };
        case 'TOGGLE_FILTER':
          return {
            ...prevState,
            filters: prevState.filters.map(tag =>
              tag.name == action.name ? { ...tag, active: !tag.active } : tag,
            ),
          };
        case 'CLEAR_ALL':
          return {
            ...prevState,
            filters: prevState.filters.map(tag =>
              tag.category == action.category ? { ...tag, active: false } : tag,
            ),
          };
        case 'TOGGLE_MAIN_GENRE':
          const parentGenre = prevState.filters.find(
            ({ name }) => name === action.mainGenre,
          );
          const newActiveState = !parentGenre?.active;

          const updatedFilters = prevState.filters.map(tag =>
            tag.parent == parentGenre?.id || tag.name == action.mainGenre
              ? { ...tag, active: newActiveState }
              : tag,
          );

          return {
            ...prevState,
            filters: updatedFilters,
          };
        default:
          return prevState;
      }
    },
    {
      filters: [],
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

  const getTags = async () => {
    const { data } = await supabase.from('tags').select(`*`);

    return data?.map(entry => {
      const { category, id, name, parent_id } = entry;
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
    getTags().then(tags => dispatch({ type: 'SET_TAGS', tags: tags ?? [] }));
  }, []);

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

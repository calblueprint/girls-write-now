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
  | { type: 'SET_FILTER'; id: number; value: boolean }
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

type ParentFilter = { children: TagFilter[] } & TagFilter;

export interface FilterState {
  filters: Map<number, ParentFilter>;
  isLoading: boolean;
  dispatch: FilterDispatch;
}

const FilterContext = createContext({} as FilterState);

const mapParentsAndChildren = (
  filters: Map<number, ParentFilter>,
  func: (filter: TagFilter) => TagFilter,
) => {
  return new Map(
    Array.from(filters).map(([id, parent]) => {
      return [
        id,
        {
          ...func(parent),
          children: parent.children.map(func),
        } as ParentFilter,
      ];
    }),
  );
};

export const useFilterReducer = () =>
  useReducer(
    (prevState: FilterState, action: FilterAction) => {
      switch (action.type) {
        case 'SET_TAGS':
          const nestedFilters = new Map<number, ParentFilter>();
          action.tags
            .filter(filter => filter.parent === null)
            .map(parentFilter => {
              nestedFilters.set(parentFilter.id, {
                ...parentFilter,
                children: [],
              } as ParentFilter);
            });

          action.tags.map(childFilter => {
            if (childFilter.parent) {
              nestedFilters.get(childFilter.parent)?.children.push(childFilter);
            }
          });

          return {
            ...prevState,
            filters: nestedFilters,
            isLoading: false,
          };
        case 'SET_FILTER':
          return {
            ...prevState,
            filters: mapParentsAndChildren(prevState.filters, fitler =>
              fitler.id == action.id
                ? { ...fitler, active: action.value }
                : fitler,
            ),
          };
        case 'TOGGLE_FILTER':
          return {
            ...prevState,
            filters: mapParentsAndChildren(prevState.filters, fitler =>
              fitler.id == action.id
                ? { ...fitler, active: !fitler.active }
                : fitler,
            ),
          };
        case 'CLEAR_ALL':
          return {
            ...prevState,
            filters: mapParentsAndChildren(prevState.filters, filter =>
              filter.category == action.category
                ? { ...filter, active: false }
                : filter,
            ),
          };
        case 'TOGGLE_MAIN_GENRE':
          const parentGenre = prevState.filters.get(action.mainGenreId);
          const newActiveState = !parentGenre?.active;

          const updatedFilters = mapParentsAndChildren(
            prevState.filters,
            tag =>
              tag.parent == action.mainGenreId || tag.id == action.mainGenreId
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

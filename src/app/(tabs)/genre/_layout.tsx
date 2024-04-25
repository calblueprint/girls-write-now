import { Stack } from 'expo-router';

import { FilterContextProvider } from '../../../utils/FilterContext';

function StackLayout() {
  return (
    <FilterContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </FilterContextProvider>
  );
}

export default StackLayout;

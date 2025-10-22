// //path app/OurProvider.tsx
// 'use client';
// import { ReactNode } from 'react';
// import { Provider } from 'react-redux';

// import { store } from '@/redux/store';

// type OurProviderProps = {
//   children: ReactNode;
// };
// export function OurProvider({ children }: OurProviderProps) {
//   return <Provider store={store}>{children}</Provider>;
// }
'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/redux/store';

type OurProviderProps = {
  children: ReactNode;
};

export function OurProvider({ children }: OurProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

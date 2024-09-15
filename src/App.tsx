import { useEffect } from 'react';
import i18next from 'i18next';

import ErrorBoundary from './layouts/ErrorBoundary';
import AllRoutes from './routes/Routes';
import { getItem } from './utils/localStorage';

// For Icons
import './assets/scss/icons.scss';
// For Default import Default.scss
import './assets/scss/config/default/app.scss';
import './assets/scss/config/default/bootstrap.scss';

const App = () => {
  useEffect(() => {
    const currentLang: string = getItem('i18nextLng') || 'EN';
    i18next.changeLanguage(currentLang);
  }, []);

  return (
    <ErrorBoundary>
      <AllRoutes />
    </ErrorBoundary>
  );
};

export default App;

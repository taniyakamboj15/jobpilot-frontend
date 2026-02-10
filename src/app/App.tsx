import { Suspense } from 'react';
import { Providers } from './providers';
import { AppRouter, PageLoader } from './router';

const App = () => {
    return (
        <Providers>
            <Suspense fallback={<PageLoader />}>
                <AppRouter />
            </Suspense>
        </Providers>
    );
};

export default App;

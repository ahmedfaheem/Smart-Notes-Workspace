import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routing/AppRouting'
import { ThemeProvider } from './context/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { login } from './features/auth/authSlice';

const queryClient = new QueryClient();

const token = localStorage.getItem("token");

if (token) {
  store.dispatch(login({ token }));
}


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
      <RouterProvider router={routes}/>
      </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  // </StrictMode>,
)

import { createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router';
import AuthorizationPage from './routes/authorization-page.tsx';
import MainPage from './routes/main-page.tsx';
import AboutPage from './routes/about-page.tsx';
import __root from './routes/__root.tsx';
import { ErrorPage } from './routes/error-page.tsx';

const rootRoute = createRootRoute({
  component: __root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return redirect({
      to: '/login',
      throw: true,
    });
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: AuthorizationPage,
});

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/main',
  component: MainPage,
});

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/*',
  component: ErrorPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  aboutRoute,
  mainRoute,
  errorRoute,
]);

export const router = createRouter({ routeTree });

import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import AuthorizationPage from './routes/authorization-page.tsx';
import MainPage from './routes/main.tsx';
import AboutPage from './routes/about.tsx';
import Index from './routes';

const rootRoute = createRootRoute({
  component: Index,
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

const routeTree = rootRoute.addChildren([loginRoute, aboutRoute, mainRoute]);

export const router = createRouter({ routeTree });

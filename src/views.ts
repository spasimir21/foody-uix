import { Registry } from '@uixjs/core';

function registerViews(registry: Registry) {
  registry.components.register({
    name: 'landing',
    load: () => import('./views/landing/landing.component')
  });

  registry.components.register({
    name: 'register',
    load: () => import('./views/register/register.component')
  });

  registry.components.register({
    name: 'login',
    load: () => import('./views/login/login.component')
  });

  registry.components.register({
    name: 'products',
    load: () => import('./views/products/products.component')
  });

  registry.components.register({
    name: 'history',
    load: () => import('./views/history/history.component')
  });

  registry.components.register({
    name: 'scan',
    load: () => import('./views/scan/scan.component')
  });

  registry.components.register({
    name: 'add-item',
    load: () => import('./views/addItem/addItem.component')
  });
}

export { registerViews };

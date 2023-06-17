import { Router } from '@uixjs/router';
import { Registry } from '@uixjs/core';

function createRouter(registry: Registry) {
  return new Router([
    {
      name: 'landing',
      path: '/',
      component: { component: 'landing', registry }
    },
    {
      name: 'register',
      path: '/register',
      component: { component: 'register', registry }
    },
    {
      name: 'login',
      path: '/login',
      component: { component: 'login', registry }
    },
    {
      name: 'products',
      path: '/products',
      component: { component: 'products', registry }
    },
    {
      name: 'history',
      path: '/history',
      component: { component: 'history', registry }
    },
    {
      name: 'scan',
      path: '/scan',
      component: { component: 'scan', registry }
    },
    {
      name: 'addItem',
      path: '/add/:barcode',
      component: { component: 'add-item', registry }
    }
  ]);
}

export { createRouter };

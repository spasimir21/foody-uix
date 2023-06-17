import rootComponent from './components/root/root.component';
import { createRegistry } from '@uixjs/core';
import { registerViews } from './views';

const vvvRegistry = createRegistry('vvv');
registerViews(vvvRegistry);

vvvRegistry.components.register(rootComponent);

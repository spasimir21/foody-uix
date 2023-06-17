import navigationComponent from '../navigation/navigation.component';
import { Router, provideRoute, provideRouter } from '@uixjs/router';
import { State, registerDependency } from '@uixjs/reactivity';
import { api, onTokenLoaded } from '../../api/api';
import defineComponent from './root.view.html';
import { createRouter } from '../../router';
import { Controller } from '@uixjs/core';

class RootController extends Controller {
  router: Router = null as any;

  @State
  showNavigation: boolean = false;

  override init() {
    this.context.toggleNavigation = (state: boolean) => (this.showNavigation = state);
    this.context.api = api;

    this.router = registerDependency(this, createRouter(this.component.registry));
    provideRoute(this.context, this.router.route);
    provideRouter(this.context, this.router);

    onTokenLoaded.then(() =>
      this.router.goto({ route: api.token == null || api.token == '' ? 'landing' : 'products' })
    );
  }
}

const rootComponent = defineComponent({
  name: 'root',
  controller: RootController,
  dependencies: [navigationComponent]
});

export default rootComponent;
export { rootComponent };

import defineComponent from './landing.view.html';
import { Controller } from '@uixjs/core';

class LandingController extends Controller {
  override onMount() {
    this.context.toggleNavigation(false);
  }
}

const landingComponent = defineComponent({
  name: 'landing',
  controller: LandingController
});

export default landingComponent;
export { landingComponent };

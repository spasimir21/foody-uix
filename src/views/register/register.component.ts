import { Effect, Reactive, State, registerDependency } from '@uixjs/reactivity';
import { RequestLoader } from '../../api/RequestLoader';
import { GetRequestResult } from '../../api/request';
import defineComponent from './register.view.html';
import { registerUser } from '../../api/user';
import { saveToken } from '../../api/api';
import { getRouter } from '@uixjs/router';
import { Controller } from '@uixjs/core';

@Reactive
class RegisterLoader extends RequestLoader<typeof registerUser> {
  public override request = registerUser;

  @State
  token: string | null = null;

  protected override onSuccessfulLoad(result: GetRequestResult<typeof registerUser>): void {
    this.token = result.token;
  }
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

class RegisterController extends Controller {
  @State
  formData: RegisterData = { username: '', email: '', password: '' };
  @State
  loading: boolean = false;

  registerLoader: RegisterLoader = null as any;

  override init() {
    this.registerLoader = registerDependency(this, new RegisterLoader(this.context.api));
  }

  override onMount() {
    this.context.toggleNavigation(false);
  }

  register() {
    if (this.registerLoader.loading) return;
    this.registerLoader.startLoad(this.formData);
  }

  @Effect
  private updateToken() {
    if (this.registerLoader.token == null) return;

    saveToken(this.registerLoader.token);
    getRouter(this.context).goto({ route: 'products' });
  }
}

const registerComponent = defineComponent({
  name: 'register',
  controller: RegisterController
});

export default registerComponent;
export { registerComponent };

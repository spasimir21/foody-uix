import { Effect, Reactive, State, registerDependency } from '@uixjs/reactivity';
import { RequestLoader } from '../../api/RequestLoader';
import { GetRequestResult } from '../../api/request';
import defineComponent from './login.view.html';
import { Router, getRouter } from '@uixjs/router';
import { loginUser } from '../../api/user';
import { saveToken } from '../../api/api';
import { Controller } from '@uixjs/core';

@Reactive
class LoginLoader extends RequestLoader<typeof loginUser> {
  public override request = loginUser;

  @State
  token: string | null = null;

  protected override onSuccessfulLoad(result: GetRequestResult<typeof loginUser>): void {
    this.token = result.token;
  }
}

interface LoginData {
  email: string;
  password: string;
}

class LoginController extends Controller {
  @State
  formData: LoginData = { email: '', password: '' };
  @State
  loading: boolean = false;

  loginLoader: LoginLoader = null as any;

  override init() {
    this.loginLoader = registerDependency(this, new LoginLoader(this.context.api));
  }

  override onMount() {
    this.context.toggleNavigation(false);
  }

  login() {
    if (this.loginLoader.loading) return;
    this.loginLoader.startLoad(this.formData);
  }

  @Effect
  private updateToken() {
    if (this.loginLoader.token == null) return;

    saveToken(this.loginLoader.token);
    getRouter(this.context).goto({ route: 'products' });
  }
}

const loginComponent = defineComponent({
  name: 'login',
  controller: LoginController
});

export default loginComponent;
export { loginComponent };

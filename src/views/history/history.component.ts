import historyItemComponent from '../../components/historyItem/historyItem.component';
import { Effect, Reactive, State, registerDependency } from '@uixjs/reactivity';
import { Product, getHistory } from '../../api/product';
import { RequestLoader } from '../../api/RequestLoader';
import { GetRequestResult } from '../../api/request';
import defineComponent from './history.view.html';
import { Controller } from '@uixjs/core';

@Reactive
class HistoryLoader extends RequestLoader<typeof getHistory> {
  public override request = getHistory;

  @State
  history: Product[] = [];

  protected override onSuccessfulLoad(result: GetRequestResult<typeof getHistory>): void {
    this.history = result.products;
  }
}

class HistoryController extends Controller {
  historyLoader: HistoryLoader = null as any;

  override init() {
    this.historyLoader = registerDependency(this, new HistoryLoader(this.context.api));
    this.historyLoader.startLoad({});
  }

  override onMount() {
    this.context.toggleNavigation(true);
  }

  @Effect
  private sortProducts() {
    const history = this.historyLoader.history;
    if (history == null) return;

    history.sort((a, b) => (b.removeDate as number) - (a.removeDate as number));
  }
}

const historyComponent = defineComponent({
  name: 'history',
  controller: HistoryController,
  dependencies: [historyItemComponent]
});

export default historyComponent;
export { historyComponent };

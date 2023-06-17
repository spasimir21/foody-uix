import defineComponent from './historyItem.view.html';
import { Computed } from '@uixjs/reactivity';
import { Product } from '../../api/product';
import { Controller } from '@uixjs/core';

function getReverseDayDifference(date: number) {
  return Math.ceil((Date.now() - date) / (1000 * 3600 * 24));
}

class HistoryItemController extends Controller<{ product: Product }> {
  @Computed
  get daysSince() {
    return getReverseDayDifference(this.props.product.removeDate ?? Date.now());
  }

  @Computed
  get textColor() {
    return this.props.product.status == 'used' ? '#41a858' : '#eb574c';
  }
}

const historyItemComponent = defineComponent({
  name: 'history-item',
  controller: HistoryItemController
});

export default historyItemComponent;
export { historyItemComponent };

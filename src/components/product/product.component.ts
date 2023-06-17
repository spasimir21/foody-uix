import { Computed, Reactive, registerDependency } from '@uixjs/reactivity';
import { Product, removeProduct } from '../../api/product';
import { RequestLoader } from '../../api/RequestLoader';
import defineComponent from './product.view.html';
import { Controller } from '@uixjs/core';

@Reactive
class RemoveProductLoader extends RequestLoader<typeof removeProduct> {
  public override request = removeProduct;
}

function getDayDifference(date: number) {
  return Math.ceil((date - Date.now()) / (1000 * 3600 * 24));
}

class ProductController extends Controller<{
  iShown: boolean;
  setIsShown: () => void;
  product: Product;
  onRemove: () => void;
}> {
  removeProductLoader: RemoveProductLoader = null as any;

  @Computed
  get daysLeft() {
    return getDayDifference(this.props.product.expirationDate);
  }

  override init() {
    this.removeProductLoader = registerDependency(this, new RemoveProductLoader(this.context.api));
    if (getDayDifference(this.props.product.expirationDate) < 1) this.remove('thrown');
  }

  remove(status: 'used' | 'thrown') {
    this.removeProductLoader.startLoad({ productId: this.props.product.id, status });
    this.props.onRemove();
  }
}

const productComponent = defineComponent({
  name: 'product',
  controller: ProductController
});

export default productComponent;
export { productComponent };

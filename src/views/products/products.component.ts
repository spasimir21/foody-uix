import { Effect, Reactive, State, registerDependency } from '@uixjs/reactivity';
import productComponent from '../../components/product/product.component';
import { Product, getProducts } from '../../api/product';
import { RequestLoader } from '../../api/RequestLoader';
import { GetRequestResult } from '../../api/request';
import defineComponent from './products.view.html';
import { Controller } from '@uixjs/core';

@Reactive
class ProductsLoader extends RequestLoader<typeof getProducts> {
  public override request = getProducts;

  @State
  products: Product[] = [];

  protected override onSuccessfulLoad(result: GetRequestResult<typeof getProducts>): void {
    this.products = result.products;
  }
}

class ProductsController extends Controller {
  @State
  selectedIndex: number = -1;

  productsLoader: ProductsLoader = null as any;

  override init() {
    this.productsLoader = registerDependency(this, new ProductsLoader(this.context.api));
    this.productsLoader.startLoad({});
  }

  override onMount() {
    this.context.toggleNavigation(true);
  }

  setIsShown(index: number) {
    if (this.selectedIndex === index) this.selectedIndex = -1;
    else this.selectedIndex = index;
  }

  removeProduct(index: number) {
    const products = this.productsLoader.products;
    products.splice(index, 1);
    this.selectedIndex = -1;
  }

  @Effect
  private sortProducts() {
    const products = this.productsLoader.products;
    if (products == null) return;

    products.sort((a, b) => a.expirationDate - b.expirationDate);
  }
}

const productsComponent = defineComponent({
  name: 'products',
  controller: ProductsController,
  dependencies: [productComponent]
});

export default productsComponent;
export { productsComponent };

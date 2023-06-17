import { Effect, Reactive, State, registerDependency } from '@uixjs/reactivity';
import { ProductDetails, getProductDetails } from '../../barcodeScanner';
import { Router, getRoute, getRouter } from '@uixjs/router';
import { RequestLoader } from '../../api/RequestLoader';
import defineComponent from './addItem.view.html';
import { addProduct } from '../../api/product';
import { Controller } from '@uixjs/core';

@Reactive
class AddItemLoader extends RequestLoader<typeof addProduct> {
  public override request = addProduct;
}

interface ExtraProductInfo {
  expirationDate: number;
  price: number;
}

function formatDate(date: Date) {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let year = date.getFullYear().toString();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class AddItemController extends Controller {
  @State
  expirationDateInput: string = formatDate(new Date());
  @State
  priceInput: string = '2.50';

  @State
  extraProductInfo: ExtraProductInfo = {
    expirationDate: Date.now(),
    price: 2.5
  };

  @State
  productDetails: ProductDetails | null = null;

  addItemLoader: AddItemLoader = null as any;

  minDate = formatDate(new Date());

  override init() {
    this.addItemLoader = registerDependency(this, new AddItemLoader(this.context.api));
  }

  override async onFirstMount() {
    const productDetails = await getProductDetails(getRoute(this.context).params.barcode);

    if (productDetails == null) {
      getRouter(this.context).goto({ route: 'products' });
      return;
    }

    this.productDetails = productDetails;
  }

  override onMount() {
    this.context.toggleNavigation(false);
  }

  @Effect
  private updateExtraProductInfo() {
    this.extraProductInfo.expirationDate = new Date(this.expirationDateInput).getTime();

    const inputtedPrice = parseFloat(this.priceInput);
    if (isNaN(inputtedPrice)) return;

    this.extraProductInfo.price = inputtedPrice;
  }

  addProduct() {
    if (this.extraProductInfo.expirationDate < Date.now()) return;
    if (this.productDetails == null) return;

    this.addItemLoader.startLoad({
      name: this.productDetails.name,
      imageUrl: this.productDetails.imageSrc,
      expirationDate: this.extraProductInfo.expirationDate,
      price: this.extraProductInfo.price,
      barcode: getRoute(this.context).params.barcode
    });

    getRouter(this.context).goto({ route: 'products' });
  }
}

const addItemComponent = defineComponent({
  name: 'add-item',
  controller: AddItemController
});

export default addItemComponent;
export { addItemComponent };

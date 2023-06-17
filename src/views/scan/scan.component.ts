import { acquireCameraPermissions, scanBarcode } from '../../barcodeScanner';
import defineComponent from './scan.view.html';
import { getRouter } from '@uixjs/router';
import { Controller } from '@uixjs/core';

class ScanController extends Controller {
  override async onFirstMount() {
    const hasPermissions = await acquireCameraPermissions();

    if (!hasPermissions) {
      getRouter(this.context).goto({ route: 'products' });
      return;
    }

    const barcode = await scanBarcode();

    if (barcode == null) {
      getRouter(this.context).goto({ route: 'products' });
      return;
    }

    getRouter(this.context).goto({ route: 'addItem', params: { barcode } });
  }

  override onMount() {
    this.context.toggleNavigation(false);
  }
}

const scanComponent = defineComponent({
  name: 'scan',
  controller: ScanController
});

export default scanComponent;
export { scanComponent };

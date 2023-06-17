interface ProductDetails {
  barcode: string;
  name: string;
  imageSrc: string;
}

async function acquireCameraPermissions() {
  return true;
}

async function scanBarcode() {
  return '123456789';
}

async function getProductDetails(barcode: string): Promise<ProductDetails | null> {
  return {
    barcode,
    name: `Product ${barcode}`,
    imageSrc: `https://picsum.photos/500/500`
  };
}

export { ProductDetails, acquireCameraPermissions, scanBarcode, getProductDetails };

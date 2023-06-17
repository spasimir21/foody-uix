import { createRequest } from './request';

interface AddProductParams {
  name: string;
  imageUrl: string;
  expirationDate: number;
  price: number;
  barcode: string;
}

interface AddProductResult {
  productId: number;
}

const addProduct = createRequest<AddProductParams, AddProductResult>({
  path: '/product/add',
  method: 'POST'
});

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  expirationDate: number;
  price: number;
  barcode: string;
  status: 'active' | 'used' | 'thrown';
  addedDate: number;
  removeDate: number | null;
  userId: number;
}

interface ProductsResult {
  products: Product[];
}

const getProducts = createRequest<{}, ProductsResult>({
  path: '/product/current',
  method: 'GET'
});

const getHistory = createRequest<{}, ProductsResult>({
  path: '/product/history',
  method: 'GET'
});

interface RemoveProductParams {
  productId: number;
  status: 'used' | 'thrown';
}

const removeProduct = createRequest<RemoveProductParams, {}>({
  path: '/product/remove',
  method: 'DELETE'
});

interface UpdateProductParams {
  productId: number;
  expirationDate: number;
  price: number;
}

const updateProduct = createRequest<UpdateProductParams, {}>({
  path: '/product/update',
  method: 'PATCH'
});

export { addProduct, getProducts, getHistory, removeProduct, updateProduct, Product };

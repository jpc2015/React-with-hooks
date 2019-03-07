import * as React from 'react';

import ProductItem from './ProductItem';
import { IProduct } from '../../models/Products';

export interface IProductList {
    products: any,
}

const ProductList = (props: IProductList) => {
    return props.products.map((p: IProduct) => <ProductItem product={p} key={p.id} />)
}

export default ProductList;

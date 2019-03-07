import * as React from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../../store/actions';

import Spinner from '../Spinner';
import ProductList from './ProductList';

import './products.less';
import { IAppState } from '../../store/reducers';
import { IProduct } from '../../models/Products';

export interface IProductSection {
  fetchProducts?: any,
  products: IProduct[],
}

const ProductSection = (props: IProductSection) => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    props.fetchProducts(() => { setIsLoading(false) });
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Spinner />}
      <div className="products-container">
        <div className="products-list">
          <ProductList products={props.products} />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: IAppState) => ({
  products: state.product.products
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductSection);

import React from 'react';
import CreateProduct from './CreateProduct';

const Products = (): React.ReactElement => {
  const [view] = React.useState('create');

  const renderView = () => {
    if (view === 'view') {
      return <div>View</div>;
    } else if (view === 'create') {
      return <CreateProduct />;
    } else {
      return <div>Edit</div>;
    }
  };
  return renderView();
};

export default Products;

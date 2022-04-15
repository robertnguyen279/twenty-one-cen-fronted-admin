import React from 'react';

const Products = (): React.ReactElement => {
  const [view] = React.useState('create');

  const renderView = () => {
    if (view === 'view') {
      return <div>View</div>;
    } else if (view === 'create') {
      return <div>Create</div>;
    } else {
      return <div>Edit</div>;
    }
  };
  return renderView();
};

export default Products;

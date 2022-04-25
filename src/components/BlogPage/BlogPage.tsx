import React from 'react';
import CreateBlog from './CreateBlog';

const BlogPage = (): React.ReactElement => {
  const [view, setView] = React.useState({ type: 'create', blogId: null });

  const renderView = (): React.ReactElement => {
    if (view.type === 'create') {
      return <CreateBlog handleChangeView={() => setView({ type: 'view', blogId: null })} />;
    } else if (view.type === 'view') {
      return <div>view</div>;
    } else {
      return <div>edit</div>;
    }
  };
  return renderView();
};

export default BlogPage;

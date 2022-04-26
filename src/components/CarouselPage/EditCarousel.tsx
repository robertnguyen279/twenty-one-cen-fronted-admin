import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'components/Form';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import { removeNull } from 'services/common.service';
import { message, Skeleton } from 'antd';
import { IEditBlog } from 'types';
import { UploadSingleImage } from 'components/Form';
import { RichTextEditor } from 'components/Form';
import { getBlogs } from 'actions/blog.action';
import axios from 'services/axios.service';

const EditBlog = ({ handleChangeView, blogUrl }: IEditBlog): React.ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(true);
  const [postId, setPostId] = React.useState('');
  const formik = useFormik({
    initialValues: {
      title: '',
      picture: '',
      content: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Bạn phải nhập mục này'),
      picture: Yup.string().required('Bạn phải nhập mục này'),
      content: Yup.string().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (submitObject) => {
      const cleanSubmitObject = removeNull(submitObject);

      axios
        .patch(`/post/${postId}`, cleanSubmitObject)
        .then((response) => {
          if (response.data.statusCode === 200) {
            message.success('Sửa blog thành công');
            dispatch(getBlogs());
            handleChangeView();
          }
        })
        .catch(() => {
          message.error('Sửa blog thất bại');
        });
    },
  });

  const hanldeUploadPicutureSuccess = (url: string) => {
    formik.values.picture = url;
  };

  const handleEditorChange = (value: string) => {
    formik.values.content = value;
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    formik.values.title = target.value;
  };

  React.useEffect(() => {
    axios.get(`/post/${blogUrl}`).then((response) => {
      if (response.data.statusCode === 200) {
        const blog = response.data.post;
        formik.values.title = blog.title;
        formik.values.content = blog.content;
        formik.values.picture = blog.picture;
        setPostId(blog._id);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Sửa blog</div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <form onSubmit={formik.handleSubmit} className="md:w-2/3 md:p-10 relative large_form">
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Tiêu đề</div>
          <Input
            type="text"
            name="title"
            value={formik.values.title}
            placeholder="Tiêu đề"
            onChange={handleTitleChange}
            error={formik.errors.title && formik.touched.title ? formik.errors.title : false}
          />
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Ảnh đại diện</div>
          <div className="w-60 relative">
            <UploadSingleImage
              accept="image/png, image/jpeg, image/jpg"
              error={formik.errors.picture && formik.touched.picture ? formik.errors.picture : false}
              initialPicture={formik.values.picture}
              handleUploadSuccess={hanldeUploadPicutureSuccess}
            />
          </div>

          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Nội dung</div>
          <RichTextEditor handleEditorChange={handleEditorChange} defaultValue={formik.values.content} />
          <p className="relative text-xs text-red-600">
            {formik.errors.content && formik.touched.content && formik.errors.content}
          </p>
          <div className="submit_buttons pt-5 flex justify-center items-center">
            <CancelButton className="mx-2" onClick={handleChangeView}>
              Hủy
            </CancelButton>
            <Button type="submit" className="mx-2">
              Sửa blog
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBlog;

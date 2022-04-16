import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea } from 'components/Form';
import { AutoComplete } from 'components/Form';
import { RootState } from 'reducers/index.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from 'actions/product.action';
import { uploadToS3 } from 'services/s3.service';
import { message } from 'antd';

const CreateProduct = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const categories = useSelector((state: RootState) => state.productReducer.categories);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      price: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Bạn phải nhập mục này'),
      description: Yup.string().required('Bạn phải nhập mục này'),
      category: Yup.string().required('Bạn phải nhập mục này'),
      price: Yup.number().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (object) => {
      console.log(object);
    },
  });

  const hanldeUploadImage = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];

    uploadToS3(file, (err, url) => {
      if (err) {
        message.error('Upload hình thất bại');
      } else {
        console.log(url);
      }
    });
  };

  const handleAutoCompleteChange = (value: string): void => {
    formik.values.category = value;
  };

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  React.useEffect(() => {
    if (categories) {
      const options = categories.map((category) => {
        return {
          value: category.name,
        };
      });

      setOptions(options);
    }
  }, [categories]);

  return (
    <div>
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Tạo sản phẩm</div>
      <form onSubmit={formik.handleSubmit} className="form pr-10">
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Tên sản phẩm</div>
        <Input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && formik.touched.name ? formik.errors.name : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Mô tả sản phẩm</div>
        <Textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.errors.description && formik.touched.description ? formik.errors.description : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Phân loại</div>
        <AutoComplete
          placeholder="Phân loại sản phẩm"
          options={options || []}
          onChange={handleAutoCompleteChange}
          error={formik.errors.category && formik.touched.category ? formik.errors.category : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Hình ảnh</div>
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={hanldeUploadImage} />
      </form>
    </div>
  );
};

export default CreateProduct;

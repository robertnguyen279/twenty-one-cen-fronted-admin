import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea } from 'components/Form';
import { RootState } from 'reducers/index.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from 'actions/product.action';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import { removeNull } from 'services/common.service';
import { message, Select, DatePicker, Switch } from 'antd';
import { ICreateProduct } from 'types';
import { getVouchers } from 'actions/voucher.action';
import axios from 'services/axios.service';

const { Option } = Select;

const CreateProduct = ({ handleChangeView }: ICreateProduct): React.ReactElement => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.productReducer.categories);
  const getCategoriesError = useSelector((state: RootState) => state.productReducer.getCategoriesError);

  const formik = useFormik({
    initialValues: {
      description: '',
      discount: '',
      category: '',
      expiresIn: '',
      public: false,
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required('Bạn phải nhập mục này'),
      discount: Yup.number().required('Bạn phải nhập mục này'),
      category: Yup.string(),
      expiresIn: Yup.string().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (submitObject) => {
      const cleanSubmitObject = removeNull(submitObject);
      axios
        .post('/voucher', cleanSubmitObject)
        .then((response) => {
          if (response.data.statusCode === 201) {
            message.success('Tạo voucher thành công');
          }
          dispatch(getVouchers());
          handleChangeView();
        })
        .catch((error) => {
          console.log(error.response.data);
          message.error('Tạo voucher thất bại');
        });
    },
  });

  const handleSelectChange = (value: string): void => {
    formik.values.category = value;
  };

  const handleDatePickerChange = (value: any): void => {
    const date = new Date(value._d);
    formik.values.expiresIn = date.toString();
  };

  const handleSwitchChange = (value: boolean): void => {
    formik.values.public = value;
  };

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  React.useEffect(() => {
    if (getCategoriesError) {
      message.error('Lấy phân loại thất bại');
    }
  }, [getCategoriesError]);

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Tạo sản phẩm</div>
      <form onSubmit={formik.handleSubmit} className="form md:pr-10">
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Mô tả</div>
        <Textarea
          name="description"
          placeholder="Mô tả voucher"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.errors.description && formik.touched.description ? formik.errors.description : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Giảm giá</div>
        <Input
          type="text"
          name="discount"
          placeholder="Giảm giá (%)"
          onChange={formik.handleChange}
          value={formik.values.discount}
          error={formik.errors.discount && formik.touched.discount ? formik.errors.discount : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Phân loại</div>
        <Select defaultValue="" onChange={handleSelectChange}>
          <Option value="">Tất cả</Option>
          {categories &&
            categories.map((category, i) => (
              <Option value={category._id} key={i}>
                {category.name}
              </Option>
            ))}
        </Select>
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Ngày hết hạn</div>
        <DatePicker onChange={handleDatePickerChange} placeholder="Chọn ngày" />
        <p className="relative text-xs text-red-600">
          {formik.errors.expiresIn && formik.touched.expiresIn && formik.errors.expiresIn}
        </p>
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Public</div>
        <Switch onChange={handleSwitchChange} />
        <div className="submit_buttons pt-5 flex justify-center items-center">
          <CancelButton className="mx-2" onClick={handleChangeView}>
            Hủy
          </CancelButton>
          <Button type="submit" className="mx-2">
            Tạo voucher
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;

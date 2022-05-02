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
import { message, Select, DatePicker, Switch, Skeleton } from 'antd';
import { IEditVoucher } from 'types';
import { getVouchers } from 'actions/voucher.action';
import moment from 'moment';
import axios from 'services/axios.service';

const { Option } = Select;

const CreateProduct = ({ handleChangeView, voucherId }: IEditVoucher): React.ReactElement => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.productReducer.categories);
  const getCategoriesError = useSelector((state: RootState) => state.productReducer.getCategoriesError);
  const [isLoading, setLoading] = React.useState(true);

  const formik = useFormik({
    initialValues: {
      code: '',
      description: '',
      discount: '',
      category: '',
      expiresIn: '',
      public: false,
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().required('Bạn phải nhập mục này'),
      description: Yup.string().required('Bạn phải nhập mục này'),
      discount: Yup.number().required('Bạn phải nhập mục này'),
      category: Yup.string(),
      expiresIn: Yup.string().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (submitObject) => {
      const cleanSubmitObject = removeNull(submitObject);
      axios
        .patch(`/voucher/${voucherId}`, cleanSubmitObject)
        .then((response) => {
          if (response.data.statusCode === 200) {
            message.success('Sửa voucher thành công');
          }
          dispatch(getVouchers());
          handleChangeView();
        })
        .catch(() => {
          message.error('Sửa voucher thất bại');
        });
      console.log(cleanSubmitObject);
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

    axios
      .get(`/voucher/${voucherId}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          const voucher = response.data.voucher;
          formik.values.code = voucher.code;
          formik.values.description = voucher.description;
          formik.values.discount = voucher.discount;
          formik.values.category = voucher.category._id || '';
          formik.values.expiresIn = voucher.expiresIn;
          formik.values.public = voucher.public;
          setLoading(false);
        }
      })
      .catch(() => {
        message.error('Lấy thông tin voucher thất bại');
      });
  }, []);

  React.useEffect(() => {
    if (getCategoriesError) {
      message.error('Lấy phân loại thất bại');
    }
  }, [getCategoriesError]);

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Sửa voucher</div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <form onSubmit={formik.handleSubmit} className="form md:pr-10">
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Code</div>
          <Input
            type="text"
            name="code"
            placeholder="Mã giảm giá"
            onChange={formik.handleChange}
            value={formik.values.code}
            error={formik.errors.code && formik.touched.code ? formik.errors.code : false}
          />
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
          <Select defaultValue={formik.values.category} onChange={handleSelectChange} style={{ width: 120 }}>
            <Option value="">Tất cả</Option>
            {categories &&
              categories.map((category, i) => (
                <Option value={category._id} key={i}>
                  {category.name}
                </Option>
              ))}
          </Select>
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Ngày hết hạn</div>
          <DatePicker
            onChange={handleDatePickerChange}
            placeholder="Chọn ngày"
            defaultValue={moment(formik.values.expiresIn)}
          />
          <p className="relative text-xs text-red-600">
            {formik.errors.expiresIn && formik.touched.expiresIn && formik.errors.expiresIn}
          </p>
          <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Public</div>
          <Switch onChange={handleSwitchChange} defaultChecked={formik.values.public ? true : false} />
          <div className="submit_buttons pt-5 flex justify-center items-center">
            <CancelButton className="mx-2" onClick={handleChangeView}>
              Hủy
            </CancelButton>
            <Button type="submit" className="mx-2">
              Sửa voucher
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;

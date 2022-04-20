import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea } from 'components/Form';
import { AutoComplete } from 'components/Form';
import { RootState } from 'reducers/index.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from 'actions/product.action';
import CloseIcon from 'assets/icons/close-svgrepo-com.svg';
import PlusIcon from 'assets/icons/plus-svgrepo-com.svg';
import { UploadImage } from 'components/Form';
import AvailableModal from 'components/AvailableModal';
import Button from 'components/Button';
import CancelButton from 'components/CancelButton';
import { removeNull } from 'services/common.service';
import { message } from 'antd';
import { createProduct, getProducts } from 'actions/product.action';
import { ICreateProduct } from 'types';

const CreateProduct = ({ handleChangeView }: ICreateProduct): React.ReactElement => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const [availableList, setAvailableList] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const categories = useSelector((state: RootState) => state.productReducer.categories);
  const getCategoriesError = useSelector((state: RootState) => state.productReducer.getCategoriesError);
  const createProductSuccess = useSelector((state: RootState) => state.productReducer.createProductSuccess);
  const createProductError = useSelector((state: RootState) => state.productReducer.createProductError);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      pictures: [],
      available: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Bạn phải nhập mục này'),
      description: Yup.string().required('Bạn phải nhập mục này'),
      category: Yup.string().required('Bạn phải nhập mục này'),
      pictures: Yup.array().min(1, 'Bạn phải nhập mục này'),
      available: Yup.array().min(1, 'Bạn phải nhập mục này'),
      price: Yup.number().required('Bạn phải nhập mục này'),
    }),
    onSubmit: (submitObject) => {
      const cleanSubmitObject = removeNull(submitObject);
      dispatch(createProduct(cleanSubmitObject));
    },
  });

  const hanldeUploadPicuturesSuccess = (imageList: Array<string>) => {
    formik.values.pictures = imageList;
  };

  const handleAutoCompleteChange = (value: string): void => {
    formik.values.category = value;
  };
  const handleRemoveAvailabe = (size: string): void => {
    setAvailableList((preState) => preState.filter((available) => available.size !== size));
  };

  const openAvailableModal = (): void => {
    setIsModalVisible(true);
  };

  const handleModalOk = ({ size, color, quantity }: { size: string; color?: string; quantity: string }): void => {
    setIsModalVisible(false);

    setAvailableList((preState) => [...preState, { size, color, quantity }]);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
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

  React.useEffect(() => {
    formik.values.available = availableList;
  }, [availableList]);

  React.useEffect(() => {
    if (getCategoriesError) {
      message.error('Lấy phân loại thất bại');
    }
  }, [getCategoriesError]);

  React.useEffect(() => {
    if (createProductSuccess) {
      message.success('Tạo sản phẩm thành công');
      dispatch(getProducts());
      handleChangeView();
    }
  }, [createProductSuccess]);

  React.useEffect(() => {
    if (createProductError && createProductError.includes('name')) {
      message.error('Tên sản phẩm bị trùng');
    } else if (createProductError) {
      message.error(createProductError);
    }
  }, [createProductError]);

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="title md:pt-20 mb-10 text-center font-bold text-2xl">Tạo sản phẩm</div>
      <form onSubmit={formik.handleSubmit} className="form md:pr-10">
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
        <UploadImage
          accept="image/png, image/jpeg, image/jpg"
          error={formik.errors.pictures && formik.touched.pictures ? formik.errors.pictures : false}
          handleUploadSuccess={hanldeUploadPicuturesSuccess}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Giá</div>
        <Input
          type="text"
          name="price"
          placeholder="Giá sản phẩm"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price && formik.touched.price ? formik.errors.price : false}
        />
        <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Chủng loại</div>
        <div className="add_available flex ml-3 cursor-pointer text-blue" onClick={openAvailableModal}>
          <div className="plus w-4 mr-1">
            <img src={PlusIcon} alt="plus" />
          </div>
          <div className="text">Thêm chủng loại</div>
        </div>
        <AvailableModal
          isModalVisible={isModalVisible}
          handleModalOk={handleModalOk}
          handleCancelModal={handleCancelModal}
        />
        <p className="relative text-xs text-red-600">
          {formik.errors.available && formik.touched.available && formik.errors.available}
        </p>
        <div className="available_list flex justify-start flex-wrap">
          {availableList.map((available, i) => (
            <div key={i} className="available_wrapper m-1 p-3 relative">
              <img
                src={CloseIcon}
                alt="close-icon"
                className="absolute right-0 top-0 w-4 cursor-pointer"
                onClick={() => handleRemoveAvailabe(available.size)}
              />
              <div className="size text-sm">Size: {available.size}</div>
              {available.color && <div className="color text-sm">Màu: {available.color}</div>}
              <div className="quantity text-sm">Số lượng: {available.quantity}</div>
            </div>
          ))}
        </div>
        <div className="submit_buttons pt-5 flex justify-center items-center">
          <CancelButton className="mx-2" onClick={handleChangeView}>
            Hủy
          </CancelButton>
          <Button type="submit" className="mx-2">
            Tạo sản phẩm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;

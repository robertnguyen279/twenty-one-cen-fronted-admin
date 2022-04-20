import React from 'react';
import { Modal } from 'antd';
import { IAvailableModal } from 'types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select } from 'antd';
import { Input } from 'components/Form';
const { Option } = Select;

const AvailableModal = ({ isModalVisible, handleModalOk, handleCancelModal }: IAvailableModal): React.ReactElement => {
  const formik = useFormik({
    initialValues: {
      size: 'M',
      color: '',
      quantity: '',
    },
    validationSchema: Yup.object().shape({
      size: Yup.string().required('Bạn phải nhập mục này'),
      quantity: Yup.number().required('Bạn phải nhập mục này'),
    }),
    onSubmit: ({ size, color, quantity }, { resetForm }) => {
      handleModalOk({ size, color, quantity });
      resetForm();
    },
  });

  const handleSizeChange = (value: string): void => {
    formik.values.size = value;
  };

  const handleSubmitForm = () => {
    formik.submitForm();
  };

  return (
    <Modal title="Thêm chủng loại" visible={isModalVisible} onOk={handleSubmitForm} onCancel={handleCancelModal}>
      <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Size</div>
      <Select defaultValue={formik.values.size} style={{ width: 120 }} onChange={handleSizeChange}>
        <Option value="XS">XS</Option>
        <Option value="S">S</Option>
        <Option value="M">M</Option>
        <Option value="L">L</Option>
        <Option value="XL">XL</Option>
      </Select>
      <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Màu</div>
      <Input
        type="text"
        name="color"
        placeholder="Màu (không bắt buộc)"
        onChange={formik.handleChange}
        value={formik.values.color}
        error={formik.errors.color && formik.touched.color ? formik.errors.color : false}
      />
      <div className="form_title pt-3 text-sm pb-2 text-left font-normal pl-2">Số lượng</div>
      <Input
        type="text"
        name="quantity"
        placeholder="Số lượng"
        onChange={formik.handleChange}
        value={formik.values.quantity}
        error={formik.errors.quantity && formik.touched.quantity ? formik.errors.quantity : false}
      />
    </Modal>
  );
};

export default AvailableModal;

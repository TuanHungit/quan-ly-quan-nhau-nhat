import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CContainer,
  CRow,
  CCol,
  CSelect,
  CImg,
} from "@coreui/react";

import alertify from "alertifyjs";
import { deleteLoaiMonAn } from "src/api/LoaiMonAnApi";

const DeleteLoaiMonAn = (props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const item = props.itemDeleted;
    try {
      await deleteLoaiMonAn(item);
      props.toggleModal();
      props.deleteSuccess();
      alertify.success("Xóa loại món ăn thành công");
    } catch (err) {
      alertify.error("Lỗi nghen");
    }
  };

  return (
    <CModal show={props.modal} onClose={props.toggleModal}>
      <CModalHeader closeButton>
        <h3 className="delete_header">Xóa loại món ăn</h3>
      </CModalHeader>
      <form onSubmit={onSubmit}>
        <CModalBody>
          <h3>Bạn có chắn chắn muốn xóa this loại món ăn?</h3>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" type="submit">
            Xóa
          </CButton>
          <CButton color="secondary" onClick={props.toggleModal}>
            Bỏ qua
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default DeleteLoaiMonAn;

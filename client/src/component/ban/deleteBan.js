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
import { deleteBan } from "src/api/BanApi";

const DeleteBan = (props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const item = props.itemDeleted;
    try {
      await deleteBan(item);
      props.toggleModal();
      props.deleteSuccess();
      alertify.success("Xóa bàn thành công");
    } catch (err) {
      alertify.error("Lỗi nghen");
    }
  };

  return (
    <CModal show={props.modal} onClose={props.toggleModal}>
      <CModalHeader closeButton>
        <h3 className="delete_header">Xóa bàn</h3>
      </CModalHeader>
      <form onSubmit={onSubmit}>
        <CModalBody>
          <h3>Bạn có chắn chắn muốn xóa this bàn?</h3>
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

export default DeleteBan;

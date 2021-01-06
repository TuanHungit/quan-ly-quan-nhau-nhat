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
import { createOneBan } from "../../api/BanApi";

import alertify from "alertifyjs";

const CreateBan = (props) => {
  const [b_stt, setStt] = useState();
  const [b_soghe, setSoGhe] = useState();
  const [b_trangthai, setTrangThai] = useState(1);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [collapse, setCollapse] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      b_stt,
      b_soghe,
      b_trangthai,
    };
    console.log(data);
    try {
      await createOneBan(data);
      props.toggleModal();
      props.createSuccess();
      alertify.success("Thêm bàn thành công");
    } catch (err) {
      alertify.error("Lỗi nghen");
    }
  };

  return (
    <CModal show={props.modal} onClose={props.toggleModal}>
      <CModalHeader closeButton>
        <h3>Thêm mới bàn</h3>
      </CModalHeader>
      <form onSubmit={onSubmit}>
        <CModalBody>
          <CContainer className="create-Ban-content">
            <CRow className="field">
              <CCol lg="10">
                <CRow>
                  <CCol lg="5" className="pt-2">
                    Số thứ tự bàn
                  </CCol>
                  <CCol>
                    <input
                      type="number"
                      placeholder="Nhập số thứ tự"
                      className="inp"
                      onChange={(e) => {
                        setStt(e.target.value);
                      }}
                      style={{ width: "100%" }}
                      required
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="field">
              <CCol lg="10">
                <CRow>
                  <CCol lg="5" className="pt-2">
                    Số ghế
                  </CCol>
                  <CCol>
                    <input
                      type="number"
                      placeholder="Nhập số ghế"
                      className="inp"
                      onChange={(e) => {
                        setSoGhe(e.target.value);
                      }}
                      style={{ width: "100%" }}
                      required
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="field">
              <CCol lg="10">
                <CRow>
                  <CCol lg="5" className="pt-2">
                    Trạng thái
                  </CCol>
                  <CCol>
                    <input
                      type="text"
                      placeholder="Nhập trạng thái"
                      className="inp"
                      value={b_trangthai}
                      onChange={(e) => {
                        setTrangThai(e.target.value);
                      }}
                      style={{ width: "100%" }}
                      required
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" type="submit">
            Thêm mới
          </CButton>
          <CButton color="secondary" onClick={props.toggleModal}>
            Bỏ qua
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default CreateBan;

import React, { lazy, useEffect, useState } from "react";

//import QuillEditor from "../editor/quillEditor";
//import { createPromotion } from "../../api/promotionApi";
import alertify from "alertifyjs";
import {  editLoaiMonAn } from "../api/LoaiMonAnApi";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";

function EditLoaiMon(props) {
  const [files, setFiles] = useState(null);
  const [lma_id, setLma_id] = useState(props.list.lma_id);
  const [lma_ten, setLma_ten] = useState(props.list.lma_ten);

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      lma_id,
      lma_ten,
    };
    try {
      await editLoaiMonAn(data);
      props.toggleModal();
      props.createSuccess();
      alertify.success("Cập nhật loại món ăn thành công");
    } catch (err) {
      alertify.error("Có lỗi rồi");
    }
  };
  return (
    <>
      <CModal show={props.modal} onClose={props.toggleModal} size="xl">
        <CModalHeader closeButton>
          {" "}
          <h3>Cập nhập loại món ăn</h3>
        </CModalHeader>
        <form onSubmit={onSubmit}>
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="4" className="pt-2">
                      Id
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="number"
                        className="inp"
                        value={lma_id}
                        onChange={(e) => {
                          setLma_id(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="4" className="pt-2">
                      Tên loại
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="text"
                        placeholder="Tên loại món ăn"
                        className="inp"
                        value={lma_ten}
                        onChange={(e) => {
                          setLma_ten(e.target.value);
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
              Cập nhật
            </CButton>{" "}
            <CButton color="secondary" onClick={props.toggleModal}>
              Bỏ qua
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}
export default EditLoaiMon;

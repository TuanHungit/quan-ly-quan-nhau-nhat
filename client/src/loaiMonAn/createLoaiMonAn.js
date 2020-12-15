import React, { lazy, useEffect, useState } from "react";

//import QuillEditor from "../editor/quillEditor";
//import { createPromotion } from "../../api/promotionApi";
import alertify from "alertifyjs";
import { createOneLoaiMonAn } from "../api/LoaiMonAnApi";

import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CContainer,
  CRow,
  CCol,
  CImg,
  CTooltip,
  input,
  CSelect,
  CAlert,
} from "@coreui/react";

function CreateLoaiMon(props) {
  const [files, setFiles] = useState(null);
  const [lma_ten, setLma_ten] = useState("");
 

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      lma_ten,
    };
    try {
      await createOneLoaiMonAn(data);
      props.toggleModal();
      props.createSuccess();
      alertify.success("Thêm loại món ăn thành công");
    } catch (err) {
      alertify.error("Có lỗi rồi");
    }
  };
  return (
    <>
      <CModal show={props.modal} onClose={props.toggleModal} size="l">
        <CModalHeader closeButton>
          {" "}
          <h3>Thêm mới loại món ăn</h3>
        </CModalHeader>
        <form onSubmit={onSubmit}>
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="4" className="pt-2">
                     Tên loại
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="text"
                        placeholder="Nhập tên loại món ăn"
                        className="inp"
                        onChange={(e) => {
                          setLma_ten(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                   </CCol>
                {/* <CCol lg="6" className="pt-2">
                  <QuillEditor
                    title="Mô tả về khuyến mãi"
                    key={"toolbar5"}
                    placeholder={"Nhập mô tả về khuyến mãi"}
                    onEditorChange={(value) => setDescription(value)}
                    id={"toolbar5"}
                    onFilesChange={(files) => setFiles(files)}
                  />
                </CCol> */}
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" type="submit">
              Thêm mới
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
export default CreateLoaiMon;

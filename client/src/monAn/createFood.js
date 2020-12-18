import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CContainer,
  CRow,
  CCol,
  CImg,
} from "@coreui/react";
import { createOneMonAn} from '../api/MonAnApi';
import { getAllLoaiMonAn } from '../api/LoaiMonAnApi';

import alertify from "alertifyjs";

const CreateFood = (props) => {
  const [ma_donvitinh, setDvt] = useState();
  const [ma_giaban, setGiaBan] = useState();
  const [ma_giavon, setGiaVon] = useState();
  const [ma_motachitiet, setMoTaChiTiet] = useState();
  const [ma_ten, setTen] = useState();
  const [ma_hinhanh, setHinhAnh] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ma_ten, ma_giaban, ma_giavon, ma_donvitinh, ma_hinhanh, ma_motachitiet 
    }
    console.log(data)
    try {
      await createOneMonAn(data);
      props.toggleModal();
      props.createSuccess();
      alertify.success("Thêm món ăn thành công");
    } catch (err) {
      alertify.error("Lỗi nghen");
    }  }

  return (
    <div className='create-food'>
      <CModal show={props.modal} onClose={props.toggleModal}>
        <CModalHeader closeButton>
          <h3>Thêm mới món sản phẩm</h3>
        </CModalHeader>
        <form onSubmit={onSubmit}>
          <CModalBody>
            <CContainer className="create-food-content">
              <CRow className="field">
                <CCol lg="10">
                  <CRow>
                    <CCol lg="5" className="pt-2">
                      Tên món ăn
                    </CCol>
                    <CCol>
                      <input
                        type="text"
                        placeholder="Nhập tên thức ăn"
                        className="inp"
                        onChange={(e) => {
                          setTen(e.target.value);
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
                      Giá vốn
                    </CCol>
                    <CCol>
                      <input
                        type="text"
                        placeholder="Nhập giá vốn"
                        className="inp"
                        onChange={(e) => {
                          setGiaVon(e.target.value);
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
                      Giá bán
                    </CCol>
                    <CCol>
                      <input
                        type="text"
                        placeholder="Nhập giá bán"
                        className="inp"
                        onChange={(e) => {
                          setGiaBan(e.target.value);
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
                      Loai thuc an
                    </CCol>
                    <CCol>
                      <input
                        type="text"
                        placeholder="Nhập đơn vị tính"
                        className="inp"
                        onChange={(e) => {
                          setDvt(e.target.value);
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
                      Đơn vị tính
                    </CCol>
                    <CCol>
                      <input
                        type="text"
                        placeholder="Nhập đơn vị tính"
                        className="inp"
                        onChange={(e) => {
                          setDvt(e.target.value);
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
                      Mô tả chi tiết
                    </CCol>
                    <CCol>
                      <input
                        type="text"
                        placeholder="Mô tả chi tiết món ăn"
                        className="inp"
                        onChange={(e) => {
                          setMoTaChiTiet(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className="field">
                <CCol className="pt-3">
                  <img src={'food-1.jpg'} className="c-avatar-img" alt="chicken nướng lu" />
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
    </div>
  );
};

export default CreateFood;

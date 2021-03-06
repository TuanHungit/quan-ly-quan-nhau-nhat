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
  CLabel,
  CInputFile,
} from "@coreui/react";
import { createOneMonAn } from "../../api/MonAnApi";
import { getAllLoaiMonAn } from "../../api/LoaiMonAnApi";

import alertify from "alertifyjs";

const CreateFood = (props) => {
  const [ma_donvitinh, setDvt] = useState();
  const [ma_giaban, setGiaBan] = useState();
  const [ma_giavon, setGiaVon] = useState();
  const [ma_motachitiet, setMoTaChiTiet] = useState();
  const [ma_ten, setTen] = useState();
  const [ma_hinhanh, setHinhAnh] = useState();
  const [loaiMonAnList, setLoaiMonAnList] = useState();
  const [ma_lmaid, setLoaiMonAn] = useState();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [collapse, setCollapse] = useState(false);

   const handleChange = (e) => {
    setHinhAnh((e.target.files[0]));
    
   };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ma_ten,
      ma_giaban,
      ma_giavon,
      ma_donvitinh,
      ma_hinhanh,
      ma_motachitiet,
      ma_lmaid,
    };
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("ma_ten", ma_ten);
      formData.append("ma_giaban", ma_giaban);
      formData.append("ma_giavon", ma_giavon);
      formData.append("ma_donvitinh", ma_donvitinh);
      formData.append("ma_hinhanh", ma_hinhanh);
      formData.append("ma_motachitiet", ma_motachitiet);
      formData.append("ma_lmaid", ma_lmaid);

      await createOneMonAn(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      props.toggleModal();
      props.createSuccess();
      alertify.success("Thêm món ăn thành công");
    } catch (err) {
      alertify.error("Lỗi nghen");
    }
  };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLoaiMonAn();

        setLoaiMonAnList(response);
        setLoading(false);
      } catch (err) {
        setLoaiMonAnList(null);
        setLoading(true);
        console.log(err);
      }
    };
    fetchData();
  }, [success]);
  return (
    <div className="create-food">
      <CModal show={props.modal} onClose={props.toggleModal}>
        <CModalHeader closeButton>
          <h3>Thêm mới món ăn</h3>
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
                        type="number"
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
                        type="number"
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
                      Loại món ăn
                    </CCol>
                    <CCol>
                      <CSelect
                        className="form-select"
                        onChange={(e) => {
                          setLoaiMonAn(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      >
                        <option selected>Chọn loại món ăn</option>
                        {loaiMonAnList
                          ? loaiMonAnList.map((el, key) => (
                              <option key={key} value={el.lma_id}>
                                {el.lma_ten}
                              </option>
                            ))
                          : null}
                      </CSelect>
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
                  <CLabel col md="3" htmlFor="file-input">
                    File input
                  </CLabel>
                  <CCol xs="12" md="9">
                    <input
                      type="file"
                      id="file-input"
                      name="file-input"
                      onChange={handleChange}
                    />
                  </CCol>
                  {/* <img
                    onChange={(e) => {
                      setHinhAnh(e.target.value);
                    }}
                    // value={"food-1.jpg"}
                    // src={"food-1.jpg"}
                    className="c-avatar-img"
                    // alt="chicken nướng lu"
                  /> */}
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

import React, { lazy, useEffect, useState } from "react";

//import QuillEditor from "../editor/quillEditor";
//import { createPromotion } from "../../api/promotionApi";
import alertify from "alertifyjs";
import { editMonAn } from "../api/MonAnApi";
import {getAllLoaiMonAn} from '../api/LoaiMonAnApi'
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
} from "@coreui/react";

function EditMonAn(props) {
  const [files, setFiles] = useState(null);
  const [ma_id, setMa_id] = useState(props.list.ma_id);
  const [ma_ten, setMa_ten] = useState(props.list.ma_ten);
  const [ma_donvitinh, setDvt] = useState(props.list.ma_donvitinh);
  const [ma_giaban, setGiaBan] = useState(props.list.ma_giaban);
  const [ma_giavon, setGiaVon] = useState(props.list.ma_giavon);
  const [ma_motachitiet, setMoTaChiTiet] = useState(props.list.ma_motachitiet);
  const [ma_hinhanh, setHinhAnh] = useState();
  const [ma_lmaid, setLoaiMonAn] = useState();
  const [loaiMonAnList, setLoaiMonAnList] = useState();
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLoaiMonAn();

        setLoaiMonAnList(response);
      } catch (err) {
        setLoaiMonAnList(null);
        console.log(err);
      }
    };
    fetchData();
  }, [success]);
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      ma_id,
      ma_ten,
      ma_giaban,
      ma_giavon,
      ma_donvitinh,
      ma_hinhanh,
      ma_motachitiet,
      ma_lmaid,
    };
    try {
      await editMonAn(data);
      props.toggleModal1();
      props.createSuccess();
      alertify.success("Cập nhật món ăn thành công");
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
                        value={ma_id}
                        onChange={(e) => {
                          setMa_id(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                        disabled
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="4" className="pt-2">
                      Tên món ăn
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="text"
                        placeholder="Tên món ăn"
                        className="inp"
                        value={ma_ten}
                        onChange={(e) => {
                          setMa_ten(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="4" className="pt-2">
                      Tên giá bán
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="text"     
                        className="inp"
                        value={ma_giaban}
                        onChange={(e) => {
                          setGiaBan(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="4" className="pt-2">
                      Tên giá vốn
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="text"
                        className="inp"
                        value={ma_giavon}
                        onChange={(e) => {
                          setGiaVon(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>{" "}
                </CCol>
                <CRow>
                  <CCol lg="4" className="pt-2">
                    Đơn vị tính
                  </CCol>
                  <CCol lg="8">
                    <input
                      type="text"
                      placeholder="Tên loại món ăn"
                      className="inp"
                      value={ma_donvitinh}
                      onChange={(e) => {
                        setDvt(e.target.value);
                      }}
                      style={{ width: "100%" }}
                      required
                    />
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
                          class="form-select"
                          onChange={(e) => {
                            setLoaiMonAn(e.target.value);
                          }}
                          style={{ width: "100%" }}
                          required
                        >
                          {/* <option selected>Chọn loại món ăn</option> */}
                          {loaiMonAnList
                            ? loaiMonAnList.map((el, key) => (
                                <option selected
                                  key={key}
                                  value={(el.lma_id, el.lma_ten)}
                                >
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
                          value={ma_motachitiet}
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
export default EditMonAn;

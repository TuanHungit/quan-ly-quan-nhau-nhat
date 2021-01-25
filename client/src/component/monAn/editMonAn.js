import React, { lazy, useEffect, useState } from "react";

//import QuillEditor from "../editor/quillEditor";
//import { createPromotion } from "../../api/promotionApi";
import alertify from "alertifyjs";
import { editMonAn } from "../../api/MonAnApi";
import { getAllLoaiMonAn } from "../../api/LoaiMonAnApi";
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
  const [ma_id, setId] = useState(props.listMon.ma_id);
  const [ma_ten, setTen] = useState(props.listMon.ma_ten);
  const [ma_donvitinh, setDvt] = useState(props.listMon.ma_donvitinh);
  const [ma_giaban, setGiaBan] = useState(props.listMon.ma_giaban);
  const [ma_giavon, setGiaVon] = useState(props.listMon.ma_giavon);
  const [ma_motachitiet, setMoTaChiTiet] = useState(props.listMon.ma_motachitiet);
  const [ma_hinhanh, setHinhAnh] = useState(props.listMon.ma_hinhanh);
  const [ma_lmaid, setLoaiMonAn] = useState(props.listMon.ma_lmaid);
  const [loaiMonAnList, setLoaiMonAnList] = useState();
  const [success, setSuccess] = useState(false);
  const [loaiMonAn, setNameLoaiMonAn] = useState("");
  console.log(props.loaiMonAn)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLoaiMonAn();
        setNameLoaiMonAn( response.filter(el => el.lma_id === props.loaiMonAn).lma_ten)
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
      // ma_lmaid,
    };
    try {
      await editMonAn(data);
      props.toggleModal();
      props.createSuccess();
      alertify.success("Cập nhật món ăn thành công");
    } catch (err) {
      alertify.error("Có lỗi rồi");
    }
  };
  return (
    <>
      <CModal show={props.modal} onClose={props.toggleModal} size="lg">
        <CModalHeader closeButton>
          {" "}
          <h3>Cập nhập món ăn</h3>
        </CModalHeader>
        <form onSubmit={onSubmit}>
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="5" className="pt-2">
                      Id món ăn
                    </CCol>
                    <CCol lg="7">
                      <input
                        type="number"
                        className="inp"
                        value={ma_id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                        disabled
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="5" className="pt-2">
                      Tên món ăn
                    </CCol>
                    <CCol lg="7">
                      <input
                        type="text"
                        placeholder="Tên món ăn"
                        className="inp"
                        value={ma_ten}
                        onChange={(e) => {
                          setTen(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="5" className="pt-2">
                      Tên giá bán
                    </CCol>
                    <CCol lg="7">
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
                    <CCol lg="5" className="pt-2">
                      Tên giá vốn
                    </CCol>
                    <CCol lg="7">
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
                  <CRow>
                    <CCol lg="5" className="pt-2">
                      Đơn vị tính
                    </CCol>
                    <CCol lg="7">
                      <input
                        type="text"
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
                </CCol>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="5" className="pt-2">
                      Mô tả chi tiết
                    </CCol>
                    <CCol lg="7">
                      <input
                        type="text"
                        className="inp"
                        value={ma_motachitiet}
                        onChange={(e) => {
                          setMoTaChiTiet(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                </CCol>
                {/* <CRow className="field">
                  <CCol lg="10">
                    <CRow>
                      <CCol lg="5" className="pt-2">
                        Loại món ăn
                      </CCol>
                      <CCol>
                        <CSelect
                          className="form-select"
                          value={ma_lmaid}
                          onChange={(e) => {
                            setLoaiMonAn(e.target.value);
                            setNameLoaiMonAn(e.target.value);
                          }}
                          style={{ width: "100%" }}
                          required
                        >
                          <option selected>Chọn loại món ăn</option>
                          {loaiMonAnList
                            ? loaiMonAnList.map((el, key) => (
                                <option
                                  selected
                                  key={key}
                                  value={(el.lma_id, el.lma_ten)}
                                >
                                  {loaiMonAn}
                                </option>
                              ))
                            : null}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow> */}
               

                <CRow className="field">
                  <CCol className="pt-3">
                    <img
                      value={ma_hinhanh}
                      onChange={(e) => {
                        setHinhAnh(e.target.value);
                      }}
                      src={`http://localhost:8080/image/${ma_hinhanh}`}
                      className="c-avatar-img"
                      alt="chicken nướng lu"
                    />
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

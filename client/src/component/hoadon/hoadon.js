import React, { useState, useEffect, lazy } from "react";
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CRow,
  CCollapse,
  CTabs,
  CTabPane,
  CTabContent,
  CCol,
  CImg,
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import alertify from "alertifyjs";
import { getHoaDons } from "src/api/HoaDonApi";

const fields = [
  { key: "hd_id", label: "STT", _style: { width: "10%" } },
  { key: "hd_tongtien", label: "Tổng tiền", _style: { width: "10%" } },
  {
    key: "hd_ngaythanhtoan",
    label: "Ngày thanh toán",
    _style: { width: "80%" },
  },
  { key: "hd_trangthai", label: "Trạng thái", _style: { width: "10%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

function HoaDon() {
  const [hoadonList, setHoaDonList] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHoaDons();
        setSuccess(false);
        setHoaDonList(response);
        setLoading(false);
      } catch (err) {
        setHoaDonList(null);
        setLoading(true);
        console.log(err);
      }
    };
    fetchData();
  }, [success]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">
          <CContainer className="container">
            <CRow className="d-flex justify-content-between">
              <h1>Danh sách hóa đơn</h1>
            </CRow>
          </CContainer>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={hoadonList}
            fields={fields}
            striped
            responsive
            loading={loading}
            tableFilter
            sorter
            hover
            itemsPerPage={5}
            itemsPerPageSelect
            hover
            sorter
            tableFilter
            pagination
            scopedSlots={{
              index: (item) => <td>{item.hd_id}</td>,
              name: (item) => (
                <td>
                  <CBadge color={getBadge(item.hd_id)}>{item.hd_id}</CBadge>
                </td>
              ),
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      {details.includes(index) ? "Ẩn" : "Hiển thị"}
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CTabs activeTab="info" active>
                        <CTabContent style={{ marginTop: "20px" }}>
                          <CTabPane data-tab="info">
                            <CContainer>
                              <CRow>
                                <CCol lg="3">
                                  <label>Bàn</label>
                                  <h6>{item.ban.b_stt}</h6>
                                </CCol>
                                <CCol lg="3">
                                  <label>Nhân viên</label>
                                  <h6>{item.hd_nhanvien.nv_hoten}</h6>
                                </CCol>
                              </CRow>
                            </CContainer>
                          </CTabPane>
                        </CTabContent>
                      </CTabs>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default HoaDon;

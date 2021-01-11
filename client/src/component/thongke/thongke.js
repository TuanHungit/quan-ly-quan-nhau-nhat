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
import { getThongKe } from "src/api/HoaDonApi";

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

function ThongKe() {
  const [ThongKeList, setThongKeList] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fromDate, setDate] = useState();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await getThongKe();
  //         console.log(response);
  //         setSuccess(false);
  //         setThongKeList(response);
  //         setLoading(false);
  //       } catch (err) {
  //         setThongKeList(null);
  //         setLoading(true);
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, [success]);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      fromDate,
    };
    try {
      const response = await getThongKe(fromDate);
    } catch (err) {
      alertify.error("Có lỗi rồi");
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">
          <CContainer className="container">
            <CRow className="d-flex justify-content-between">
              <h1>Thống kê hóa đơn</h1>
            </CRow>
          </CContainer>
        </CCardHeader>
        <form onSubmit={onSubmit}>
          <CCardBody>
              <CCol md="9">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio1"
                  name="radios"
                  value="option1"
                />
                <label variant="checkbox" htmlFor="radio1" className="mr-5">
                  Theo ngày
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  id="radio2"
                  name="radios"
                  value="option2"
                />
                <label variant="checkbox" htmlFor="radio2">
                  Theo tháng
                </label>
              </CCol>
              <CCol md="3">
                <label htmlFor="date-input">Chọn thời gian</label>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </CCol>
              <CButton color="primary" type="submit">
                Tìm kiếm
              </CButton>
            <CDataTable
              items={ThongKeList}
              fields={fields}
              striped
              responsive
              loading={loading}
              sorter
              hover
              itemsPerPage={5}
              itemsPerPageSelect
              hover
              sorter
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
        </form>
      </CCard>
    </>
  );
}

export default ThongKe;

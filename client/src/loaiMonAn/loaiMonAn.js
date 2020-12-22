import React, { useState, useEffect, lazy } from "react";
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
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
import CreateLoaiMon from "./createLoaiMonAn";
import Icon from "@mdi/react";
import { mdiViewGridPlus } from "@mdi/js";
import { getAllLoaiMonAn } from "../api/LoaiMonAnApi";
const fields = [
  { key: "lma_id", label: "STT", _style: { width: "10%" } },
  { key: "lma_ten", label: "Tên", _style: { width: "80%" } },
  {
    key: "show_details",label: "",_style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  { key: "action", label: "ACTION", _style: { width: "10%" } },
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

function LoaiMonAn() {
  const [loaiMonAnList, setLoaiMonAnList] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);

  const createSuccess = () => {
    setSuccess(!success);
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
 
  const toggleModal = () => {
    setModal(!modal);
  };
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
              <h1>Danh sách loại món ăn</h1>
              <div className="card-header-actions">
                <CButton
                  onClick={toggleModal}
                  block
                  variant="outline"
                  color="primary"
                  size="sm"
                  className="users-title-btn-add"
                >
                  <Icon
                    path={mdiViewGridPlus}
                    size={1}
                    title="Create Admin"
                    className="mr-1"
                  />
                  Thêm loại món ăn.
                </CButton>
              </div>
            </CRow>
          </CContainer>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={loaiMonAnList}
            fields={fields}
            striped
            itemsPerPage={5}
            pagination
            scopedSlots={{
              index: (item) => <td>{item.lma_id}</td>,
              name: (item) => (
                <td>
                  <CBadge color={getBadge(item.lma_ten)}>{item.lma_ten}</CBadge>
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
              
              action: () => (
                <td style={{ display: "flex", justifyContent: "start" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      justifyContent: "space-between",
                    }}
                  >
                    <CLink className="c-subheader-nav-link" href="#">
                      <CIcon name="cil-pencil" alt="Edit" />
                      {/* &nbsp;Edit */}
                    </CLink>
                    <CLink className="c-subheader-nav-link" href="#">
                      <CIcon 
                        style={{ color: "red" }}
                        name="cil-trash"
                        alt="Delete"
                      />
                      {/* &nbsp;Edit */}
                    </CLink>
                  </div>
                </td>
              ),
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
                                  <h6>{item.ma_ten}</h6>
                                  <CImg
                                    // src={`http://${item.ma_hinhanh}`}
                                    src={`https://www.pexels.com/vi-vn/anh/mon-an-dia-rau-xa-lach-kh-e-m-nh-1095550/`}
                                      alt="img"
                                    alt="Image"
                                    width="250px"
                                    height="200px"
                                  />
                                </CCol>
                                <CCol lg="9">
                        
                                  <CRow>
                                    <CCol lg="2">Mô tả tóm tắt:</CCol>
                                    <CCol lg="10">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.ma_motachitiet,
                                        }}
                                      />
                                    </CCol>
                                  </CRow>
                                </CCol>
                              </CRow>
                            </CContainer>
                          </CTabPane>
                        </CTabContent>
                      </CTabs>
                      <CButton size="sm" color="info">
                        Cập nhật
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1">
                        Xóa
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CCardBody>
        <CreateLoaiMon
          modal={modal}
          toggleModal={toggleModal}
          createSuccess={createSuccess}
        />
      </CCard>
    </>
  );
}

export default LoaiMonAn;

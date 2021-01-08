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
import {
  getAllLoaiMonAn,
  deleteLoaiMonAn,
} from "../../api/LoaiMonAnApi";
import EditLoaiMon from "./editLoaiMonAn";
import alertify from "alertifyjs";
import DeleteLoaiMonAn from "./deleteLoaiMonAn";

const fields = [
  { key: "lma_id", label: "STT", _style: { width: "10%" } },
  { key: "lma_ten", label: "Tên", _style: { width: "80%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "10%" },
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
  const [modal1, setModal1] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [delItem, setItem] = useState();

  const actionSuccess = () => {
    setSuccess(!success);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLoaiMonAn();
        setSuccess(false);
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

  const handleDelete = (item) => {
    deleteLoaiMonAn(item);
    setSuccess(!success);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal1 = () => {
    setModal1(!modal1);
  };
    const toggleModalDelete = (item) => {
      setItem(item);
      setModalDel(!modalDel);
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
              action: (item) => (
                <td style={{ display: "flex", justifyContent: "start" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      className="c-subheader-nav-link"
                      onClick={(e) => toggleModalDelete(item)}
                    >
                      <CIcon
                        style={{ color: "red" }}
                        name="cil-trash"
                        alt="Delete"
                      />
                    </span>
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
                                  <label>Tên loại món ăn</label>
                                  <h6>{item.lma_ten}</h6>
                                </CCol>
                              </CRow>
                              <EditLoaiMon
                                modal={modal1}
                                list={item}
                                toggleModal={toggleModal1}
                                createSuccess={actionSuccess}
                              />
                            </CContainer>
                          </CTabPane>
                        </CTabContent>
                      </CTabs>

                      <CButton size="sm" color="info" onClick={toggleModal1}>
                        Cập nhật
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
          createSuccess={actionSuccess}
        />
        <DeleteLoaiMonAn
          modal={modalDel}
          toggleModal={toggleModalDelete}
          deleteSuccess={actionSuccess}
          itemDeleted={delItem}
        />
      </CCard>
    </>
  );
}

export default LoaiMonAn;

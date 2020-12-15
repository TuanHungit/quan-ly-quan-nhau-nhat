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
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CreateLoaiMon from "./createLoaiMonAn";
import Icon from "@mdi/react";
import { mdiViewGridPlus } from "@mdi/js";
import { getAllLoaiMonAn } from "../api/LoaiMonAnApi";
// import DestinationCreate from './createDestination'
// import { getAllDestinations } from "../../api/destinationApi";
const fields = [
  { key: "lma_id", label: "STT", _style: { width: "10%" } },
  { key: "lma_ten", label: "Tên", _style: { width: "80%" } },

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

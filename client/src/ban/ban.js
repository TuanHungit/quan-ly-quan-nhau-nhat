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
import Icon from "@mdi/react";
import { mdiViewGridPlus } from "@mdi/js";
// import DestinationCreate from './createDestination'
// import { getAllDestinations } from "../../api/destinationApi";
const fields = [
  { key: "ban_id", label: "STT", _style: { width: "20%" } },
  { key: "ban_stt", label: "Số bàn", _style: { width: "20%" } },
  { key: "ban_soghe", label: "Số ghế", _style: { width: "20%" } },
  { key: "ban_trangthai", label: "Trạng thái", _style: { width: "30%" } },
  { key: "action", label: "ACTION", _style: { width: "10%" } },
];
const banlist = [
  { ban_id: "1", ban_stt: "001", ban_soghe: "4", ban_trangthai: "Inactive" },
  { ban_id: "2", ban_stt: "002", ban_soghe: "10", ban_trangthai: "Active" },
  { ban_id: "3", ban_stt: "003", ban_soghe: "4", ban_trangthai: "Order" },
];
const getBadge = (status) => {
  switch (status) {
    case "Inactive":
      return { backgroundColor: "success" };
    case "Active":
      return "primary";
    case "Order":
      return "danger";
    default:
      return "primary";
  }
};
function LoaiMonAn() {
  const [destinationsList, setDestinationsList] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);

  const createSuccess = () => {
    setSuccess(!success);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllDestinations();

  //       setDestinationsList(response);
  //       setLoading(false);
  //     } catch (err) {
  //       setDestinationsList(null);
  //       setLoading(true);
  //       console.log(err);
  //     }
  //   };
  //    fetchData();
  // }, [success]);

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
                  Thêm bàn.
                </CButton>
              </div>
            </CRow>
          </CContainer>
        </CCardHeader>

        <CCardBody>
          <CDataTable
            items={banlist}
            fields={fields}
            striped
            itemsPerPage={5}
            pagination
            scopedSlots={{
              index: (item) => <td>{item.id}</td>,
              soban: (item) => (
                <td>
                  <CBadge color={getBadge(item.ban_stt)}>{item.ban_stt}</CBadge>
                </td>
              ),
              soghe: (item) => (
                <td>
                  <CBadge color={getBadge(item.ban_soghe)}>
                    {item.ban_soghe}
                  </CBadge>
                </td>
              ),
              trangthai: (item) => (
                <td>
                  <CBadge color={getBadge(item.ban_trangthai)}>
                    {item.ban_trangthai}
                  </CBadge>
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
      </CCard>
    </>
  );
}

export default LoaiMonAn;

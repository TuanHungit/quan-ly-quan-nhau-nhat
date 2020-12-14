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
import "./style.css";
import CIcon from "@coreui/icons-react";
// import DestinationCreate from './createDestination'
// import { getAllDestinations } from "../../api/destinationApi";
const fields = [
  { key: "id", label: "STT", _style: { width: "10%" } },
  { key: "name", label: "Tên", _style: { width: "15%" } },
  { key: "summary", label: "Giá bán", _style: { width: "10%" } },
  { key: "destination", label: "Giá vốn", _style: { width: "10%" } },
  { key: "numOfTour", label: "Hình ảnh", _style: { width: "20%" } },
  { key: "numOfTour", label: "Mô tả", _style: { width: "20%" } },

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
function MonAn() {
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
          <CContainer>
            <CRow className="d-flex justify-content-between">
              <h1>Danh sách món ăn</h1>
              <CButton size="sm" color="info" onClick={toggleModal}>
                + Thêm mới
              </CButton>
            </CRow>
          </CContainer>
        </CCardHeader>
      
        <CCardBody>
          <CDataTable
            // items={destinationsList}
            fields={fields}
            striped
            itemsPerPage={5}
            pagination
            scopedSlots={{
              index: (item) => <td>{item.id}</td>,
              name: (item) => (
                <td>
                  <CBadge color={getBadge(item.name)}>{item.name}</CBadge>
                </td>
              ),
              destination: (item) => (
                <td>
                  {item.destination.map((el, key) => (
                    <tr key={key}>
                      <CBadge>{el.country}</CBadge>
                    </tr>

                    // <CBadge key={key} color={getBadge(item.destination.country)}>{item.destination.country}</CBadge>
                  ))}
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
        {/* <DestinationCreate
          modal={modal}
          toggleModal={toggleModal}
          createSuccess={createSuccess}
        /> */}
      </CCard>
    </>
  );
}

export default MonAn;

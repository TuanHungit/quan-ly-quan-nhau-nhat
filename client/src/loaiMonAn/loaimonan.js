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
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';

// import DestinationCreate from './createDestination'
// import { getAllDestinations } from "../../api/destinationApi";
const fields = [
  { key: "id", label: "STT", _style: { width: "10%" } },
  { key: "lma_ten", label: "Tên", _style: { width: "8%" } },
 
  { key: "action", label: "ACTION", _style: { width: "10%" } },
];
const monanlist = [
    { id: "1", lma_ten: "nước uống" },
    { id: "2", lma_ten: "lẩu" },
    { id: "3", lma_ten: "đồ nướng"},
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
              <div className='card-header-actions'>
                <CLink to='#'>
                  <CButton
                    block
                    variant='outline'
                    color='primary'
                    size='sm'
                    className='users-title-btn-add'>
                    <Icon
                      path={mdiAccountPlus}
                      size={1}
                      title='Create Admin'
                      className='mr-1'
                    />
                    Thêm loại món ăn
                  </CButton>
                </CLink>
              </div>

            </CRow>
          </CContainer>
        </CCardHeader>
      
        <CCardBody>
          <CDataTable
             items={monanlist}
            fields={fields}
            striped
            itemsPerPage={5}
            pagination
            scopedSlots={{
              index: (item) => <td>{item.id}</td>,
              name: (item) => (
                <td>
                  <CBadge color={getBadge(item.lma_ten)}>{item.nalma_tenme}</CBadge>
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

export default LoaiMonAn;

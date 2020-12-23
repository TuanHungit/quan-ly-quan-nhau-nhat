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
  CCollapse,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Icon from "@mdi/react";
import { mdiFoodForkDrink } from "@mdi/js";
import CreateFood from "./createFood";
import { getMonAns, deleteMonAn } from "../api/MonAnApi";
// import { getMonAns, deleteMonAn } from "../api/MonAnApi";

const fields = [
  { key: "ma_id", label: "STT", _style: { width: "10%" } },
  { key: "ma_ten", label: "Tên", _style: { width: "15%" } },
  { key: "ma_giaban", label: "Giá bán", _style: { width: "10%" } },
  { key: "ma_giavon", label: "Giá vốn", _style: { width: "10%" } },
  { key: "ma_donvitinh", label: "Đơn vị", _style: { width: "20%" } },
  { key: "ma_hinhanh", label: "Hình ảnh", _style: { width: "20%" } },
  { key: "ma_motachitiet", label: "Mô tả", _style: { width: "20%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
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
function MonAn() {
  const [monanlist, setMonAnList] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);

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
  const createSuccess = () => {
    setSuccess(!success);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonAns();

        setMonAnList(response);
        setLoading(false);
      } catch (err) {
        setMonAnList(null);
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
        <CCardHeader className="CCardHeader-title">
          <CContainer>
            <CRow className="d-flex justify-content-between">
              <h1>Danh sách món ăn</h1>
              <div className="card-header-actions">
                <CButton
                  onClick={toggleModal}
                  block
                  variant="outline"
                  color="primary"
                  size="sm"
                  className="CCardHeader-title-btn-createfood"
                >
                  <Icon
                    path={mdiFoodForkDrink}
                    size={1}
                    title="Create Food"
                    className="mr-1"
                  />
                  Thêm món ăn
                </CButton>
              </div>
            </CRow>
          </CContainer>
        </CCardHeader>

        <CCardBody>
          <CDataTable
            items={monanlist}
            fields={fields}
            striped
            responsive
            loading={loading}
            itemsPerPage={4}
            itemsPerPageSelect
            hover
            sorter
            columnFilter
            tableFilter
            footer
            pagination
            scopedSlots={{
              index: (item) => <td>{item.id}</td>,
              name: (item) => (
                <td>
                  <CBadge color={getBadge(item.ma_ten)}>{item.ma_ten}</CBadge>
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
                      {details.includes(index) ? "Hide" : "Show"}
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <h4>{item.username}</h4>
                      <p className="text-muted">
                        User since: {item.registered}
                      </p>
                      <CButton size="sm" color="info">
                        User Settings
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1">
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CCardBody>
        <CreateFood
          modal={modal}
          toggleModal={toggleModal}
          createSuccess={createSuccess}
        />
      </CCard>
    </>
  );
}

export default MonAn;

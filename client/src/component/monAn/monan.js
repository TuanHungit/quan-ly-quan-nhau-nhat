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
import Icon from "@mdi/react";
import { mdiFoodForkDrink } from "@mdi/js";
import CreateFood from "./createFood";
import { getMonAns, deleteMonAn } from "../../api/MonAnApi";
import EditMonAn from "./editMonAn";
import DeleteMonAn from "./deleteMonAn";

const fields = [
  { key: "ma_id", label: "STT", _style: { width: "10%" } },
  { key: "ma_ten", label: "Tên", _style: { width: "15%" } },
  { key: "ma_giaban", label: "Giá bán", _style: { width: "10%" } },
  // { key: "ma_giavon", label: "Giá vốn", _style: { width: "10%" } },
  { key: "ma_donvitinh", label: "Đơn vị", _style: { width: "20%" } },

  //  { key: "ma_hinhanh", label: "Hình ảnh", _style: { width: "20%" } },
  // { key: "ma_motachitiet", label: "Mô tả", _style: { width: "20%" } },
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
function MonAn() {
  const [monanlist, setMonAnList] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [delItem, setItem] = useState();
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
    console.log(details);
  };
  const actionSuccess = () => {
    setSuccess(!success);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonAns();
        setSuccess(true);
        setMonAnList(response);
        setLoading(false);
      } catch (err) {
        setMonAnList(null);
        setLoading(true);
        setSuccess(false);
        console.log(err);
      }
    };
    fetchData();
  }, [success]);

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
            itemsPerPage={8}
            itemsPerPageSelect
            hover
            sorter
            tableFilter
            pagination
            tableFilter
            sorter
            hover
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
                                  <label>Tên món ăn</label>
                                  <h6>{item.ma_ten}</h6>
                                </CCol>
                                <CCol lg="2">
                                  <label>Giá vốn</label>
                                  <h6>{item.ma_giavon}</h6>
                                </CCol>
                                <CCol lg="4">
                                  <h6>Mô tả tóm tắt:</h6>

                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.ma_motachitiet,
                                    }}
                                  />
                                </CCol>
                                <CCol lg="3">
                                  <CImg
                                    src={`http://localhost:8080/image/${item.ma_hinhanh}`}
                                    alt="img"
                                    alt="Image"
                                    width="250px"
                                    height="200px"
                                    alt={item.ma_hinhanh}
                                  />
                                </CCol>
                              </CRow>

                              <EditMonAn
                                modal={modal1}
                                listMon={item}
                                toggleModal={toggleModal1}
                                createSuccess={actionSuccess}
                                
                              />
                            </CContainer>
                          </CTabPane>
                        </CTabContent>
                      </CTabs>
                      <CButton
                        type="submit"
                        size="sm"
                        color="info"
                        onClick={toggleModal1}
                      >
                        Cập nhật
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
          createSuccess={actionSuccess}
        />
        <DeleteMonAn
          modal={modalDel}
          toggleModal={toggleModalDelete}
          deleteSuccess={actionSuccess}
          itemDeleted={delItem}
        />
      </CCard>
    </>
  );
}

export default MonAn;

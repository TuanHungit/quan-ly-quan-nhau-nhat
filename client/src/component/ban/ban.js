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
import { getBans, deleteBan } from "../../api/banApi";
import CreateBan from "./createBan";

const fields = [
  // { key: "b_id", label: "STT", _style: { width: "20%" } },
  { key: "b_stt", label: "STT", _style: { width: "20%" } },
  { key: "b_soghe", label: "Số ghế", _style: { width: "20%" } },
  { key: "b_trangthai", label: "Trạng thái", _style: { width: "30%" } },
  { key: "action", label: "ACTION", _style: { width: "10%" } },
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
function Ban() {
  const [banlist, setBanList] = useState(null);
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
        const response = await getBans();

        setBanList(response);
        setSuccess(false);
        setLoading(false);
      } catch (err) {
        setBanList(null);
        setLoading(true);
        console.log(err);
      }
    };
    fetchData();
  }, [success]);

  const handleDelete = (item) => {
    deleteBan(item);
    setSuccess(!success);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">
          <CContainer className="container">
            <CRow className="d-flex justify-content-between">
              <h1>Danh sách bàn</h1>
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
                  Thêm bàn
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
            tableFilter
            sorter
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
              action: (item) => (
                <td style={{ display: "flex", justifyContent: "start" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="c-subheader-nav-link" href="#">
                      <CIcon
                        style={{ color: "red" }}
                        name="cil-trash"
                        alt="Delete"
                        onClick={(e) => handleDelete(item)}
                      />
                      {/* &nbsp;Edit */}
                    </span>
                  </div>
                </td>
              ),
            }}
          />
        </CCardBody>
        <CreateBan
          modal={modal}
          toggleModal={toggleModal}
          createSuccess={createSuccess}
        />
      </CCard>
    </>
  );
}

export default Ban;

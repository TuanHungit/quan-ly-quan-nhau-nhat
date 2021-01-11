import React, { useState, useEffect } from "react";
import alertify from "alertifyjs";
import {
  mdiFoodOff,
  mdiAccountCircle,
  mdiTable,
  mdiLeadPencil,
  mdiHistory,
  mdiBellRing,
  mdiCurrencyUsd,
} from "@mdi/js";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CButton,
  CModalFooter,
  CRow,
  CContainer,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
} from "@coreui/react";
import "./split.css";
import ToPriceForView from "../../../../common/convertPriceForView";
import HoaDonService from "../../../../api/HoaDonService";
export default ({
  modalSplitBill,
  onSetModalSplitBill,
  listTable,
  billInfo,
  setBill,
  setUpdatedMenu,
  updateStatusTable,
  setUpdate,
}) => {
  const [splitToTableDisplay, setToTableDisplay] = useState("Chọn bàn");
  const [splitToTable, setToTable] = useState(0);
  const onSplitBillHandler = (bill, b_id_split, b_id_split_to) => {
    if (b_id_split_to === 0) {
      return alertify.error("Vui lòng chọn bàn để ghép đơn!");
    }

    HoaDonService.deleteBill(b_id_split).then((res) => {
      const billSplitTo = [];
      const billUpdated = bill.map((el) => {
        if (el.idBan === b_id_split) {
          //   billSplitTo.push();
          el.idBan = b_id_split_to;
          billSplitTo.push({ ...el, idBan: b_id_split_to });
        }
        return el;
      });
      updateStatusTable(b_id_split, 1);
      setBill(billUpdated);

      setUpdatedMenu(true);
      setUpdate(true);
      onSetModalSplitBill();
      alertify.success("Tách ghép đơn thành công!");
    });
  };
  return (
    <CModal show={modalSplitBill} onClose={onSetModalSplitBill} size="lg">
      <CModalHeader closeButton>
        <h1>Bàn {billInfo.b_id}</h1>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow className="d-flex justify-content-center py-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                checked
              />
              <label class="form-check-label" for="exampleRadios1">
                Ghép đơn
              </label>
            </div>
            <div class="form-check"></div>
            <div class="form-check pr-5">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
              />
              <label class="form-check-label" for="exampleRadios2">
                Tách đơn
              </label>
            </div>
          </CRow>
          <CRow className="d-flex">
            <p>
              <strong> Ghép đến</strong>
            </p>
            <CDropdown className="mt-2 ml-4 pb-4" style={{ width: "200px" }}>
              <CDropdownToggle caret color="info">
                {splitToTableDisplay !== "Chọn bàn"
                  ? `Bàn ${splitToTableDisplay}`
                  : "Chọn bàn"}
              </CDropdownToggle>
              <CDropdownMenu placement={"right - start"} className="listTable">
                {listTable.length > 0
                  ? listTable
                      .filter((el) => el.b_trangthai === "DaDat")
                      .map((el, key) => (
                        <CDropdownItem
                          key={key}
                          onClick={() => {
                            setToTableDisplay(el.b_stt);
                            setToTable(el.b_id);
                          }}
                        >
                          Bàn {el.b_stt}
                        </CDropdownItem>
                      ))
                  : null}
              </CDropdownMenu>
            </CDropdown>
          </CRow>
          <CRow>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Khách hàng</th>
                  <th scope="col">Số lượng hàng</th>
                  <th scope="col">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Khách lẻ</th>
                  <td>{billInfo.bill.length}</td>
                  <td>{ToPriceForView(billInfo.total)}</td>
                </tr>
              </tbody>
            </table>
          </CRow>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={(e) =>
            onSplitBillHandler(billInfo.bill, billInfo.b_id, splitToTable)
          }
        >
          Thực hiện
        </CButton>{" "}
        <CButton color="secondary" onClick={onSetModalSplitBill}>
          Bỏ qua
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

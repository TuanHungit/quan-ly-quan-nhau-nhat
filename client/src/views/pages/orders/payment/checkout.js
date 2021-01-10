import React, { useState, useRef } from "react";
import Icon from "@mdi/react";
import { useReactToPrint } from "react-to-print";
import {
  mdiCalendarBlankOutline,
  mdiTable,
  mdiClockOutline,
  mdiIdCard,
  mdiCurrencyUsd,
} from "@mdi/js";
import { CContainer, CRow, CCol, CButton } from "@coreui/react";

import "./checkout.css";
import ToDateForView from "../../../../common/convertDateForView";
import ToPriceForView from "../../../../common/convertPriceForView";
import InvoiceToPrint from "./invoiceToPrint/invoiceToPrint";
import HoaDonServices from "../../../../api/HoaDonService";
import { editBan } from "../../../../api/BanApi";
const generatorPrice = (price) => {
  const priceArr = [];
  if (price % 2 !== 0) {
    priceArr.push(price + 1000);
  }
  [1, 2, 3, 5, 10].map((el) =>
    priceArr.push(Math.floor(price / 10000) * 10000 + el * 10000)
  );

  return priceArr;
};

const pageStyle = `
  @media all {
  .page-break {
    display: none;
  }
}

@media print {
  html, body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }
}

@media print {
  .page-break {
    margin-top: 1rem;
    display: block;
    page-break-before: auto;
  }
}

@page {
  size: auto;
  margin: 20mm;
  
}
`;

export default ({ menu, total, billId, banId, setUpdate, setBillId }) => {
  const [excessCash, setExcessCash] = useState(0);
  const [customerCash, setCustomerCash] = useState(0);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  const onCheckOutHandler = async () => {
    try {
      HoaDonServices.updateBillStatus(billId).then((res) => {
        editBan({ b_id: banId, b_trangthai: 1 }).then((res) => handlePrint());
        setUpdate((state) => !state);
        setBillId(0);
      });
    } catch (err) {}
  };
  return (
    <div className="m-4 checkout-content" style={{ height: "90%" }}>
      <CContainer>
        <CRow className="d-flex justify-content-between">
          <strong>
            <h4>Phiếu thanh toán - Hóa đơn 1</h4>
          </strong>
          <p>x</p>
        </CRow>
        <CRow>
          <CCol lg="7">
            <CRow className="d-flex justify-content-between">
              <strong style={{ color: "#0090da" }}>
                {" "}
                <Icon
                  path={mdiTable}
                  title="User Profile"
                  size={1}
                  horizontal
                  rotate={180}
                  vertical
                />{" "}
                Bàn 1
              </strong>
              <button>Thanh toán một phần</button>
            </CRow>
          </CCol>
          <CCol lg="5" className="text-dark d-flex justify-content-end">
            {`${ToDateForView(new Date())} ${new Date().toLocaleTimeString()} `}
            &nbsp;&nbsp;
            <Icon
              path={mdiCalendarBlankOutline}
              title="User Profile"
              size={0.8}
              horizontal
              rotate={180}
              vertical
            />{" "}
            <Icon
              path={mdiClockOutline}
              title="User Profile"
              size={0.8}
              horizontal
              rotate={180}
              vertical
            />{" "}
          </CCol>
        </CRow>
        <CRow className="pt-3">
          <CCol lg="7">
            {" "}
            <CRow className="p-2 mt-2 bg-secondary">Khác</CRow>
            <div>{menu}</div>
          </CCol>

          <CCol lg="5" className="checkout-content">
            <div className="d-flex justify-content-between ">
              <p>
                Tổng tiền hàng{" "}
                <span className="border rounded-circle px-2">{` ${6}`}</span>
              </p>
              <p>{ToPriceForView(total)}</p>
            </div>
            <div className="d-flex justify-content-between ">
              <p>Giảm giá </p>
              <p>0</p>
            </div>
            <div className="d-flex justify-content-between ">
              <p>
                <strong> Khách cần trả </strong>
              </p>
              <p style={{ color: "#0090da", fontSize: "18px" }}>
                {ToPriceForView(total)}
              </p>
            </div>
            <div className="d-flex justify-content-between ">
              <p>
                Khách thanh toán{" "}
                <span style={{ color: "#007fc1" }}>
                  <Icon
                    path={mdiIdCard}
                    title="User Profile"
                    size={1.2}
                    horizontal
                    rotate={180}
                    vertical
                  />{" "}
                </span>
              </p>
              <strong>
                <p>{ToPriceForView(customerCash)}</p>
              </strong>
            </div>
            <CRow className="py-4 ">
              {generatorPrice(total).map((el, key) => (
                <CCol lg="4" className="pb-2" key={key}>
                  <CButton
                    variant="outline"
                    color="secondary"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                    value={el}
                    onClick={(e) => {
                      setExcessCash(e.target.value - total);
                      setCustomerCash(e.target.value - 0);
                    }}
                    className="py-2"
                  >
                    {el}
                  </CButton>
                </CCol>
              ))}
            </CRow>

            <div
              className="d-flex justify-content-between "
              style={{ height: "80%" }}
            >
              <p>Tiền thừa trả khách</p>
              <strong>
                <p>{ToPriceForView(excessCash)}</p>
              </strong>
            </div>
            <InvoiceToPrint ref={componentRef} menu={menu} />
            <div className="d-flex justify-content-end ">
              <CButton
                color="success"
                shape="pill"
                className="p-2"
                style={{
                  width: "220px",
                  height: "65px",
                  fontSize: "18px",
                }}
                onClick={onCheckOutHandler}
              >
                <Icon
                  path={mdiCurrencyUsd}
                  title="User Profile"
                  size={1.2}
                  horizontal
                  rotate={180}
                  vertical
                />{" "}
                Thanh toán (Enter)
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

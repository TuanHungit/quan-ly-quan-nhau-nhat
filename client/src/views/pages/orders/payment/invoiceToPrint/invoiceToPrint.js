import React from "react";
import "./invoiceToPrint.css";
import { CRow, CContainer } from "@coreui/react";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="print-source">
        <CContainer>
          <CRow className="d-flex justify-content-start">
            <div className="d-flex flex-column">
              <p>
                Tên cửa hàng: <strong>HNS2T</strong>
              </p>
              <p>Điện thoại: 1900 1414</p>
            </div>
            <hr class="new" />
          </CRow>

          <CRow className="d-flex justify-content-start">
            <p>Ngày bán: 08/01/2020 21:14</p>
          </CRow>
          <CRow className="justify-content-center">
            <strong>
              <h3>HÓA ĐƠN BÁN HÀNG</h3>
            </strong>
          </CRow>
          <CRow className="justify-content-center">
            <strong>
              <h5>HD000052</h5>
            </strong>
          </CRow>
          <CRow className="justify-content-start">
            <p>
              <strong>Người bán: </strong>Nguyễn Tuấn Hùng
            </p>
          </CRow>
          {this.props.menu}
        </CContainer>
      </div>
    );
  }
}

export default ComponentToPrint;

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Icon from "@mdi/react";

import { produce } from "immer";
import {
  mdiAccountCircle,
  mdiTable,
  mdiLeadPencil,
  mdiHistory,
  mdiBellRing,
  mdiCurrencyUsd,
  mdiDelete,
  mdiPlusCircle,
  mdiMinusCircle,
  mdiFoodOff,
} from "@mdi/js";
import {
  CContainer,
  CImg,
  CRow,
  CCol,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CButton,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";

export default (props) => {
  return (
    <CContainer fluid className="bg-info" style={{ height: "100vh" }}>
      <CRow>
        <CCol lg="7">
          <CTabs activeTab="home">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="home">
                  <strong className="text-dark"> Ưu tiên</strong>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="profile">
                  <strong className="text-dark"> Theo món</strong>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="messages">
                  <strong className="text-dark"> Theo phòng bàn</strong>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent fade>
              <CTabPane
                data-tab="home"
                className="bg-light"
                style={{
                  borderBottomLeftRadius: "30px",
                  borderBottomRightRadius: "30px",
                }}
              >
                <CContainer>
                  <CRow>
                    <CCol style={{ height: "90vh" }} className="rounded">
                      <CRow
                        className="border-bottom py-2 mt-2  text-dark"
                        style={{
                          boxShadow: "0px 1px 1px #007fc1",
                        }}
                      >
                        <CCol lg="7" className="d-flex">
                          <h5>Thuốc lá Vinataba</h5>
                          <p></p>
                        </CCol>
                        <CCol lg="5" className="d-flex justify-content-between">
                          <Icon
                            path={mdiMinusCircle}
                            title="User Profile"
                            size={1}
                            horizontal
                            rotate={180}
                            vertical
                          />
                          <p> &nbsp;1&nbsp;</p>
                          <Icon
                            path={mdiPlusCircle}
                            title="User Profile"
                            size={1}
                            horizontal
                            rotate={180}
                            vertical
                          />
                          <p>30.000</p>
                          <p>
                            {" "}
                            <strong>30.000</strong>{" "}
                          </p>
                        </CCol>
                      </CRow>
                      <CRow
                        className="border-bottom py-2 mt-2  text-dark"
                        style={{
                          boxShadow: "0px 1px 1px #007fc1",
                        }}
                      >
                        <CCol lg="7" className="d-flex">
                          <Icon
                            path={mdiDelete}
                            title="User Profile"
                            size={1}
                            horizontal
                            rotate={180}
                            vertical
                          />
                          <p>&nbsp;{1}&nbsp;</p>
                          <p></p>
                        </CCol>
                        <CCol lg="5" className="d-flex justify-content-between">
                          <Icon
                            path={mdiMinusCircle}
                            title="User Profile"
                            size={1}
                            horizontal
                            rotate={180}
                            vertical
                          />
                          <p> &nbsp;1&nbsp;</p>
                          <Icon
                            path={mdiPlusCircle}
                            title="User Profile"
                            size={1}
                            horizontal
                            rotate={180}
                            vertical
                          />
                          <p>30.000</p>
                          <p>
                            {" "}
                            <strong>30.000</strong>{" "}
                          </p>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CContainer>
              </CTabPane>
              <CTabPane data-tab="profile" className="bg-light">
                456
              </CTabPane>
              <CTabPane data-tab="messages" className="bg-light">
                789
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
        <CCol lg="5">
          <CTabs activeTab="home">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="home">
                  {" "}
                  <strong className="text-dark">Đã xong chờ cung ứng</strong>
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="home">123</CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
      </CRow>
    </CContainer>
  );
};

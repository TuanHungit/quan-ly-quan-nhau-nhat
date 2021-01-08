import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";

import { mdiChevronDoubleRight, mdiChevronRight } from "@mdi/js";
import {
  CContainer,
  CRow,
  CCol,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import "./kitchen.css";
import { produce } from "immer";
export default (props) => {
  const [listMenu, setListMenu] = useState([
    {
      id: 1,
      cthd_ten: "CBánh mỳ bỏ lò dăm bông & phomai",
      ctdh_soluong: 3,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000006 - 26/12/2020 19:37 - Bởi Thanh Hoang",
    },
    {
      id: 2,
      cthd_ten: "Phomai dây Nga",
      ctdh_soluong: 1,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000006 - 26/12/2020 19:37 - Bởi Thanh Hoang",
    },
    {
      id: 3,
      cthd_ten: "Đĩa thịt nguội Tây Ba Nha hảo hạng",
      ctdh_soluong: 2,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000006 - 26/12/2020 19:37 - Bởi Thanh Hoang",
    },
    {
      id: 4,
      cthd_ten: "APEROL SPRITZ",
      ctdh_soluong: 1,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000003 - 29/12/2020 10:49 - Bởi Thanh Hoang",
    },
    {
      id: 5,
      cthd_ten: "Bia Heiniken",
      ctdh_soluong: 2,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000003 - 29/12/2020 10:49 - Bởi Thanh Hoang",
    },
    {
      id: 6,
      cthd_ten: "Bia Hà Nội",
      ctdh_soluong: 1,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000003 - 29/12/2020 10:49 - Bởi Thanh Hoang",
    },
    {
      id: 7,
      cthd_ten: "Thuốc lá Kent HD",
      ctdh_soluong: 1,
      b_id: 10,
      time: "10 ngày trước",
      creatdAt: "DH000003 - 29/12/2020 10:49 - Bởi Thanh Hoang",
    },
  ]);
  const [listCompletedMenu, setListCompletedMenu] = useState([]);

  return (
    <CContainer fluid className="bg-info" style={{ height: "100vh" }}>
      <CRow>
        <CCol lg="6">
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
                    <CCol
                      style={{ height: "90vh" }}
                      className="rounded content"
                    >
                      {listMenu.map((el, key) => (
                        <>
                          {" "}
                          <CRow
                            className="border-bottom py-2 mt-2  text-dark"
                            style={{
                              boxShadow: "0px 1px 1px #007fc1",
                            }}
                          >
                            <CCol lg="7" className="d-flex flex-column">
                              <h5>{el.cthd_ten}</h5>
                              <p>{el.creatdAt}</p>
                            </CCol>
                            <CCol lg="1">
                              <p>
                                {" "}
                                <strong>{el.ctdh_soluong}</strong>
                              </p>
                            </CCol>
                            <CCol lg="2" className="d-flex flex-column">
                              <h6>Mang về</h6>
                              <p>
                                <em> {el.time}</em>
                              </p>
                            </CCol>
                            <CCol
                              lg="2"
                              className="d-flex justify-content-between"
                            >
                              <button
                                className="button-next"
                                onClick={(e) => {
                                  setListCompletedMenu((el) => {
                                    const updatedState = [...el];

                                    return produce(updatedState, (v) => {
                                      updatedState.push(el);
                                    });
                                  });
                                }}
                              >
                                <Icon
                                  path={mdiChevronRight}
                                  title="User Profile"
                                  size={1}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />
                              </button>
                              &nbsp; &nbsp;
                              <button className="button-next-all">
                                <Icon
                                  path={mdiChevronDoubleRight}
                                  title="User Profile"
                                  size={1}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />
                              </button>
                            </CCol>
                          </CRow>
                        </>
                      ))}
                    </CCol>
                  </CRow>
                </CContainer>
              </CTabPane>

              <CTabPane data-tab="messages" className="bg-light">
                789
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
        <CCol lg="6">
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
                    <CCol
                      style={{ height: "90vh" }}
                      className="rounded content"
                    >
                      {listMenu.map((el, key) => (
                        <>
                          {" "}
                          <CRow
                            className="border-bottom py-2 mt-2  text-dark"
                            style={{
                              boxShadow: "0px 1px 1px #007fc1",
                            }}
                          >
                            <CCol lg="7" className="d-flex flex-column">
                              <h5>{el.cthd_ten}</h5>
                              <p>{el.creatdAt}</p>
                            </CCol>
                            <CCol lg="1">
                              <p>
                                {" "}
                                <strong>{el.ctdh_soluong}</strong>
                              </p>
                            </CCol>
                            <CCol lg="2" className="d-flex flex-column">
                              <h6>Mang về</h6>
                              <p>
                                <em> {el.time}</em>
                              </p>
                            </CCol>
                            <CCol
                              lg="2"
                              className="d-flex justify-content-between"
                            >
                              <button
                                className="completed-button-next"
                                onClick={(e) => {
                                  setListCompletedMenu((el) => {
                                    const updatedState = [...el];
                                    updatedState.push(el);
                                    return updatedState;
                                  });
                                }}
                              >
                                <Icon
                                  path={mdiChevronRight}
                                  title="User Profile"
                                  size={1}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />
                              </button>
                              &nbsp; &nbsp;
                              <button className="completed-button-next-all">
                                <Icon
                                  path={mdiChevronDoubleRight}
                                  title="User Profile"
                                  size={1}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />
                              </button>
                            </CCol>
                          </CRow>
                        </>
                      ))}
                    </CCol>
                  </CRow>
                </CContainer>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
      </CRow>
    </CContainer>
  );
};

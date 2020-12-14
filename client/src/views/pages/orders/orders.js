import React, { useState } from "react";
import Slider from "react-slick";
import Icon from "@mdi/react";
import Menu from "./menu/menu";
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
import "./orders.css";
import TableData from "./tableData";
import { shallow } from "enzyme/build";

export default (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [table, setTable] = useState(0);
  const [bill, setBill] = useState([]);
  const onClickTableHandler = (e, el) => {
    setTable(el.ban_stt);
  };

  const onClickMenuHandler = (id, name, price) => {
    setBill((el) => el.concat([{ id, name, price, amount: 1 }]));
  };
  console.log(bill);
  return (
    <div>
      <CContainer fluid style={{ height: "100vh", backgroundColor: "#fff" }}>
        <CRow>
          <CCol lg="7">
            <CTabs activeTab="roomtable">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="roomtable">
                    {" "}
                    <Icon
                      path={mdiTable}
                      title="User Profile"
                      size={0.7}
                      horizontal
                      vertical
                    />
                    Phòng bàn
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="menu">Thực đơn</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="roomtable">
                  <CContainer>
                    <CRow className="justify-content-between pt-2">
                      <p> Sử dụng: 3/31</p>
                      <CDropdown className="mt-2">
                        <CDropdownToggle caret color="info">
                          Tất cả
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem header>Tất cả</CDropdownItem>
                          <CDropdownItem>Đang sử dụng</CDropdownItem>
                          <CDropdownItem>Chưa sử dụng</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CRow>
                    <Slider
                      {...settings}
                      style={{ height: "82vh" }}
                      className="mb-5"
                    >
                      <div>
                        <CRow style={{ height: "100%" }}>
                          {TableData.slice(0, 24).map((el, key) => (
                            <CCol lg="2" className="pt-5 " key={key}>
                              <div
                                className={`table `}
                                id={key}
                                onClick={(e) => onClickTableHandler(e, el)}
                              >
                                <CImg
                                  src="https://static.thenounproject.com/png/262835-200.png"
                                  alt="Hinhanh"
                                  height="70"
                                  fluid
                                  className="label"
                                  align="center"
                                />
                                <div className="label">Bàn {el.ban_stt}</div>
                              </div>
                            </CCol>
                          ))}
                        </CRow>
                      </div>
                      <div>
                        <CRow style={{ height: "100%" }}>
                          {TableData.slice(24).map((el, key) => (
                            <CCol lg="2" className="pt-5" key={key}>
                              <div className="table">
                                <CImg
                                  src="https://static.thenounproject.com/png/262835-200.png"
                                  alt="Hinhanh"
                                  height="70"
                                  fluid
                                  className="label"
                                  align="center"
                                />
                                <div className="label">Bàn {el.ban_stt}</div>
                              </div>
                            </CCol>
                          ))}
                        </CRow>
                      </div>
                    </Slider>
                  </CContainer>
                </CTabPane>
                <CTabPane data-tab="menu" className="pt-3">
                  <Menu onClickMenuHandler={onClickMenuHandler} />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCol>
          <CCol lg="5">
            <CTabs activeTab="bill">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="bill">Hóa đơn</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="menu">Hóa đơn mới</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="bill">
                  <CContainer className="pt-3">
                    <CRow>
                      <CCol>
                        <CCard style={{ height: "89vh" }}>
                          <CCardHeader>
                            <CRow>
                              <CCol lg="3">
                                {" "}
                                <Icon
                                  path={mdiTable}
                                  title="User Profile"
                                  size={1}
                                  horizontal
                                  vertical
                                />
                                Bàn {table}
                              </CCol>
                              <CCol lg="4">
                                <CInput placeholder="Tìm khách hàng (F4)" />
                              </CCol>
                              <CCol lg="5"></CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody className="bill">
                            {/* */}
                            {bill.length > 0 ? (
                              bill.map((el, key) => {
                                const id = el.id;
                                return (
                                  <CRow
                                    className="border-bottom py-2"
                                    style={{ boxShadow: "0px 1px 1px #007fc1" }}
                                    key={key}
                                  >
                                    <CCol lg="7" className="d-flex">
                                      <Icon
                                        path={mdiDelete}
                                        title="User Profile"
                                        size={1}
                                        horizontal
                                        rotate={180}
                                        vertical
                                        onClick={(e) => {
                                          const billUpdated = bill.filter(
                                            (el) => el.id !== id
                                          );
                                          setBill([...billUpdated]);
                                        }}
                                      />
                                      <p>&nbsp;{key + 1}&nbsp;</p>
                                      <p>{el.name}</p>
                                    </CCol>
                                    <CCol
                                      lg="5"
                                      className="d-flex justify-content-between"
                                    >
                                      <Icon
                                        path={mdiMinusCircle}
                                        title="User Profile"
                                        size={1}
                                        horizontal
                                        rotate={180}
                                        vertical
                                        onClick={(e) => {
                                          setBill((el) =>
                                            produce(el, (v) => {
                                              v[key].amount =
                                                el[key].amount - 1;
                                            })
                                          );
                                        }}
                                      />
                                      <p> &nbsp;{el.amount}&nbsp;</p>
                                      <Icon
                                        path={mdiPlusCircle}
                                        title="User Profile"
                                        size={1}
                                        horizontal
                                        rotate={180}
                                        vertical
                                        onClick={(e) => {
                                          setBill((el) =>
                                            produce(el, (v) => {
                                              v[key].amount =
                                                el[key].amount + 1;
                                            })
                                          );
                                        }}
                                      />
                                      <p>{el.price}</p>
                                      <p>
                                        {" "}
                                        <strong>{el.price}</strong>{" "}
                                      </p>
                                    </CCol>
                                  </CRow>
                                );
                              })
                            ) : (
                              <div className="icon">
                                <Icon
                                  path={mdiFoodOff}
                                  title="User Profile"
                                  size={10}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />
                              </div>
                            )}
                          </CCardBody>
                          <CCardFooter>
                            <CRow className="d-flex justify-content-between">
                              <p>Số lượng khách </p>
                              <p>Tổng tiền 375.000</p>
                            </CRow>
                            <CRow className="d-flex justify-content-between">
                              <p className="mt-3">
                                <Icon
                                  path={mdiAccountCircle}
                                  title="User Profile"
                                  size={0.7}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />
                                Nguyễn Tuấn Hùng
                              </p>
                              <p className="mt-3">
                                <Icon
                                  path={mdiLeadPencil}
                                  title="User Profile"
                                  size={0.7}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />{" "}
                                Ghi chú
                              </p>
                              <p className="mt-3">
                                <Icon
                                  path={mdiHistory}
                                  title="User Profile"
                                  size={0.7}
                                  horizontal
                                  rotate={180}
                                  vertical
                                />{" "}
                                Lịch sử
                              </p>
                              <CButton
                                color="info"
                                shape="pill"
                                className="m-2 "
                              >
                                Tách ghép đơn
                              </CButton>
                            </CRow>
                            <CRow>
                              <CCol className="text-center bg-success py-3">
                                <h4 className="text-light">
                                  <Icon
                                    path={mdiCurrencyUsd}
                                    title="User Profile"
                                    size={1.2}
                                    horizontal
                                    rotate={180}
                                    vertical
                                  />{" "}
                                  Thanh toán
                                </h4>
                              </CCol>
                              <CCol className="text-center bg-info py-3">
                                <h4 className="text-light">
                                  {" "}
                                  <Icon
                                    path={mdiBellRing}
                                    title="User Profile"
                                    size={1.2}
                                    horizontal
                                    rotate={180}
                                    vertical
                                  />{" "}
                                  Thông báo
                                </h4>
                              </CCol>
                            </CRow>
                          </CCardFooter>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CTabPane>
                <CTabPane data-tab="menu">452</CTabPane>
              </CTabContent>
            </CTabs>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

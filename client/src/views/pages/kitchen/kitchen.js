import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { produce } from "immer";
import { mdiChevronDoubleRight, mdiChevronRight } from "@mdi/js";
import ToDateForView from "../../../common/convertDateForView";
import { channel } from "../../../common/pusher";
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
import alertify from "alertifyjs";
import MessageService from "../../../api/messageApi";

export default (props) => {
  const [updated, setUpdated] = useState(false);
  const [listMenu, setListMenu] = useState(
    JSON.parse(localStorage.getItem("menu")) || []
  );
  const [listCompletedMenu, setListCompletedMenu] = useState(
    JSON.parse(localStorage.getItem("completedMenu")) || []
  );

  const setLocalMenu = (menu) => {
    localStorage.setItem("menu", JSON.stringify(menu));
  };

  const setLocalCompletedMenu = (menu) => {
    localStorage.setItem("completedMenu", JSON.stringify(menu));
  };
  useEffect(() => {
    channel.bind("notice", function (res) {
      const data = res.message;
      const menu = Object.values(data.monans).map((el) => {
        return {
          ...el,
          b_id: data.ban_id,
          createdAt: new Date().toISOString(),
          nv: data.hd_nhanvien,
        };
      });
      setListMenu((state) => state.concat(menu));
      const existingMenu = JSON.parse(localStorage.getItem("menu"));
      localStorage.setItem("menu", JSON.stringify(menu.concat(existingMenu)));
      alertify.warning(`Có ${menu.length} món vừa order!`);
    });
  }, []);

  useEffect(() => {
    if (updated) {
      setLocalMenu(listMenu);
      setUpdated(false);
    }
  }, [updated]);

  const onNextMenuHandler = (menu, b_id) => {
    setListCompletedMenu((state) => {
      const existingMenu = state.filter(
        (el) => el.id === menu.id && el.b_id === b_id
      );

      if (existingMenu.length > 0) {
        return state.map((el) => {
          if (el.id === menu.id && el.b_id === b_id) {
            return {
              ...el,
              amount: el.amount + 1,
            };
          }
          return el;
        });
      }
      const result = state.concat({ ...menu, amount: 1 });
      setLocalCompletedMenu(result);
      return result;
    });

    try {
      MessageService.supplyMessage({ type: "supply", data: menu }).then(
        (res) => res
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onNextAllMenuHandler = (menu) => {
    setListCompletedMenu((state) => {
      const result = state.concat(menu);
      setLocalCompletedMenu(result);
      return result;
    });

    try {
      MessageService.supplyMessage({ type: "supply", data: menu }).then(
        (res) => res
      );
    } catch (err) {
      console.log(err);
    }
  };
  const onNextCompletedMenuHandler = (menu) => {
    try {
      MessageService.supplyMessage({ type: "supplied", data: menu }).then(
        (res) => res
      );
    } catch (err) {
      console.log(err);
    }
  };
  const onDeleteMenuHandler = async (id, b_id) => {
    const menuUpdated = listMenu.filter(
      (el) => el.id !== id || el.b_id !== b_id
    );
    setLocalMenu(menuUpdated);
    setListMenu(menuUpdated);
  };
  const onDeleteCompletedMenuHandler = async (id, b_id) => {
    const menuUpdated = listCompletedMenu.filter(
      (el) => el.id !== id || el.b_id !== b_id
    );
    setLocalCompletedMenu(menuUpdated);
    setListCompletedMenu(menuUpdated);
  };
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
                      {listMenu.length > 0
                        ? listMenu.map((el, key) => {
                            const { id, b_id } = el;
                            return (
                              <>
                                {" "}
                                <CRow
                                  className="border-bottom py-2 mt-2"
                                  style={{
                                    boxShadow: "0px 1px 1px #007fc1",
                                    color: "black",
                                  }}
                                  key={key}
                                >
                                  <CCol lg="7" className="d-flex flex-column">
                                    <h5>
                                      <strong>{el.name}</strong>
                                    </h5>
                                    <p className="text-dark">
                                      <em>{ToDateForView(el.createdAt)}</em>{" "}
                                    </p>
                                  </CCol>
                                  <CCol lg="1">
                                    <p>
                                      {" "}
                                      <strong>{el.amount}</strong>
                                    </p>
                                  </CCol>
                                  <CCol lg="2" className="d-flex flex-column">
                                    <h5>Bàn {el.b_id}</h5>
                                    <p className="text-dark">
                                      <em> 10 giờ trước</em>
                                    </p>
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    className="d-flex justify-content-between"
                                  >
                                    <button
                                      className="button-next"
                                      onClick={(e) => {
                                        onNextMenuHandler(el, b_id);
                                        setListMenu((el) => {
                                          if (el[key].amount === 1) {
                                            onDeleteMenuHandler(id, b_id);
                                          }
                                          setUpdated(true);
                                          return produce(el, (v) => {
                                            v[key].amount = el[key].amount - 1;
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
                                        onClick={(e) => {
                                          onNextAllMenuHandler(el, b_id);
                                          onDeleteMenuHandler(id, b_id);
                                        }}
                                      />
                                    </button>
                                  </CCol>
                                </CRow>
                              </>
                            );
                          })
                        : null}
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
                      {listCompletedMenu.length > 0
                        ? listCompletedMenu.map((el, key) => {
                            const { id, b_id } = el;
                            return (
                              <>
                                {" "}
                                <CRow
                                  className="border-bottom py-2 mt-2"
                                  style={{
                                    boxShadow: "0px 1px 1px #007fc1",
                                    color: "black",
                                  }}
                                >
                                  <CCol lg="7" className="d-flex flex-column">
                                    <h5>
                                      <strong>{el.name}</strong>
                                    </h5>
                                    <p className="text-dark">
                                      <em>{ToDateForView(el.createdAt)}</em>{" "}
                                    </p>
                                  </CCol>
                                  <CCol lg="1">
                                    <p>
                                      {" "}
                                      <strong>{el.amount}</strong>
                                    </p>
                                  </CCol>
                                  <CCol lg="2" className="d-flex flex-column">
                                    <h5>Bàn {el.b_id}</h5>
                                    <p className="text-dark">
                                      <em> 10 giờ trước</em>
                                    </p>
                                  </CCol>
                                  <CCol
                                    lg="2"
                                    className="d-flex justify-content-between"
                                  >
                                    <button
                                      className="completed-button-next"
                                      onClick={(e) => {
                                        onNextCompletedMenuHandler(el);
                                        setListCompletedMenu((el) => {
                                          if (el[key].amount === 1) {
                                            onDeleteCompletedMenuHandler(
                                              id,
                                              b_id
                                            );
                                          }
                                          setUpdated(true);
                                          return produce(el, (v) => {
                                            v[key].amount = el[key].amount - 1;
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
                                    <button className="completed-button-next-all">
                                      <Icon
                                        path={mdiChevronDoubleRight}
                                        title="User Profile"
                                        size={1}
                                        horizontal
                                        rotate={180}
                                        vertical
                                        onClick={(e) => {
                                          onNextCompletedMenuHandler(el);
                                          onDeleteCompletedMenuHandler(
                                            id,
                                            b_id
                                          );
                                        }}
                                      />
                                    </button>
                                  </CCol>
                                </CRow>
                              </>
                            );
                          })
                        : null}
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

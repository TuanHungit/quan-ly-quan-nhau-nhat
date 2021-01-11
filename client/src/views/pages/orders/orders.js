import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Icon from "@mdi/react";
import alertify from "alertifyjs";

import { channel, privateChanel } from "../../../common/pusher";
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
  mdiFood,
  mdiPencil,
  mdiTableFurniture,
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
import { getBans, editBan } from "../../../api/BanApi";
import Menu from "./menu/menu";
import Checkout from "./payment/checkout";
import Sidebar from "react-sidebar";
import ToPriceForView from "../../../common/convertPriceForView";
import ToDateForView from "../../../common/convertDateForView";
import HoaDonService from "./../../../api/HoaDonService";
import Cards from "./../../base/cards/Cards";
import { getMonAns } from "./../../../api/MonAnApi";

export default (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchTableData = async () => {
    try {
      const response = await getBans();
      setListTable(response || JSON.parse(localStorage.getItem("listTable")));
    } catch (err) {
      console.log(err);
    }
  };

  const [paymentSideBarOpen, setPaymentSideBarOpen] = useState(false);
  const [table, setTable] = useState(0);
  const [search, setSearch] = useState(0);
  const [data, setData] = useState([]);
  const [listMonan, setListMonan] = useState([]);
  const [txtSearch, setTxtSearch] = useState({});
  const [bill, setBill] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [listTable, setListTable] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updatedMenu, setUpdatedMenu] = useState(false);
  const [total, setTotal] = useState(0);
  const [billId, setBillId] = useState(0);
  const [noti, setNoti] = useState(true);
  useEffect(() => {
    channel.bind("supply", function (res) {
      const { b_id, name, amount } = res.message.data;

      if (res.message.type === "supply") {
        const message = `${amount} - ${name} - bàn ${b_id} đang chờ được cung ứng!`;
        alertify.warning(message);
      } else if (res.message.type === "supplied") {
        const message = `${amount} - ${name} - bàn ${b_id} đã được cung ứng!`;
        alertify.success(message);
      }
    });
    fetchTableData();
    setBill(JSON.parse(localStorage.getItem("bill")) || []);
  }, []);

  useEffect(() => {
    if (update) {
      fetchTableData();
      setUpdate(false);
    }
  }, [update]);

  const onClickTableHandler = (e, el) => {
    setTable(el);
    calculateTotalOfBill(el.b_id);
    HoaDonService.getHoaDonIdByTable(el.b_id).then((res) => {
      if (res) {
        return setBillId(res);
      }
      setBillId(0);
    });
  };

  useEffect(() => {
    if (updatedMenu) {
      localStorage.setItem("bill", JSON.stringify(bill));
      calculateTotalOfBill(table.b_id);
    }
    setUpdatedMenu(false);
  }, [updatedMenu]);

  const onSetSidebarOpen = () => {
    setPaymentSideBarOpen((state) => !state);
  };

  const onClickMenuHandler = async (id, idBan, name, price) => {
    try {
      const existingTable = bill.filter((el) => el.idBan === idBan);
      if (existingTable.length === 0) {
        await editBan({ b_id: table.b_id, b_trangthai: 0 });
        setUpdate((state) => !state);
      }

      setBill((state) => {
        const existingMenu = state.filter(
          (el) => el.bill.id === id && el.idBan === idBan
        );

        if (existingMenu.length > 0) {
          return state.map((el) => {
            if (el.bill.id === id && el.idBan === idBan) {
              return {
                ...el,
                bill: {
                  ...el.bill,
                  amount: el.bill.amount + 1,
                },
              };
            }
            return el;
          });
        }
        return state.concat([{ idBan, bill: { id, name, price, amount: 1 } }]);
      });
      setUpdatedMenu(true);
      setNoti(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckOutHandler = (e) => {
    if (table.b_id === 0) {
      return alertify.confirm(
        "Vui lòng chọn bàn để thanh toán.",
        function () {
          alertify.success("Ok");
        },
        function () {
          alertify.error("Hủy");
        }
      );
    }
    setPaymentSideBarOpen((state) => !state);
    const result = bill
      .filter((el) => el.idBan === table.b_id)
      .reduce(function (billCheckOut, obj) {
        let key = obj["idBan"];

        if (!billCheckOut[key]) {
          billCheckOut[key] = [];
        }
        billCheckOut[key].push(obj.bill);
        return billCheckOut;
      }, {});
  };

  const onDeleteMenuHandler = async (e, id) => {
    const billUpdated = bill.filter(
      (el) => el.bill.id !== id || el.idBan !== table.b_id
    );

    if (billUpdated.filter((el) => el.idBan === table.b_id).length === 0) {
      await editBan({ b_id: table.b_id, b_trangthai: 1 });
      setUpdate((state) => !state);
    }
    localStorage.setItem("bill", JSON.stringify(billUpdated));
    setBill([...billUpdated]);
    setUpdatedMenu(true);
  };

  const submitNotifications = () => {
    const existingBill = bill.filter((el) => el.idBan === table.b_id);

    if (existingBill.length > 0) {
      try {
        const result = existingBill.reduce(function (billCheckOut, obj) {
          let key = obj["idBan"];

          if (!billCheckOut[key]) {
            billCheckOut[key] = [];
          }
          billCheckOut[key].push(obj.bill);
          return billCheckOut;
        }, {});
        HoaDonService.getHoaDonIdByTable(table.b_id).then((res) => {
          if (res) {
            alertify.confirm("Đã thông báo cho nhà bếp.", function () {
              alertify.success("Ok");
            });
          } else {
            HoaDonService.createBill({
              ban_id: table.b_id,
              hd_tongtien: total,
              hd_trangthai: 1,
              hd_nhanvienid: JSON.parse(localStorage.getItem("userInfo")).nv_id,
              hd_nhanvien: JSON.parse(localStorage.getItem("userInfo"))
                .tk_tendangnhap,
              monans: result[table.b_id],
            }).then((res) => {
              setBillId(res.hd_id);
              setNoti(false);
              alertify.success("Đã thông báo cho nhà bếp.");
            });
          }
        });
      } catch (error) {}
    }
  };

  const calculateTotalOfBill = (idBan) => {
    const existingBill = bill.filter((el) => el.idBan === idBan);
    if (existingBill.length === 0) {
      setTotal(0);
      return;
    }

    let totalBill = existingBill.reduce(function (total, el) {
      return total + el.bill.price * el.bill.amount;
    }, 0);
    setTotal(totalBill);
  };
  const onClick = async () => {
    const list = await getMonAns();
    setData(list);
    

  };

  const onChangeSearched = (e) => {
    var queryData = [];
    if (e.target.value != "") {
      data.forEach(function (monan) {
        if (monan.ma_ten.toLowerCase().indexOf(e.target.value) != -1) {
          queryData.push(monan);
        }
      });
    }

    setListMonan(queryData);
  };

  const Bill = () =>
    bill.filter((el) => el.idBan === table.b_id).length > 0 ? (
      bill
        .filter((el) => el.idBan === table.b_id)
        .map((el, key) => {
          const id = el.bill.id;
          return (
            <CRow
              className=" pt-3 text-dark"
              style={{
                boxShadow: "0px 1px 1px black",
              }}
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
                  onClick={(e) => onDeleteMenuHandler(e, id)}
                />
                <p>
                  &nbsp;&nbsp; &nbsp;<strong>{key + 1}</strong> &nbsp;&nbsp;
                </p>
                <p>{el.bill.name}</p>
              </CCol>
              <CCol lg="5" className="d-flex justify-content-between">
                <Icon
                  path={mdiMinusCircle}
                  title="User Profile"
                  size={1}
                  horizontal
                  rotate={180}
                  vertical
                  onClick={(e) => {
                    setBill((el) => {
                      if (el[key].bill.amount === 1) {
                        return el;
                      }
                      return produce(el, (v) => {
                        v[key].bill.amount = el[key].bill.amount - 1;
                      });
                    });
                  }}
                />
                <p> &nbsp;{el.bill.amount}&nbsp;</p>
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
                        v[key].bill.amount = el[key].bill.amount + 1;
                      })
                    );
                  }}
                />
                <p>{ToPriceForView(el.bill.price)}</p>
                <p>
                  <strong>
                    {ToPriceForView(el.bill.price * el.bill.amount)}
                  </strong>{" "}
                </p>
              </CCol>
            </CRow>
          );
        })
    ) : (
      <>
        <div
          className=" text-secondary d-flex justify-content-center"
          style={{ zIndex: "0" }}
        >
          <Icon
            path={mdiFood}
            title="User Profile"
            size={10}
            horizontal
            rotate={180}
            vertical
            className="icon"
          />
        </div>
        <div className=" text-secondary d-flex justify-content-center">
          {" "}
          <h4>Chưa có món ăn nào</h4>
        </div>
        <div className=" text-secondary d-flex justify-content-center">
          {" "}
          <h6>Vui lòng chọn món ăn trong thực đơn</h6>
        </div>
      </>
    );

  return (
    <Sidebar
      sidebar={
        <Checkout
          menu={<Bill />}
          total={total}
          billId={billId}
          banId={table.b_id}
          setUpdate={setUpdate}
          setBillId={setBillId}
          setBill={setBill}
          onSetSidebarOpen={onSetSidebarOpen}
        />
      }
      open={paymentSideBarOpen}
      pullRight
      transitions
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "white",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          width: "65%",
        },
      }}
    >
      <CContainer fluid style={{ height: "100vh" }} className="bg-info">
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
                    <strong> Phòng bàn</strong>
                  </CNavLink>
                </CNavItem>

                <CNavItem>
                  <CNavLink data-tab="menu">
                    {" "}
                    <strong>Thực đơn</strong>{" "}
                  </CNavLink>
                </CNavItem>
                <CCol lg="2"></CCol>
                <CCol lg="6">
                  <CNavItem className="py-1">
                    <CInput
                      onClick={onClick}
                      onChange={onChangeSearched}
                      name="txtSearch"
                      placeholder="Tìm món (F3)"
                    />
                  </CNavItem>
                  <CCol>
                    {listMonan?(<CCard
                      className=" text-dark search-cart Card"
                      style={{ width: "100%", backgroundColor: "while" }}
                    >
                      {listMonan.map((monan, idx) => {
                        return (
                          <CRow
                            className=" addItem border-bottom"
                            onClick={(e) =>
                              onClickMenuHandler(
                                monan.ma_id,
                                table.b_id,
                                monan.ma_ten,
                                monan.ma_giaban
                              )
                            }
                          >
                            <CCol key={idx}>
                              <img
                                src={`http://localhost:8080/image/${monan.ma_hinhanh}`}
                                class="figure-img img-fluid rounded my-1"
                                alt="HinhAnh"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </CCol>
                            <CCol>
                              <p className="my-1">
                                <strong
                                  style={{ color: "dark", fontWeight: "bold" }}
                                >
                                  {monan.ma_ten}
                                </strong>
                              </p>
                              <p className="my-1"> Mã món: {monan.ma_id}</p>
                            </CCol>
                            <CCol>
                            <p className="my-1">
                                Giá bán:{" "}
                                <strong style={{ color: "blue" }}>
                                  {monan.ma_giaban}{" đ"}
                                </strong>
                              </p>
                            </CCol>
                          </CRow>
                        );
                      })}
                    </CCard>):''}
                    
                  </CCol>
                </CCol>
              </CNav>
              <CTabContent>
                <CTabPane
                  data-tab="roomtable"
                  className="bg-light tab-table-orders"
                  onClick={(e) => setListMonan([])}
                >
                  <CContainer>
                    <CRow className="justify-content-between">
                      <CCol className="d-flex justify-content-between">
                        <p className="text-dark"> Sử dụng: 3/31</p>
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
                      </CCol>
                    </CRow>

                    <Slider
                      {...settings}
                      style={{ height: "80vh" }}
                      className="mb-5"
                    >
                      <div>
                        <CRow style={{ height: "95%" }}>
                          {listTable.slice(0, 24).map((el, key) => (
                            <CCol lg="2" className="pt-5 " key={key}>
                              <div
                                className={`table  border-radius ${
                                  el.b_id === table.b_id
                                    ? "bg-info text-light"
                                    : ""
                                }  ${
                                  el.b_trangthai === "DaDat" &&
                                  el.b_id === table.b_id
                                    ? "bg-danger text-light"
                                    : ""
                                } ${
                                  el.b_trangthai === "DaDat"
                                    ? "bg-none text-danger"
                                    : ""
                                }`}
                                id={key}
                                onClick={(e) => onClickTableHandler(e, el)}
                              >
                                <div className="d-flex justify-content-center">
                                  <Icon
                                    path={mdiTableFurniture}
                                    title="User Profile"
                                    size={2.5}
                                    horizontal
                                    rotate={180}
                                    vertical
                                    horizontal
                                    className="label"
                                  />
                                </div>

                                <div className="label"> Bàn {el.b_stt} </div>
                              </div>

                              <span
                                className={`note  ${
                                  el.b_id === table.b_id ? `note1` : null
                                } font12 `}
                              >
                                {" "}
                                <em>
                                  Ghi chú...{" "}
                                  <Icon
                                    path={mdiPencil}
                                    title="User Profile"
                                    size={0.7}
                                    rotate={180}
                                    horizontal
                                    vertical
                                  />
                                </em>
                              </span>
                            </CCol>
                          ))}
                        </CRow>
                      </div>
                      <div>
                        <CRow style={{ height: "100%" }}>
                          {listTable.slice(24).map((el, key) => (
                            <CCol lg="2" className="pt-5 " key={key}>
                              <div
                                className={`table  border-radius ${
                                  el.b_id === table.b_id
                                    ? "bg-info text-light"
                                    : ""
                                }  ${
                                  el.b_trangthai === "DaDat" &&
                                  el.b_id === table.b_id
                                    ? "bg-danger text-light"
                                    : ""
                                } ${
                                  el.b_trangthai === "DaDat"
                                    ? "bg-none text-danger"
                                    : ""
                                }`}
                                id={key}
                                onClick={(e) => (e, el)}
                              >
                                <div className="d-flex justify-content-center">
                                  <Icon
                                    path={mdiTableFurniture}
                                    title="User Profile"
                                    size={2.5}
                                    horizontal
                                    rotate={180}
                                    verticalonClickTableHandler
                                    horizontal
                                    className="label"
                                  />
                                </div>

                                <div className="label"> Bàn {el.b_stt} </div>
                              </div>

                              <span
                                className={`note  ${
                                  el.b_id === table.b_id ? `note1` : null
                                } font12 `}
                              >
                                {" "}
                                <em>
                                  Ghi chú...{" "}
                                  <Icon
                                    path={mdiPencil}
                                    title="User Profile"
                                    size={0.7}
                                    rotate={180}
                                    horizontal
                                    vertical
                                  />
                                </em>
                              </span>
                            </CCol>
                          ))}
                        </CRow>
                      </div>
                    </Slider>
                  </CContainer>
                </CTabPane>
                <CTabPane data-tab="menu" className="pt-3">
                  <Menu
                    onClickMenuHandler={onClickMenuHandler}
                    table={table.b_id}
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCol>
          <CCol lg="5">
            <CTabs activeTab="bill">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="bill">
                    {" "}
                    <strong>Hóa đơn</strong>{" "}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="menu">Hóa đơn mới</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane
                  data-tab="bill"
                  className="text-dark tab-table-orders"
                >
                  <CContainer className="pt-3" fluid>
                    <CCard style={{ height: "86.5vh" }} fluid>
                      <CCardHeader>
                        <CRow>
                          <CCol lg="3" className="text-dark">
                            {" "}
                            <Icon
                              path={mdiTable}
                              title="User Profile"
                              size={1}
                              horizontal
                              vertical
                            />
                            Bàn {table.b_stt}
                          </CCol>
                          <CCol lg="4">
                            <CInput placeholder="Tìm khách hàng (F4)" />
                          </CCol>
                          <CCol lg="5"></CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody className="bill">
                        <Bill />
                      </CCardBody>
                      <CCardFooter className="text-dark">
                        {noti ? (
                          <CRow style={{ backgroundColor: "#fee7b1" }}>
                            <p
                              style={{ position: "relative" }}
                              className="mt-2"
                            >
                              {" "}
                              <Icon
                                path={mdiBellRing}
                                title="User Profile"
                                size={0.8}
                                horizontal
                                rotate={180}
                                color="red"
                                vertical
                              />{" "}
                              Bạn vừa cập nhật đơn hàng. Click{" "}
                              <strong>Thông báo</strong> để lưu thay đổi và đồng
                              bộ trên hệ thống.
                            </p>
                          </CRow>
                        ) : null}
                        <CRow className="d-flex justify-content-between">
                          <p>Số lượng khách </p>
                          <p>
                            Tổng tiền: <strong>{ToPriceForView(total)}</strong>{" "}
                          </p>
                        </CRow>
                        <CRow className="d-flex justify-content-between ">
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
                          <CButton color="info" shape="pill" className="m-2 ">
                            Tách ghép đơn
                          </CButton>
                        </CRow>
                        <CRow>
                          <CButton
                            className={`text-center bg-success py-3 rounded-left checkout-button`}
                            disabled={billId === 0}
                            onClick={onCheckOutHandler}
                          >
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
                          </CButton>

                          <CButton
                            className={`text-center bg-info py-3 rounded-left checkout-button`}
                            // disabled={billId !== 0}
                            onClick={submitNotifications}
                          >
                            <h4 className="text-light">
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
                          </CButton>
                        </CRow>
                      </CCardFooter>
                    </CCard>
                  </CContainer>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCol>
        </CRow>
      </CContainer>
    </Sidebar>
  );
};

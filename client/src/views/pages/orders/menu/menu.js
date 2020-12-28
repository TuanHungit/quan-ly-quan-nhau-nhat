import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Icon from "@mdi/react";
import menuData from "./menuData";
import categoryData from "./categoryData";
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
import "./menu.css";
import "../../orders/orders.css";
import {
  getAllLoaiMonAn,
  getMonAnFomLoaiMonAn,
} from "../../../../api/LoaiMonAnApi";

export default ({ onClickMenuHandler, table }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loaimonans = await getAllLoaiMonAn();
        setCategory(loaimonans);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const onChangeLoaiMonAnHandler = (id) => {
    const fetchData = async () => {
      try {
        const monans = await getMonAnFomLoaiMonAn(id);
        setMenu(monans);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
  console.log(menu);
  return (
    <CTabs
      activeTab={"MÓN KHAI VỊ"}
      onActiveTabChange={(e) => onChangeLoaiMonAnHandler(e)}
    >
      <CNav variant="tabs">
        {category.length > 0
          ? category.map((el, key) => (
              <CNavItem key={el.lma_id} className="ml-3 mr-3">
                <CNavLink data-tab={el.lma_id}>{el.lma_ten}</CNavLink>
              </CNavItem>
            ))
          : null}
      </CNav>
      <CTabContent className="tab-content">
        {category.length > 0
          ? categoryData.map((el, key) => {
              const categoryId = el.lma_id;
              return (
                <CTabPane
                  data-tab={el.lma_id}
                  key={categoryId}
                  className="ml-3 mr-3"
                >
                  <CRow className="pt-4">
                    {menu.map((el) => (
                      <CCol lg="3">
                        <figure
                          class="figure"
                          onClick={(e) =>
                            onClickMenuHandler(
                              el.ma_id,
                              table,
                              el.ma_ten,
                              el.ma_giaban
                            )
                          }
                        >
                          <img
                            src={
                              "https://cdn-app.kiotviet.vn/sample/coffee/6.jpg"
                            }
                            class="figure-img img-fluid rounded"
                            alt="HinhAnh"
                          />
                          <figcaption class="figure-caption">
                            {el.ma_ten}
                          </figcaption>
                        </figure>
                      </CCol>
                    ))}
                  </CRow>
                </CTabPane>
              );
            })
          : null}
      </CTabContent>
    </CTabs>
  );
};

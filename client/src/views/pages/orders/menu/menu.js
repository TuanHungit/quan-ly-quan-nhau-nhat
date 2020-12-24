import React, { useState } from "react";
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
import { classNames } from "classnames";

export default ({ onClickMenuHandler, table }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CTabs activeTab={"MÓN KHAI VỊ"}>
      <CNav variant="tabs">
        {categoryData.map((el, key) => (
          <CNavItem key={el.lma_id}>
            <CNavLink data-tab={el.lma_ten}>{el.lma_ten}</CNavLink>
          </CNavItem>
        ))}
      </CNav>
      <CTabContent>
        {categoryData.map((el, key) => {
          const categoryId = el.lma_id;
          return (
            <CTabPane data-tab={el.lma_ten} key={categoryId}>
              <CRow className="pt-4">
                {menuData
                  .filter((food) => food.ma_lmaid === categoryId)
                  .map((el) => (
                    <CCol lg="3">
                      <figure
                        className="figure"
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
                          src={el.ma_hinhanh}
                          className="figure-img img-fluid rounded"
                          alt="HinhAnh"
                        />
                        <figcaption className="figure-caption">
                          {el.ma_ten}
                        </figcaption>
                      </figure>
                    </CCol>
                  ))}
              </CRow>
            </CTabPane>
          );
        })}
      </CTabContent>
    </CTabs>
  );
};

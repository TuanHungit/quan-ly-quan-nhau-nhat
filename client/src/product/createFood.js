import React from "react";
const createFood = () => {
  return (
    <div>
      <CModal show={props.modal} onClose={props.toggleModal} size="xl">
        <CModalHeader closeButton>
          {" "}
          <h3>Thêm mới loại món sản phẩm</h3>
        </CModalHeader>
        <form onSubmit={onSubmit}>
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="4" className="pt-2">
                      Tên loại {"  "}
                      <CTooltip content="Hello world! A tooltip example">
                        <i class="fas fa-info-circle"></i>
                      </CTooltip>
                    </CCol>
                    <CCol lg="8">
                      <input
                        type="text"
                        placeholder="Nhập tên loại thức ăn"
                        className="inp"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        required
                      />
                    </CCol>
                  </CRow>
                </CCol>
                {/* <CCol lg="6" className="pt-2">
                  <QuillEditor
                    title="Mô tả về khuyến mãi"
                    key={"toolbar5"}
                    placeholder={"Nhập mô tả về khuyến mãi"}
                    onEditorChange={(value) => setDescription(value)}
                    id={"toolbar5"}
                    onFilesChange={(files) => setFiles(files)}
                  />
                </CCol> */}
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" type="submit">
              Thêm mới
            </CButton>{" "}
            <CButton color="secondary" onClick={props.toggleModal}>
              Bỏ qua
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </div>
  );
};

export default createFood;

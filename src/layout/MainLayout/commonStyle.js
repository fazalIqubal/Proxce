import styled from "styled-components";
import { palette } from "styled-theme";

const AppHolder = styled.div`
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: ${palette("primary", 0)};
  }

  .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
  }

  .ant-layout-sider-collapsed .nav-text {
    display: none;
  }

  .ant-select-selection{
    border: 0;
    box-shadow: -1px -1px 0px #ececec, 0px 0px 0px #ececec, 1px 1px 0px #ececec
  }

 .ant-input{
    border: 0;
    box-shadow: -1px -1px 0px #ececec, 0px 0px 0px #ececec, 1px 1px 0px #ececec
  }

  .ant-layout {
    background: ${palette("secondary", 1)};

    .ant-layout-content {
      background: ${palette("secondary", 1)} !important;

    &.platformContentMainLayout {
      overflow: auto;
      overflow-x: hidden;
      @media only screen and (min-width: 768px) and (max-width: 1220px) {
        width: calc(100% - 80px);
        flex-shrink: 0;
      }

      @media only screen and (max-width: 767px) {
        width: 100%;
        flex-shrink: 0;
      }
    }
  }

  .isoLayoutContent {
    width: 100%;
    padding: 35px;
    background-color: #ffffff;
    border: 1px solid ${palette("border", 0)};
    height: 100%;
  }

  .isoZoomControl{
    position: absolute;
    left: 15px;
    top: 100px;
    z-index: 1;
  }

  .tableContainer{
    width: 100%;
    padding: 0px 30px;
  }
  .tableContainer.locationContainer{
    padding: 0px;

    .ant-tabs-content{
      padding: 0 30px;
    }
    .ant-tabs-nav-container{
      font-size: 18px;
    }
  }
  .ant-tabs-bar{
    background: #fff;
    padding: 0px 30px;
  }
  .ant-modal-body {
    .ant-tabs-content{
      padding: 0px 30px;
    }
  }
  .experienceContainer{
    width: 100%
  }

  .isoSortableComponent{
    position: absolute;
    right: 25px;
    top: 160px;
    background: #f9f9f9;
    padding: 15px 0px;
    padding-top: 0px;
    max-width: max-content;
    border-radius: 5px;
    box-shadow: -2px 2px 4px #ececec, 2px -2px 4px #ececec, 2px 0px 4px #ececec;
  }

  .isoTagControl{
    position: absolute;
    right: 25px;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    top: 80px;
    box-shadow: -2px 2px 4px #ececec, 2px -2px 4px #ececec, 2px 0px 4px #ececec;
  }

  .platformLayout {
    width: calc(100% - 240px);
    flex-shrink: 0;
    overflow-x: hidden !important;

    @media only screen and (max-width: 767px) {
      width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1220px) {
      width: calc(100% - 80px);
      width: 100%;
    }
  }

  .ant-layout-footer {
    font-size: 13px;
    @media (max-width: 767px) {
      padding: 10px 20px;
    }
  }

  button {
    border-radius: 0;
  }
`;

export default AppHolder;

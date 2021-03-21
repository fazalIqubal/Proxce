import styled from 'styled-components';
import { palette } from 'styled-theme';
import React from 'react';
import experienceIcon from '../../../image/flowDesigner/experiences_icon.png';
import selectedExperienceIcon from '../../../image/flowDesigner/experiences_select_icon.png';
import templatesIcon from '../../../image/flowDesigner/templates_icon.png';
import selectedTemplatesIcon from '../../../image/flowDesigner/templates_select_icon.png';
import toolsIcon from '../../../image/flowDesigner/tools_icon.png';
import selectedToolsIcon from '../../../image/flowDesigner/tools_select_icon.png';
import connectionsIcon from '../../../image/flowDesigner/connections_icon.png';
import selectedConnectionsIcon from '../../../image/flowDesigner/connections_select_icon.png';
import triggerIcon from '../../../image/flowDesigner/submenu_trigger_icon.png';
import selectedTriggerIcon from '../../../image/flowDesigner/submenu_trigger_select_icon.png';
import actionIcon from '../../../image/flowDesigner/submenu_action_icon.png';
import selectedActionIcon from '../../../image/flowDesigner/submenu_action_select_icon.png';
import configurationsIcon from '../../../image/flowDesigner/configurations_icon.png';
import selectedConfigurationsIcon from '../../../image/flowDesigner/configurations_select_icon.png';
import locationIcon from '../../../image/flowDesigner/submenu_location_icon.png';
import selectedLocationIcon from '../../../image/flowDesigner/submenu_location_select_icon.png';
import videoIcon from '../../../image/flowDesigner/submenu_video_icon.png';
import selectedVideoIcon from '../../../image/flowDesigner/submenu_video_select_icon.png';
import proxebuttonIcon from '../../../image/flowDesigner/submenu_proxce_button_icon.png';
import selectedProxebuttonIcon from '../../../image/flowDesigner/submenu_proxce_button_select_icon.png';
import activitylogIcon from '../../../image/flowDesigner/activity_log_icon.png';
import selectedActivitylogIcon from '../../../image/flowDesigner/activity_log_select_icon.png';


import tenantbuttonIcon from '../../../image/flowDesigner/account_circle.svg';
import dashboardbuttonIcon from '../../../image/flowDesigner/dashboard.svg';
import aspect_ratiobuttonIcon from '../../../image/flowDesigner/aspect_ratio.svg';
import reportbuttonIcon from '../../../image/flowDesigner/report-icon.svg';
import applicationbuttonIcon from '../../../image/flowDesigner/application-icon.png';
import connectionbuttonIcon from '../../../image/flowDesigner/connections_icon.png';
import appdashboardbuttonIcon from '../../../image/flowDesigner/dashboard-icon.png';
import usersbuttonIcon from '../../../image/flowDesigner/users-icon.svg';
import spoofAtemptsbuttonIcon from '../../../image/flowDesigner/spoof-icon.svg';
import activityLogsbuttonIcon from '../../../image/ic_avcivitylogs.png';
// Transition
export function transition(timing = 0.3) {
  return `
      -webkit-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -moz-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -ms-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -o-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
  `;
}

// Border Radius
export function borderRadius(radius = 0) {
  return `
      -webkit-border-radius: ${radius};
      -moz-border-radius: ${radius};
      -ms-transition: ${radius};
      -o-border-radius: ${radius};
      border-radius: ${radius};
  `;
}

// Box Shadow
export function boxShadow(shadow = 'none') {
  return `
      -webkit-box-shadow: ${shadow};
      -moz-box-shadow: ${shadow};
      box-shadow: ${shadow};
  `;
}

const rtl = document.getElementsByTagName('html')[0].getAttribute('dir');
const WithDirection = Component => props => {
  return <Component {...props} data-rtl={rtl} />;
};


const SidebarWrapper = styled.div`
  .leftBar {
    position: absolute;
    width: 75px;
    left: 0;
    height: 100%;
    top: 0px;
    background: #f2f6fa;
    z-index: 1000;
    border-right: 1px solid #e0e0e0;

    .profile-button{
      position: absolute;
      bottom: 10px;
      text-align: center;
      left: 0px;
      
      .notification-icon {
        height: 28px;
      }
      .isoImgWrapper{
        width: 72px;
        height: 72px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: relative;
        background-color: #f2f6fa;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-transition: 50%;
        -o-border-radius: 50%;
        border-radius: 50%;
        cursor: pointer;

        img{
          height: 100%;
          object-fit: cover;
        }
        .userActivity{
          width: 10px;
          height: 10px;
          display: block;
          background-color: #7ED321;
          position: absolute;
          bottom: 15px;
          right: 15px;
          border: 1px solid #ffffff;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          -ms-transition: 50%;
          -o-border-radius: 50%;
          border-radius: 50%;
        }

        .login-user-bg {
          background: #5FB0E5 0% 0% no-repeat padding-box;
          border-radius: 25px;
          padding: 10px;
          height: 50px;
          width: 50px;
          color: #ffffff;
          line-height: 31px;
          font-size: 18px;
          font-weight: bold;
        }
      }
      
    }

    ul{
      text-align: center;

      li:first-child{
        height: 70px;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px;
        .logo{
          background: #F8F9FB 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 7px;
          opacity: 1;
          padding: 6px;
        }
        img{
          width: 40px;
          height: 40px;
          padding: 0px;
        }
      }
      li{
        padding-top: 20px;
        height: 55px;
        cursor: pointer;
        
        .icon{
          border-right: 2px solid transparent;
          img{
            width: 30px;
          }
        } 
      }

      li.active{
        .icon{
          border-right: 2px solid #0185e9;
        }
      }
    }
  }
  
  .platformSidebar.ant-layout-sider {
    flex: 0 0 240px !important;
    max-width: 240px !important;
    min-width: 240px !important;
    width: 240px !important;
  }

  .platformSidebar.ant-layout-sider-collapsed {
    flex: 0 0 80px !important;
    max-width: 80px !important;
    min-width: 80px !important;
    width: 80px !important;
  }

  .platformSidebar {
    z-index: 1000;
    background: ${palette('secondary', 0)};
    width: 240px;
    flex: 0 0 240px;
    left: 75px;
    margin-right: 75px;
  
    .ant-layout-sider-children{
      box-shadow: inset -8px 0px 15px -6px #e8e8e8;
    }
    .scrollarea {
      height: calc(100vh - 70px);
    }

    @media only screen and (max-width: 767px) {
      width: 240px !important;
      flex: 0 0 240px !important;
    }

    &.ant-layout-sider-collapsed {
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      height: 60px;
      background: #f2f6fa;
      margin: 0;
      padding: 0 10px;
      text-align: center;
      overflow: hidden;
      box-shadow: inset -8px 0px 15px -6px #e8e8e8;
      ${borderRadius()};

      h3 {
        a {
          font-size: 30px;
          line-height: 70px;
          letter-spacing: 0px;
          color: ${palette('grayscale', 6)};
          display: block;
          text-decoration: none;
          font-weight: 700;
          text-align: left;
          margin-left: 12px;
        }
      }
    }

    &.ant-layout-sider-collapsed {

      .isoLogoWrapper {
        padding: 0;

        h3 {
          a {
            font-size: 27px;
            font-weight: 600;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-top: 35px;
      padding-bottom: 35px;
      background: transparent;

      a {
        text-decoration: none;
        font-weight: 520;
      }

      .ant-menu-item {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 24px;
        margin: 0;
      }

      .ant-collapse-header >div >span{
        font-weight: bold;
      }

      .ant-collapse-content > div > li{
        font-weight: bold;
      }

      .isoMenuHolder {
        display: flex;
        align-items: center;

        .menu-counter{
          position: absolute;
          right: 20px;
          color: #0185e9;
        }
        
        i {
          font-size: 19px;
          color: #303b4e;
          margin: ${props =>
            props['data-rtl'] === 'rtl' ? '0 0 0 18px' : '0 18px 0 0'};
          width: 20px;
          height: 20px;
          background-size: 20px;
          ${transition()};
        }
        i.experienceBg{
          -webkit-mask-image: url(${experienceIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.templatesBg{
          -webkit-mask-image: url(${templatesIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.toolsBg{
          -webkit-mask-image: url(${toolsIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.connectionsBg{
          -webkit-mask-image: url(${connectionsIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.triggerBg{
          -webkit-mask-image: url(${triggerIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.actionBg{
          -webkit-mask-image: url(${actionIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.configurationsBg{
          -webkit-mask-image: url(${configurationsIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.locationBg{
          -webkit-mask-image: url(${locationIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.videoBg{
          -webkit-mask-image: url(${videoIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.proxebuttonBg{
          -webkit-mask-image: url(${proxebuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.activitylogBg{
          -webkit-mask-image: url(${activitylogIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.tentantbuttonBg{
          -webkit-mask-image: url(${tenantbuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195
        }
        i.reportbuttonBg{
          -webkit-mask-image: url(${reportbuttonIcon});
          -webkit-mask-size: 16px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195;
          position: relative;
          left: 2px;
        }
        i.dashboardbuttonBg{
          -webkit-mask-image: url(${dashboardbuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195
        }
        i.apiStatusbuttonBg{
          -webkit-mask-image: url(${aspect_ratiobuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195
        }
        i.applicationbuttonBg{
          -webkit-mask-image: url(${applicationbuttonIcon});
          -webkit-mask-size: 16px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195
        }
        i.connectionbuttonBg{
          -webkit-mask-image: url(${connectionbuttonIcon});
          -webkit-mask-size: 22px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195;
          position: relative;
          right: 3px;
        }
        i.appdashboardbuttonBg{
          -webkit-mask-image: url(${appdashboardbuttonIcon});
          -webkit-mask-size: 16px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195
        }
        i.usersbuttonBg{
          -webkit-mask-image: url(${usersbuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195
        }
        i.spoofAtemptsbuttonBg{
          -webkit-mask-image: url(${spoofAtemptsbuttonIcon});
          -webkit-mask-size: 18px;
          -webkit-mask-repeat: no-repeat;
          background-color: #788195;
        }
        i.activityLogsBg{
          -webkit-mask-image: url(${activityLogsbuttonIcon});
          -webkit-mask-size: 15px;
          background-color: #788195;
          -webkit-mask-repeat: no-repeat;
          left: 2px;
          position: relative;
        }

      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        font-size: 14px;
        color: #303b4e;
        font-weight: 520;
        ${transition()};
      }

      li.ant-menu-item-active {
        &:hover {
          i,
          .nav-text {
            color: #289cf5;
          }
        }
      }

      .ant-menu-item-selected {
        background-color: #f2f6fa !important;
        box-shadow: inset -8px 0px 15px -6px #e8e8e8;

        .anticon {
          color: #289cf5;
        }

        i {
          background-color: #289cf5;
        }

        i.experienceBg{
          -webkit-mask-image: url(${selectedExperienceIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.templatesBg{
          -webkit-mask-image: url(${selectedTemplatesIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.toolsBg{
          -webkit-mask-image: url(${selectedToolsIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.connectionsBg{
          -webkit-mask-image: url(${selectedConnectionsIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.triggerBg{
          -webkit-mask-image: url(${selectedTriggerIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.actionBg{
          -webkit-mask-image: url(${selectedActionIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.configurationsBg{
          -webkit-mask-image: url(${selectedConfigurationsIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.locationBg{
          -webkit-mask-image: url(${selectedLocationIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.videoBg{
          -webkit-mask-image: url(${selectedVideoIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.proxebuttonBg{
          -webkit-mask-image: url(${selectedProxebuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.activitylogBg{
          -webkit-mask-image: url(${selectedActivitylogIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
        }
        i.tentantbuttonBg{
          -webkit-mask-image: url(${tenantbuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
        }
        i.reportbuttonBg{
          -webkit-mask-image: url(${reportbuttonIcon});
          -webkit-mask-size: 16px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
          position: relative;
          left: 2px;
        }
        i.dashboardbuttonBg{
          -webkit-mask-image: url(${dashboardbuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
        }
        i.apiStatusbuttonBg{
          -webkit-mask-image: url(${aspect_ratiobuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
        }
        i.applicationbuttonBg{
          -webkit-mask-image: url(${applicationbuttonIcon});
          -webkit-mask-size: 16px;
          -webkit-mask-repeat: no-repeat;
           background-color: #289cf5;
        }
        i.connectionbuttonBg{
          -webkit-mask-image: url(${connectionbuttonIcon});
          -webkit-mask-size: 22px;
          -webkit-mask-repeat: no-repeat;
           background-color: #289cf5;
           position: relative;
           right: 3px;
        }
        i.appdashboardbuttonBg{
          -webkit-mask-image: url(${appdashboardbuttonIcon});
          -webkit-mask-size: 16px;
          -webkit-mask-repeat: no-repeat;
           background-color: #289cf5;
        }
        i.usersbuttonBg{
          -webkit-mask-image: url(${usersbuttonIcon});
          -webkit-mask-size: 20px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
        }
        i.spoofAtemptsbuttonBg{
          -webkit-mask-image: url(${spoofAtemptsbuttonIcon});
          -webkit-mask-size: 18px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
        }
        i.activityLogsBg{
          -webkit-mask-image: url(${activityLogsbuttonIcon});
          -webkit-mask-size: 15px;
          -webkit-mask-repeat: no-repeat;
          background-color: #289cf5;
          -webkit-mask-repeat: no-repeat;
          left: 2px;
          position: relative;
        }
       
        .nav-text {
          color: #289cf5;
          font-weight: 600;
        }
      }

      > li.ant-menu-item-active {
        &:hover {
          i,
          .nav-text {
            color: #289cf5;
          }
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette('secondary', 5)};
    }

    .ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a{
      color: ${palette('secondary', 2)};
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : 'auto')};
          right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '25px')};

          &:before,
          &:after {
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }

          ${'' /* &:after {
            content: '\f123';
            font-family: 'Ionicons' !important;
            font-size: 16px;
            color: inherit;
            left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
            right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
            ${transition()};
          } */};
        }

        &:hover {
          .ant-menu-submenu-arrow {
            display: none

            &:before,
            &:after {
              color: #ffffff;
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          padding-left: ${props =>
            props['data-rtl'] === 'rtl' ? '0px !important' : '74px !important'};
          padding-right: ${props =>
            props['data-rtl'] === 'rtl' ? '74px !important' : '0px !important'};
          font-size: 13px;
          font-weight: 520;
          margin: 0;
          color: inherit;
          background-color: #f2f6fa !important;
          ${transition()};

          &:hover {
            a {
              color: #ffffff !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;

        .ant-menu-item{
          box-shadow: inset -8px 0px 15px -6px #e8e8e8
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline >  {

        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export default WithDirection(SidebarWrapper);

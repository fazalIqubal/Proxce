
import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import leftBtn from '../../../image/flowDesigner/menu.svg';

const rtl = document.getElementsByTagName('html')[0].getAttribute('dir');
const WithDirection = Component => props => {
  return <Component {...props} data-rtl={rtl} />;
};

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


const TopbarWrapper = styled.div`
  .platformTopbar {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 0;
    padding: ${props =>
      props['data-rtl'] === 'rtl' ? '0 265px 0 31px' : '0 45px 0 345px'};
    z-index: 1000;
    height: 60px !important;
    ${transition()};
    box-shadow: 0px 1px 0px #E6EAEE;
    @media only screen and (max-width: 767px) {
      padding: ${props =>
        props['data-rtl'] === 'rtl'
          ? '0px 260px 0px 15px !important'
          : '0px 15px 0px 260px !important'};
    }

    &.collapsed {
      padding: ${props =>
        props['data-rtl'] === 'rtl' ? '0 109px 0 31px' : '0 31px 0 184px'};
      @media only screen and (max-width: 767px) {
        padding: ${props =>
          props['data-rtl'] === 'rtl'
            ? '0px 15px !important'
            : '0px 15px !important'};
      }
      .isoLeft {

        @media only screen and (min-width: 1000px) {
          min-width: 22% !important;
        }
        .email-input{
          @media only screen and (min-width: 1000px) {
            margin-left: 0px !important;
          }
          @media only screen and (min-width: 1200px) {
            margin-left: 0px !important;
          }
          @media only screen and (min-width: 1300px) {
            margin-left: 0px !important;
          }
          input{
            @media only screen and (min-width: 1000px) {
              width: 130px !important;
              font-size: 12px !important;
              padding: 0px 5px !important;
            }
            @media only screen and (min-width: 1200px) {
              width: auto !important;
              font-size: 12px !important;
              padding: 0px 5px !important;
            }
            @media only screen and (min-width: 1300px) {
              width: auto !important;
              font-size: 12px !important;
              padding: 0px 5px !important;
            }
            @media only screen and (min-width: 1400px) {
              width: 200px !important;
              font-size: 12px !important;
              padding: 0px 5px !important;
            }
          }
        }
      }
      .isoMiddle{
        @media only screen and (min-width: 1000px) {
          min-width: 18% !important;
        }
        @media only screen and (min-width: 1200px) {
          min-width: 20% !important;
        }
        @media only screen and (min-width: 1300px) {
          min-width: 20% !important;
        }
        @media only screen and (min-width: 1400px) {
          min-width: 20% !important;
        }
        ul{
          li{
            @media only screen and (min-width: 1000px) {
              font-size: 12px !important;
              margin-right: 6px !important;
            }
            @media only screen and (min-width: 1200px) {
              font-size: 12px !important;
              margin-right: 15px !important;
            }
            @media only screen and (min-width: 1300px) {
              font-size: 15px !important;
              margin-right: 15px !important;
            }
            @media only screen and (min-width: 1400px) {
              font-size: 15px !important;
              margin-right: 15px !important;
            }
          }
        }
      }
      .isoRight{
        li {
          @media only screen and (min-width: 1000px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '15px' : '0')} !important;
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '15px')} !important;
          }
          @media only screen and (min-width: 1200px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '20px' : '0')} !important;
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '20px')} !important;
          }
          @media only screen and (min-width: 1300px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : '0')} !important;
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '25px')} !important;
          }
          @media only screen and (min-width: 1400px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '30px' : '0')} !important;
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '30px')} !important;
          }
        }
      }
    }
    .triggerBtn {
      width: 24px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 0;
      outline: 0;
      position: relative;
      cursor: pointer;

      &:before {
        content: '\f108';
        font-family: 'Ionicons';
        font-size: 26px;
        color: inherit;
        line-height: 0;
        position: absolute;
      }
    }
    .page_name{
      margin-left: 18px;
      color: black;
      height: 100%;
      font-size: 22px;
      display: inline-flex;
      vertical-align: top;
      font-family: 'nunito-semiBold';
      text-transform: capitalize;
    }
    .site_name{
      margin-left: 0px 25px 0px 0px;
      height: 100%;
      font-size: 25px;
      display: inline-flex;
      vertical-align: top;
      font-weight: 600;
      text-transform: capitalize;
      float: right;
    }
    .leftBtn{
      -webkit-mask-box-image: url(${leftBtn});
      background-color: black;
      height: 12px;
      width: 20px;
      cursor: pointer;
      display: inline-block;
    }
    .page {
      display: flex;
      width: 100%;
      .isoLeft {
        display: flex;
        align-items: center;
        min-width: 30%;
        
        @media only screen and (min-width: 1000px) {
          min-width: 22%;
        }
        @media only screen and (min-width: 1200px) {
          min-width: 25%;
        }
        @media only screen and (min-width: 1300px) {
          min-width: 25%;
        }   
        
        

        .leftBtn{
          -webkit-mask-box-image: url(${leftBtn});
          background-color: black;
          height: 12px;
          width: 20px;
          cursor: pointer;
          display: inline-block;
        }
        .email-input{
          margin-left: 25px;
          position: relative;
          @media only screen and (min-width: 1000px) {
            margin-left: 0px;
          }
          @media only screen and (min-width: 1200px) {
            margin-left: 0px;
          }
          @media only screen and (min-width: 1300px) {
            margin-left: 0px;
          }

          input{
            height: 32px;
            border-radius: 30px;
            border: 1px solid #ccc;
            padding: 0px 15px;
            outline: 0;
            font-weight: 520;
            @media only screen and (min-width: 1000px) {
              width: 115px;
              font-size: 12px;
              padding: 0px 5px;
            }
            @media only screen and (min-width: 1200px) {
              width: auto;
              font-size: 12px;
              padding: 0px 5px;
            }
            @media only screen and (min-width: 1300px) {
              width: auto;
              font-size: 12px;
              padding: 0px 5px;
            }
            @media only screen and (min-width: 1400px) {
              width: 200px;
              font-size: 12px;
              padding: 0px 5px;
            }
          }
          input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color: #ccc;
            font-weight: 400;
          }
          input::-moz-placeholder { /* Firefox 19+ */
            color: #ccc;
            font-weight: 400;
          }
          input:-ms-input-placeholder { /* IE 10+ */
            color: #ccc;
            font-weight: 400;
          }
          input:-moz-placeholder { /* Firefox 18- */
            color: #ccc;
            font-weight: 400;
          }
          i.email-input-icon{
            position: absolute;
            right: 15px;
          }
        }
        @media only screen and (max-width: 767px) {
          margin: ${props =>
            props['data-rtl'] === 'rtl' ? '0 0 0 20px' : '0 20px 0 0'};
        }
        .PageTitle{
          display: -webkit-inline-flex;
          display: -ms-inline-flex;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          width: 24px;
          height: 100%;
        }
        .triggerBtn {
          width: 24px;
          height: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: 0;
          outline: 0;
          position: relative;
          cursor: pointer;
  
          &:before {
            content: '\f108';
            font-family: 'Ionicons';
            font-size: 26px;
            color: inherit;
            line-height: 0;
            position: absolute;
          }
        }
      }
      
      .isoMiddle{
        display: flex;
        align-items: center;
        min-width: 25%;
        @media only screen and (min-width: 1000px) {
          min-width: 18%;
        }
        @media only screen and (min-width: 1200px) {
          min-width: 20%;
        }
        @media only screen and (min-width: 1300px) {
          min-width: 20%;
        }
        @media only screen and (min-width: 1400px) {
          min-width: 20%;
        }

        ul{

          li{
            display: inline-block;
            margin-right: 25px;
            height: 60px;
            cursor: pointer;
            @media only screen and (min-width: 1000px) {
              font-size: 11px;
              margin-right: 6px;
            }
            @media only screen and (min-width: 1200px) {
              font-size: 12px;
              margin-right: 15px;
            }
            @media only screen and (min-width: 1300px) {
              font-size: 12px;
              margin-right: 15px;
            }
            @media only screen and (min-width: 1400px) {
              font-size: 15px;
              margin-right: 15px;
            }
          }
          li.active{
            border-bottom: 2px solid #0185e9;
            color: #0185e9;
          }
        }
      }

      .isoRight {
        display: flex;
        align-items: center;
        min-width: 55%;

        .top-btn{
          border: 0;
          background: #0185e9;
          color: #fff;
          width: -webkit-max-content;
          width: -moz-max-content;
          width: max-content;
          height: 40px;
          border-radius: 3px;
          cursor: pointer;
          line-height: 40px;
          padding: 0px 20px;
          font-size: 18px;
        }

        .right-button{
          position: absolute;
          right: 30px;      
        }

        li {
          margin-left: ${props => (props['data-rtl'] === 'rtl' ? '35px' : '0')};
          margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '35px')};
          cursor: pointer;
          line-height: normal;
          position: relative;
          display: inline-block;
          @media only screen and (min-width: 1000px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '6px' : '0')};
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '6px')};
          }
          @media only screen and (min-width: 1200px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '10px' : '0')};
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '10px')};
          }
          @media only screen and (min-width: 1300px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '15px' : '0')};
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '15px')};
          }
          @media only screen and (min-width: 1400px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '20px' : '0')};
            margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '20px')};
          }

          .play-btn{
            border: 1px solid #ccc;
            border-radius: 50%;
            background: #fff;
            width: 40px;
            height: 40px;
            cursor: pointer;
            outline: 0;

            i{
              color: #0185e9;
              font-size: 30px;
              line-height: 40px;
              margin-left: 5px;
            }
          }

          .save-btn{
            border: 0;
            background: #0185e9;
            color: #fff;
            width: 80px;
            height: 32px;
            border-radius: 5px;
            cursor: pointer;
          }

          @media only screen and (max-width: 360px) {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : '0')};
            margin-right: ${props =>
              props['data-rtl'] === 'rtl' ? '0' : '25px'};
          }

          &:last-child {
            margin: 0;
          }

          i {
            font-size: 24px;
            color: ${palette('text', 0)};
            line-height: 1;
          }

          .isoIconWrapper {
            position: relative;
            line-height: normal;

            span {
              font-size: 12px;
              color: #fff;
              background-color: ${palette('secondary', 1)};
              width: 20px;
              height: 20px;
              display: -webkit-inline-flex;
              display: -ms-inline-flex;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              line-height: 20px;
              position: absolute;
              top: -8px;
              left: ${props =>
                props['data-rtl'] === 'rtl' ? 'inherit' : '10px'};
              right: ${props =>
                props['data-rtl'] === 'rtl' ? '10px' : 'inherit'};
              ${borderRadius('50%')};
            }
          }

          &.isoMail {
            .isoIconWrapper {
              span {
                background-color: ${palette('color', 0)};
              }
            }
          }

          &.isoNotify {
            .isoIconWrapper {
              span {
                background-color: ${palette('primary', 2)};
              }
            }
          }

          &.isoMsg {
            .isoIconWrapper {
              span {
                background-color: ${palette('color', 1)};
              }
            }
          }

          &.isoCart {
            .isoIconWrapper {
              span {
                background-color: ${palette('color', 2)};
              }
            }
          }

          &.isoUser {
            .isoImgWrapper {
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              background-color: ${palette('grayscale', 9)};
              ${borderRadius('50%')};

              img {
                height: 100%;
                object-fit: cover;
              }

              .userActivity {
                width: 10px;
                height: 10px;
                display: block;
                background-color: ${palette('color', 3)};
                position: absolute;
                bottom: 0;
                right: 3px;
                border: 1px solid #ffffff;
                ${borderRadius('50%')};
              }
            }
          }
        }
        li.withBorder{
          border-left: 1px solid #dedede;
          padding: 0px 25px;
          border-right: 1px solid #dedede;
        }
      }
    }
  }

  .isoUserDropdown {
    .ant-popover-inner {
      .ant-popover-inner-content {
        .isoUserDropdownContent {
          padding: 7px 0;
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffffff;
          width: 220px;
          min-width: 160px;
          flex-shrink: 0;
          .isoBorderRadius(5px);
          ${borderRadius('5px')};
          ${boxShadow('0 2px 10px rgba(0,0,0,0.2)')};
          ${transition()};

          .isoDropdownLink {
            font-size: 13px;
            color: ${palette('text', 1)};
            line-height: 1.1;
            padding: 7px 15px;
            background-color: transparent;
            text-decoration: none;
            display: flex;
            justify-content: flex-start;
            ${transition()};

            &:hover {
              background-color: ${palette('secondary', 6)};
            }
          }
        }
      }
    }
  }

  // Dropdown
  .ant-popover {
    .ant-popover-inner {
      .ant-popover-inner-content {
        .isoDropdownContent {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffffff;
          width: 360px;
          min-width: 160px;
          flex-shrink: 0;
          ${borderRadius('5px')};
          ${boxShadow('0 2px 10px rgba(0,0,0,0.2)')};
          ${transition()};

          @media only screen and (max-width: 767px) {
            width: 310px;
          }

          .isoDropdownHeader {
            border-bottom: 1px solid #f1f1f1;
            margin-bottom: 0px;
            padding: 15px 30px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            h3 {
              font-size: 14px;
              font-weight: 500;
              color: ${palette('text', 0)};
              text-align: center;
              text-transform: uppercase;
              margin: 0;
            }
          }

          .isoDropdownBody {
            width: 100%;
            height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            background-color: ${palette('grayscale', 6)};

            .isoDropdownListItem {
              padding: 15px 30px;
              flex-shrink: 0;
              text-decoration: none;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              width: 100%;
              ${transition()};

              &:hover {
                background-color: ${palette('grayscale', 3)};
              }

              .isoListHead {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
              }

              h5 {
                font-size: 13px;
                font-weight: 500;
                color: ${palette('text', 0)};
                margin-top: 0;
              }

              p {
                font-size: 12px;
                font-weight: 400;
                color: ${palette('text', 2)};
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .isoDate {
                font-size: 11px;
                color: ${palette('grayscale', 1)};
                flex-shrink: 0;
              }
            }
          }

          .isoViewAllBtn {
            font-size: 13px;
            font-weight: 500;
            color: ${palette('text', 2)};
            padding: 10px 15px 20px;
            display: flex;
            text-decoration: none;
            align-items: center;
            justify-content: center;
            text-align: center;
            ${transition()};

            &:hover {
              color: ${palette('primary', 0)};
            }
          }

          .isoDropdownFooterLinks {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 30px 20px;

            a {
              font-size: 13px;
              font-weight: 500;
              color: ${palette('text', 0)};
              text-decoration: none;
              padding: 10px 20px;
              line-height: 1;
              border: 1px solid ${palette('border', 1)};
              display: flex;
              align-items: center;
              justify-content: center;
              ${transition()};

              &:hover {
                background-color: ${palette('primary', 0)};
                border-color: ${palette('primary', 0)};
                color: #ffffff;
              }
            }

            h3 {
              font-size: 14px;
              font-weight: 500;
              color: ${palette('text', 0)};
              line-height: 1.3;
            }
          }

          &.withImg {
            .isoDropdownListItem {
              display: flex;
              flex-direction: row;

              .isoImgWrapper {
                width: 35px;
                height: 35px;
                overflow: hidden;
                margin-right: 15px;
                display: -webkit-inline-flex;
                display: -ms-inline-flex;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                background-color: ${palette('grayscale', 9)};
                ${borderRadius('50%')};

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

              .isoListContent {
                width: 100%;
                display: flex;
                flex-direction: column;

                .isoListHead {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                }

                h5 {
                  margin-bottom: 0;
                  padding-right: 15px;
                }

                .isoDate {
                  font-size: 11px;
                  color: ${palette('grayscale', 1)};
                  flex-shrink: 0;
                }

                p {
                  white-space: normal;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }

    &.topbarMail {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 519px) {
              right: -170px;
            }
          }
        }
      }
    }

    &.topbarMessage {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 500px) {
              right: -69px;
            }
          }
        }
      }
    }

    &.topbarNotification {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 500px) {
              right: -120px;
            }
          }
        }
      }
    }

    &.topbarAddtoCart {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 465px) {
              right: -55px;
            }

            .isoDropdownHeader {
              margin-bottom: 0;
            }

            .isoDropdownBody {
              background-color: ${palette('grayscale', 6)};
            }
          }
        }
      }
    }
  }
`;

export default WithDirection(TopbarWrapper);

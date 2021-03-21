import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const LiveButtonModal = styled.div`
  .switch-container{
    position: relative;

    .switch {
      height: 30px;
      width: 102px;
      background: #d0d0d0;
      border: 1px solid #c7c5c5;
      border-radius: 3px;
  
      input[type='radio'] {
        visibility: hidden;
        display: contents;
      }
    
      label {
        color: #fff;
        font-size: 18px;
        font-weight: 700;
      }

      .switch-label {
        position: relative;
        display: inline-block;
        z-index: 2;
        width: 50px;
        line-height: 30px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
  
        :active{
          font-weight: 700;
        }
      }
      .switch-input{
        &.checked {
          + .switch-label {
            font-weight: 700;
            color: #fff;
            transition: 0.15s ease-out;
          }

          + .switch-label-on {
            background: #03d476;
            height: 27.5px;
          }
        }
      }
    }
  }
  .ant-switch{
    width: 80px;
    line-height: 30px;
    border-radius: 4px;
    height: 30px;

    &.ant-switch-checked{
      background-color: #03d476;

      .ant-switch-inner{
        margin-left: 8px;
      }
      :before, :after{
        width: 50%;
        height: 30px;
        left: 40px;
        top: -1px;
        margin-left: 0px;
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #ccc;
      }
      :after{
        box-shadow: none;
      }
    }
    .ant-switch-inner{
      font-size: 14px;
      font-weight: 600;
      margin-left: 40px;
    }

    :before, :after{
      width: 50%;
        height: 30px;
        left: -2px;
        top: -1px;
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #ccc;
    }
    :after{
      box-shadow: none;
    }
  }
`;

export default WithDirection(LiveButtonModal);

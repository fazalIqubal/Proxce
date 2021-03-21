import React, { Component } from "react";
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import { downloadUserFaceLog } from '../action/users.actions';
import { Modal, Button, Icon, Collapse, message } from "antd";
import { connect } from 'react-redux';
import _ from 'lodash';
const { Panel } = Collapse;
class FaceImportError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: {
        fileType: false
      },
      isSubmit: false,

    };

  }
  handleOk = () => {
    const { dispatch } = this.props;
    const { failedFace } = this.props;
    const transactionID = _.get(_.first(failedFace), 'TransactionID');
    const req = {
      "action": "download",
      "fileName": `Import/faces/${transactionID}.json`
    }
    dispatch(downloadUserFaceLog(req))
      .then((res) => {
        if (res.error) {
          message.error(res.message)
        }
        if (res.data && res.data.url) {
          const link = document.createElement('a');
          link.download = res.data.fileName;
          link.href = res.data.url;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.props.toggle();
        }

      });

  };
  handleCancel = () => {
    this.props.toggle();
  };

  render() {
    const { failedFace } = this.props;
    return (
      <div>
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button
                className="create-btn"
                key="back"
                type="primary"
                onClick={this.handleOk}
              >
                DOWNLOAD
              </Button>
              <Button
                className="cancle-btn"
                key="submit"
                onClick={this.handleCancel}
              >
                CANCEL
              </Button>
            </div>
          ]}
        >
          <div className="face-invalid-text">Found invalid primaryIDs</div>

          <Collapse
            bordered={false}
            defaultActiveKey={['0']}
            className="site-collapse-custom-collapse"
          >
            {
              failedFace.map((data, index) => {
                return <Panel
                  header={data.PrimaryID}
                  key={index + 1}
                  className="site-collapse-custom-panel"
                  extra={
                    <div>
                      <Icon type="exclamation-circle" theme="filled" />
                    </div>
                  }>
                  {data.files.map((file, idx) => {
                    return <p key={idx}>{file.fileName}</p>
                  })}
                </Panel>
              })
            }
          </Collapse>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  }
}
export default connect(mapStateToProps)(FaceImportError);
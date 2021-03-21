import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import './transactions.scss';
import { Icon, Row, Col, Tooltip, Tabs, Menu, Dropdown, Button } from 'antd';
import DeleteTenant from '../../tenant/component/deleteTenant'
import { history, faces, fromValidate } from '../../../helpers'
import moment from 'moment';
import user from "../../../image/user_preview.png";
import { getTransactionsById } from '../action/transactions.actions';
import ActionDetail from './actionDetail';
import JSONPretty from 'react-json-pretty';
const { TabPane } = Tabs

/* eslint eqeqeq: 0 */
export class TransactionsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      consentForm: false,
      formError: {},
      formSubmit: false,
      advanceSetting: false,
      transactionsDetail: {
        createdDate: new Date(),
      },
      activeKey: '1'
    }
  }



  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getTransactionsById(id))
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {

    }
  };

  handleChange = (e) => {
    const transactionsDetail = Object.assign({}, this.state.transactionsDetail)
    const name = e.target.name;
    const value = e.target.value;
    transactionsDetail[name] = value;
    this.setState({ transactionsDetail });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  handleActionChange = (e) => {

  }

  openDeleteModal = (isBlock) => {
    this.setState({ deleteModal: true, isEdit: false, isBlock })
  }

  toggleDeleteModal = () => {
    this.setState({ deleteModal: false })
  }

  goToTransactions = () => {
    history.push(`/transactions`)
  }

  copyText = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  }

  printObject(object) {
    return JSON.stringify(object);
  }

  goToFaceTab = () => {
    this.setState({ activeKey: '2' })
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  render() {
    const { isSubmit, formError } = this.state;
    const { transactionsDetail, userRawJson } = this.props;
    return (
      <div className="application-detail customer-detail user-detail">
        <div className="back-btn" onClick={() => { this.goToTransactions() }}>
          <Icon type="left" /> Back to Transactions
        </div>

        <div className="user-header-custom customer-header">
          <Row>
            <Col span={24}>
              <div className="user-image-header">
                <div className="user-image-box">
                  <img src={user} />
                  <span className='user-edit-icon'></span>
                </div>
                <div className="customer-details">
                  <span className="customer-name">{transactionsDetail.userName}</span>
                  <span className='user-status'>Authorized</span>
                  <div className="customer-id">
                    <div className='app-id'>PRIMARYID</div>
                    <div className='transactions-app-id'>{transactionsDetail.PrimaryID}</div>
                  </div>
                  <div className="customer-id">
                    <div className='app-id'>TRANSCTION DATE</div>
                    <div className='transactions-app-id'>{transactionsDetail.TransactionDate}</div>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        </div>

        <div className="tab-section">
          <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
            <TabPane tab="Face Authentication" key="1">
              <div className="transaction-detail-box">
                <Row>
                  <Col span={6}>
                    <div className="transaction-detail-containt">
                      <div className="transaction-detail-image-heading">Captured Image</div>
                      <div className="capture-image-box"><img src={transactionsDetail.faces} className='user-avatar capture-image' alt="" /></div><br></br>
                      <div className="transaction-detail-image-heading">Matched with</div>
                      <div className="capture-image-box"><img src={transactionsDetail.faces} className='user-avatar capture-image' alt="" /></div>
                    </div>
                  </Col>

                  <Col span={18}>
                    <div className="transaction-description-text">
                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">OloID</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.OloID}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Primary ID</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.PrimaryID}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Secondary ID</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.SecondaryID}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Transaction ID</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.TransactionID}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Face Match</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.FaceMatch}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Face Mach Score</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.FaceMatchScore}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Liveliness</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.Liveliness}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Liveliness Score</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.LivelinessScore}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Mode</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.Mode}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Connection</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.Connection}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Application</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.Application}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Endpoint</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.Endpoint}</span>
                      </div>

                      <div className="transaction-detail-containt">
                        <div className="transaction-detail-first-txt">Location</div>
                        <span className='transaction-detail-second-txt'>{transactionsDetail.Location}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="Action" key="2">
              <ActionDetail />
            </TabPane>

            <TabPane tab="Raw JSON" key="3">
              <div className='raw-json'>
                <div className='string-json'>
                  <JSONPretty id="json-pretty" data={transactionsDetail}></JSONPretty>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { transactionsDetail, transactionsRawJson } = state.transactions;
  return {
    user,
    transactionsDetail,
    transactionsRawJson
  }
}
export default connect(mapStateToProps)(TransactionsDetail);

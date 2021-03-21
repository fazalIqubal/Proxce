import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import './endpointsDetail.scss';
import { Table } from 'antd';
import { getAllIntegrations, instalPlugin } from '../action/endpoints.actions';
import { Row, Col, Tabs, Button } from 'antd';
import { Switch } from 'antd';
import kronos from "../../../image/kronos-icon.png";
import securits from "../../../image/securits-icon.png";
import EnabledIntegrations from './enabledIntegrations';
import { integrations } from '../service/constant';
const { TabPane } = Tabs


/* eslint eqeqeq: 0 */
export class Integrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllIntegrations());
  }

  onTabChange = activeKey => {
    this.setState({ activeKey });
  };
  instalPlugin = (res) => {
    this.setState({ activeKey: '2' });
  }
  compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  render() {
    const { activeKey } = this.state;
    const { allIntegrations } = this.props;

    return (
      <div className='connection-container integrations-container-width'>
        <Tabs onChange={this.onTabChange} activeKey={activeKey} defaultActiveKey="1">
          <TabPane tab="All Integrations" key="1">
            <Row>

              {
                allIntegrations.map(res => {
                  return <Col span={12} className="integrations-tab-padding">
                    <div className="integrations-tab-main-box">
                      {
                        res.instaled &&
                        <div className="integrations-green-circle"></div>
                      }
                      {
                        res.image &&
                        <div className="integrations-icon-middle">
                          <img src={res.image} className='integrations-icon' alt="" />
                        </div>
                      }
                      <div className="integrations-tab-heading">{res.endpointName}</div>
                      <div className="integrations-tab-sub-text">{res.descriptions}</div>

                      <div className="integrations-icon-middle">
                        <Button
                          onClick={(e) => this.instalPlugin(res)}
                          disabled={`${res.instaled ? 'disabled' : ''}`} className={`install-btn ${res.instaled ? 'instaled' : ''}`} key="submit">INSTALL</Button>
                      </div>
                    </div>
                  </Col>
                })
              }
            </Row>
          </TabPane>
          <TabPane tab="Enabled Integrations" key="2">
            <EnabledIntegrations />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allIntegrations } = state.application;
  return {
    user,
    allIntegrations
  }
}
export default connect(mapStateToProps)(Integrations);
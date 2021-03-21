import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Icon } from 'antd';
import { getTenantProducts }  from '../action/tenant.actions';
import moment from 'moment';
import { Switch } from 'antd';
import './tenants.scss';
import _ from 'lodash';

export class TenantProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        
        {
          title: 'NAME',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          sortDirections: ['descend', 'ascend'],
        },


        {
          title: 'ACCESS',
          dataIndex: 'access',
          key: 'access',
          sorter: (a, b) => a.access.localeCompare(b.access),
          sortDirections: ['descend', 'ascend'],
          render:action=><Row>
            <Col span={24} className="from-left-col">
              <Switch defaultChecked onChange={this.onChange} className='switch-box'/>
            </Col>
          </Row>
        },

      ],
      
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getTenantProducts());
  }

  compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  onSelectedRow = (rows) => {
    this.setState({ selectedRows: rows })
  }
  onClickSetPrimary = () => {
    const { dispatch } = this.props;
  }

  onClickAddFace = () => {
  }

  onClickDeleteFace = () => {
  }


  render() {
    const { columns, selectedRows } = this.state;
    const { tenantProduct } = this.props

    return (
      <div className='tenant-container'>
        <div className="face-user-container">
          <div className="row">
           
          </div>
        </div>
        <div className='table-box face-table'>
            <div className="bottom-box">
          <Table
            dataSource={(tenantProduct.length && tenantProduct) || []}
            columns={columns}
            pagination={{
            pageSize: 10,
            total: tenantProduct.length,
            showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
            defaultCurrent: 1
            }}
          />
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tenantProduct } = state.tenant;
  return {
    tenantProduct
  }
}
export default connect(mapStateToProps)(TenantProduct);
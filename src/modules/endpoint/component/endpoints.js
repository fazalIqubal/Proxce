import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col, Table, DatePicker, Button } from 'antd';
import { getAllEndpoints, filterEndpoints } from '../action/endpoints.actions';
import '../../tenant/component/tenants.scss'
import './endpointsDetail.scss';
import AddGroup from './addGroup'
import './endpoints.scss';
import { history } from '../../../helpers'
const Option = Select.Option;


/* eslint eqeqeq: 0 */
export class Endpoints extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [

        {
          title: 'ENDPOINT NAME',
          dataIndex: 'EndpointName',
          key: 'EndpointName',
          width: '20%',
          sorter: (a, b) => a.EndpointName.localeCompare(b.EndpointName),
          sortDirections: ['descend', 'ascend'],
          render: (text, obj) => <div className='group-name clickable-text' onClick={() => this.openEndpointDetail(obj)}>{text}</div>
        },
        {
          title: 'ENDPOINT ID',
          dataIndex: 'EndpointID',
          key: 'EndpointID',
          width: '20%',
          sorter: (a, b) => a.EndpointID.localeCompare(b.EndpointID),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'LAST UPDATED',
          dataIndex: 'UpdatedAt',
          key: 'UpdatedAt',
          sorter: (a, b) => a.UpdatedAt.localeCompare(b.UpdatedAt),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'ENDPOINT TYPE',
          dataIndex: 'EndpointType',
          key: 'EndpointType',
          width: '20%',
          sorter: (a, b) => a.EndpointType.localeCompare(b.EndpointType),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'LOCATION',
          dataIndex: 'Location',
          key: 'Location',
          width: '20%',
          sorter: (a, b) => a.Location.localeCompare(b.Location),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'APPLICATION NAME',
          dataIndex: 'ApplicationName',
          key: 'ApplicationName',
          width: '20%',
          sorter: (a, b) => a.ApplicationName.localeCompare(b.ApplicationName),
          sortDirections: ['descend', 'ascend'],
        },

      ],
      selectedRows: [],
      selectedRowKeys: [],
      filter: {
        search: '',
        appType: 'ALL',
        endpointType: 'ALL'
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllEndpoints());
  }

  compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  openEndpointDetail = (endpoint) => {
    history.push(`/endpoint/${endpoint.EndpointID}/detail`)
  }

  openAddGroupModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }

  toggleAddGroupModal = () => {
    this.setState({ createModal: false })
  }

  onSelectedRow = (selectedRowKeys, rows) => {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: rows })
  }

  onChangeHandler = (e) => {
    const { filter } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    filter[name] = value;
    this.setState({ filter })
  }

  onChangeFilterOption = (value, field) => {
    const { filter } = this.state
    filter[field] = value;
    this.setState({ filter });
  }

  resetFilter = () => {
    this.setState({
      filter: {
        search: '',
        appType: 'ALL',
        endpointType: 'ALL'
      }
    }, () => {
      this.onSearch();
    });
  }

  onSearch = (e) => {
    const { dispatch } = this.props;
    const { filter } = this.state;
    let param = { search: filter.search }
    if (filter.appType != 'ALL') {
      param.appType = filter.appType;
    }
    if (filter.endpointType != 'ALL') {
      param.endpointType = filter.endpointType;
    }
    dispatch(filterEndpoints(param));
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.onSearch()
    }
  }



  render() {
    const { columns, filter, selectedRows, selectedRowKeys } = this.state;
    const { allEndpoints, endpointTypes } = this.props

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectedRow(selectedRowKeys, selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.EndpointID === 'Disabled Group',
        name: record.EndpointID,
      }),
    };

    return (
      <div className='application-container groups-container'>
        <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input
              placeholder='Search Endpoint Name/ID'
              name="search"
              value={filter.search}
              onKeyDown={this.onEnter}
              onChange={(e) => { this.onChangeHandler(e) }}
            />
          </div>
        </div>
        <div className='bottom-box'>
          <Row>
            <Col span={6}>
              <label className="dropdown-level-txt">Application Type</label>
              <div className="from-left-col">

                <Select defaultValue='ALL'
                  required
                  name="applicationType"
                  onChange={(e) => { this.onChangeFilterOption(e, 'appType') }}
                  value={filter.appType}
                >
                  <Option value="ALL">ALL</Option>
                  <Option value="Oloid Verify">Oloid Verify</Option>
                  <Option value="Oloid Thermal">Oloid Thermal</Option>
                  <Option value="Password Reset">Password Reset</Option>
                  <Option value="Native SDK">Native SDK</Option>
                  <Option value="Edge">Edge</Option>
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <label className="dropdown-level-txt">Endpoint Type</label>
              <div className="from-left-col">
                <Select defaultValue='ALL'
                  className="select-input"
                  name="endpointType"
                  onChange={(e) => { this.onChangeFilterOption(e, 'endpointType') }}
                  value={filter.endpointType}
                >
                  <Option key="ALL" value="ALL">ALL</Option>
                  {
                    endpointTypes && endpointTypes.map((type, index) => {
                      return <Option key={index} value={type}>{type}</Option>
                    })
                  }
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className='endp-refresh-button-box'>
                <Button
                  className="endp-refresh-btn"
                  key="submit"
                  onClick={() => { this.onSearch() }}
                >REFRESH</Button>
                <Button
                  className="endp-clear-btn"
                  key="clear"
                  onClick={() => { this.resetFilter() }}
                >CLEAR</Button>
              </div>
            </Col>
          </Row>
          <div className="add-btn-row">
            <div className=''>
              <AddGroup
                endpoints={selectedRows}
                modal={this.state.createModal}
                toggle={this.toggleAddGroupModal}
              />
              <Button
                className={`${selectedRows.length == 0 ? 'disabled' : ''} cerate-group-btn`}
                key="submit"
                onClick={() => { this.openAddGroupModal() }}
              >ADD GROUP</Button>
              <span>{selectedRows.length} Endpoint(s) selected</span>

            </div>
          </div>
          <div className='table-box'>
            <Table
              rowKey="EndpointID"
              rowSelection={rowSelection}
              dataSource={allEndpoints}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: allEndpoints && allEndpoints.length,
                showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent: 1
              }
              } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allEndpoints, endpointTypes } = state.endpoints;
  return {
    allEndpoints,
    endpointTypes
  }
}
export default connect(mapStateToProps)(Endpoints);

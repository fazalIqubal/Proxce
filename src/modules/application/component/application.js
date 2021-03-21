import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Table } from 'antd';
import { getAllApplication, filterApplication } from '../action/application.actions';
import '../../tenant/component/tenants.scss'
import './application.scss'
import { history } from '../../../helpers'
const Option = Select.Option;

/* eslint eqeqeq: 0 */
export class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '',
          dataIndex: 'ApplicationLogo',
          key: 'ApplicationLogo',
          render: (ApplicationLogo, a) => <div className='coulmn-icon'>
            {ApplicationLogo && ApplicationLogo.trim() && <img src={ApplicationLogo}></img>}
            {!(ApplicationLogo && ApplicationLogo.trim()) && <span className="app-type-name">{a.ApplicationType.match(/\b(\w)/g) ? a.ApplicationType.match(/\b(\w)/g).join('') : ''}</span>}
          </div>
        },
        {
          title: 'APPLICATION NAME',
          dataIndex: 'ApplicationName',
          key: 'ApplicationName',
          sorter: (a, b) => a.ApplicationName.localeCompare(b.ApplicationName),
          sortDirections: ['descend', 'ascend'],
          render: (text, ApplicationName) => <div className='app-name clickable-text' onClick={() => this.openApplicationDetail(ApplicationName)}>{text}</div>
        },
        // {
        //   title: 'LAST UPDATED',
        //   dataIndex: 'ApplicationID',
        //   key: 'ApplicationID',
        //   sorter: (a, b) => a.ApplicationID.localeCompare(b.ApplicationID),
        //   sortDirections: ['descend', 'ascend'],
        // },
        {
          title: 'APPLICATION TYPE',
          dataIndex: 'ApplicationType',
          key: 'ApplicationType',
          sorter: (a, b) => a.ApplicationType.localeCompare(b.ApplicationType),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'LAST UPDATED',
          dataIndex: 'UpdatedAt',
          key: 'UpdatedAt',
          sorter: (a, b) => a.UpdatedAt.localeCompare(b.UpdatedAt),
          sortDirections: ['descend', 'ascend'],
        }
      ],
      filter: {
        search: '',
        type: 'ALL'
      }
    }
  }

  componentDidMount() {
    this.getAllApplication();
  }

  getAllApplication = (filter) => {
    const { dispatch } = this.props;
    this.setState({ loading: true })
    dispatch(getAllApplication(filter))
      .then(() => {
        this.setState({ loading: false })
      });
  }


  openApplicationDetail = (application) => {
    history.push(`/applications/${application.ApplicationID}/detail`)
  }

  onChangeHandler = (e) => {
    const { filter } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    filter[name] = value;
    this.setState({ filter })
  }

  onSearch = (e) => {
    const { dispatch } = this.props;
    const { filter } = this.state;
    if (e.key === 'Enter') {
      let param = { search: filter.search }
      if (filter.type != 'ALL') {
        param.type = filter.type;
      }
      dispatch(filterApplication(param));
    }
  }
  
  onChangeAppType = (type) => {
    const { filter } = this.state
    const { dispatch } = this.props;;
    let param = { ...filter }
    param.type = '';
    filter.type = type;
    this.setState({ filter });
    if (type != 'ALL') {
      param.type = type;
    }
    dispatch(filterApplication(param));
  }

  render() {
    const { columns, filter } = this.state;
    const { allApplication } = this.props
    return (
      <div className='application-container'>
        <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input placeholder='Search Applications'
              name="search"
              value={filter.search}
              onKeyDown={this.onSearch}
              onChange={(e) => { this.onChangeHandler(e) }}
            />
          </div>
        </div>
        <div className='bottom-box'>
          <div className='txt-customer'>Application Type</div>
          <Select defaultValue='All' className="select-input"
            onChange={(e) => { this.onChangeAppType(e) }}
            value={filter.type}>
            <Option value="ALL">ALL</Option>
            <Option value="Oloid Verify">Oloid Verify</Option>
            <Option value="Oloid Thermal">Oloid Thermal</Option>
            <Option value="Password Reset">Password Reset</Option>
            <Option value="Native SDK">Native SDK</Option>
            <Option value="Edge">Edge</Option>
          </Select>

          <div className='table-box'>
            <Table
              rowKey="ApplicationID"
              dataSource={allApplication}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: allApplication.length,
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
  const { user } = state.authentication;
  const { allApplication } = state.application;
  return {
    user,
    allApplication
  }
}
export default connect(mapStateToProps)(Application);

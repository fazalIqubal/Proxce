import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Table } from 'antd';
import { getAllGroups, filterGroups } from '../action/groups.actions';
import '../../tenant/component/tenants.scss'
import '../../application/component/application.scss'
import './groups.scss';
import { history } from '../../../helpers'

/* eslint eqeqeq: 0 */
export class Groups extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [

        {
          title: 'GROUP NAME',
          dataIndex: 'GroupName',
          key: 'GroupName',
          sorter: (a, b) => a.GroupName.localeCompare(b.GroupName),
          sortDirections: ['descend', 'ascend'],
          render: (text, obj) => <div className='group-name clickable-text' onClick={() => this.openGroupDetail(obj)}>{text}</div>
        },
        {
          title: 'GROUP DESCRIPTION',
          dataIndex: 'Description',
          key: 'Description',
          sorter: (a, b) => a.Description.localeCompare(b.Description),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'LAST UPDATED',
          dataIndex: 'UpdatedAt',
          key: 'UpdatedAt',
          sorter: (a, b) => a.UpdatedAt.localeCompare(b.UpdatedAt),
          sortDirections: ['descend', 'ascend'],
        },

      ]
      ,
      filter: {
        search: '',
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllGroups());
  }

  openGroupDetail = (group) => {
    history.push(`/groups/${group.GroupID}/detail`)
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
      dispatch(filterGroups(param));
    }
  }

  render() {
    const { columns, filter } = this.state;
    const { allGroups } = this.props
    return (
      <div className='application-container groups-container'>
        <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input placeholder='Search Group'
              name="search"
              value={filter.search}
              onKeyDown={this.onSearch}
              onChange={(e) => { this.onChangeHandler(e) }}
            />
          </div>
        </div>
        <div className='bottom-box'>
          <div className='table-box'>
            <Table
              dataSource={allGroups}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: allGroups && allGroups.length,
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
  const { allGroups } = state.groups;
  return {
    user,
    allGroups
  }
}
export default connect(mapStateToProps)(Groups);

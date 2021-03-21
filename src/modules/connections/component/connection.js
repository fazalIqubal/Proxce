import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { getAllConnection, filterConnection } from '../action/connection.actions';
import '../../tenant/component/tenants.scss';
import './connection.scss'
import { history } from '../../../helpers'

/* eslint eqeqeq: 0 */
export class Connection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'CONNECTION NAME',
          dataIndex: 'ConnectionDisplayName',
          key: 'ConnectionDisplayName',
          width: '20%',
          sorter: (a, b) => a.ConnectionDisplayName.localeCompare(b.ConnectionDisplayName),
          sortDirections: ['descend', 'ascend'],
          render: (text, connectionName) => <div className='app-name clickable-text' onClick={() => this.openConnectionDetail(connectionName)}>{text}</div>
        },
        {
          title: 'CONNECTION SOURCE',
          dataIndex: 'OnlineModel',
          key: 'OnlineModel',
          width: '20%',
          sorter: (a, b) => a.OnlineModel.localeCompare(b.OnlineModel),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'LAST UPDATED',
          dataIndex: 'UpdatedAt',
          key: 'UpdatedAt',
          width: '20%',
          sorter: (a, b) => a.UpdatedAt.localeCompare(b.UpdatedAt),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '#USERS',
          dataIndex: 'users',
          key: 'users',
          width: '20%',
          sorter: (a, b) => a.users.localeCompare(b.users),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '#FACES',
          dataIndex: 'faces',
          key: 'faces',
          width: '20%',
          sorter: (a, b) => a.faces.localeCompare(b.faces),
          sortDirections: ['descend', 'ascend'],
        }
      ],
      filter: {
        search: '',
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ loading: true })
    dispatch(getAllConnection())
      .then(() => {
        this.setState({ loading: false })
      });
  }


  openConnectionDetail = (connection) => {
    history.push(`/connections/${connection.ConnectionID}/detail`)
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
      dispatch(filterConnection(param));
    }
  }

  render() {
    const { columns, filter } = this.state;
    const { allConnections } = this.props
    return (
      <div className='application-container connection-box'>
        <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input placeholder='Search Connections'
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
              dataSource={allConnections || []}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: allConnections.length,
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
  const { allConnections } = state.connection;
  return {
    user,
    allConnections
  }
}
export default connect(mapStateToProps)(Connection);

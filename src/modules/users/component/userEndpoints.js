import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import '../../application/component/applicationDetail.scss';
import { Table } from 'antd';
import { getUserEndPoints }  from '../action/users.actions';


/* eslint eqeqeq: 0 */
export class Endpoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ENDPOINT NAME',
          dataIndex: 'endPointName',
          key: 'endPointName',
          sorter: (a, b) => a.endPointName.localeCompare(b.endPointName),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'APPLICATION NAME',
          dataIndex: 'applicationName',
          key: 'applicationName',
          sorter: (a, b) => a.applicationName.localeCompare(b.applicationName),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'APPLICATION TYPE',
          dataIndex: 'applicationType',
          key: 'applicationType',
          sorter: (a, b) => a.applicationType.localeCompare(b.applicationType),
          sortDirections: ['descend', 'ascend'],
        },     
      ]
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getUserEndPoints());
  }

  compareByAlph =(a, b)=>{ if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  render() {
    const { columns } = this.state;
    const { userEndPoint } = this.props

    return (
      <div className='connection-container user-endpoint'>
        <div className='table-box'>
            <Table 
              dataSource={(userEndPoint.length && userEndPoint) || []} 
              columns={columns} 
              pagination = {{
                pageSize: 10,
                total: userEndPoint.length || 0,
                showTotal:(total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent:1
              }}
            />
          </div>
      </div>
			);
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { userEndPoint } = state.users;
  return {
    user,
    userEndPoint
  }
}
export default connect(mapStateToProps)(Endpoints);

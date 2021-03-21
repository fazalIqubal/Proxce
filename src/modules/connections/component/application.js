import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import '../../application/component/applicationDetail.scss';
import './application.scss';
import { Table } from 'antd';

/* eslint eqeqeq: 0 */
export class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '',
          dataIndex: 'Icon',
          key: 'Icon',
          render: Icon => <div className='coulmn-icon'><img src={Icon} alt=""></img></div>
        },
        {
          title: 'APPLICATION NAME',
          dataIndex: 'ApplicationName',
          key: 'ApplicationName',
          sorter: (a, b) => a.ApplicationName.localeCompare(b.ApplicationName),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'APPLICATION TYPE',
          dataIndex: 'ApplicationType',
          key: 'ApplicationType',
          sorter: (a, b) => a.ApplicationType.localeCompare(b.ApplicationType),
          sortDirections: ['descend', 'ascend'],
        }
      ]
    }
  }

  componentDidMount() {
  }

  render() {
    const { columns } = this.state;
    const { application } = this.props

    return (
      <div className='connection-container application-container'>
        <div className='txt-add-application'>List of applications associated with the connection</div>
        <div className='table-box'>
          <Table
            rowKey="ApplicationID"
            dataSource={application}
            columns={columns}
            pagination={{
              pageSize: 10,
              total: application.length,
              showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
              defaultCurrent: 1
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { connectionDetail } = state.connection;
  return {
    user,
    application: connectionDetail.Applications || []
  }
}
export default connect(mapStateToProps)(Application);

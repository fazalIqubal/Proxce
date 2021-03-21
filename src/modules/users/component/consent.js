import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import '../../application/component/applicationDetail.scss';
import { Table } from 'antd';
import { getUserConsent }  from '../action/users.actions';
import moment from 'moment';
import Pdf from './GroupUsers_Wireframes_part1.pdf';

/* eslint eqeqeq: 0 */
export class Consent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'DATE / TIME',
          dataIndex: 'dateTime',
          key: 'dateTime',
          render: (dateTime)=><div>{moment(dateTime).format('MMM DD YYYY h:m A')}</div>
        },

        {
          title: 'VERSION',
          dataIndex: 'version',
          key: 'version',
        },

        {
          title: 'CONSENT FORM',
          dataIndex: 'consentFromFile',
          key: 'consentFromFile',
          render: (text, row, index)=><div><a href={Pdf} target="_blank">{text}</a></div>
        },
      ]
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getUserConsent());
  }

  compareByAlph =(a, b)=>{ if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  render() {
    const { columns } = this.state;
    const { userConsent } = this.props

    return (
      <div className='connection-container user-history'>
        <div className='table-box'>
            <Table 
              dataSource={(userConsent.length && userConsent) || []} 
              columns={columns} 
              pagination = {{
                pageSize: 10,
                total: userConsent.length,
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
  const { userConsent } = state.users;
  return {
    userConsent
  }
}
export default connect(mapStateToProps)(Consent);
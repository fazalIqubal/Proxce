import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, message } from 'antd';
import { removeUserFace, setPrimaryUser } from '../action/users.actions';
import moment from 'moment';
import './users.scss';
import _ from 'lodash';
import AddFace from './addFace'

/* eslint eqeqeq: 0 */
export class Faces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'FACES',
          dataIndex: 'SignedUrl',
          key: 'SignedUrl',
          render: (url, obj) => <div className="face-background">
            <img src={url} className='user-avatar' alt="" />
            {obj.IsPrimary && <div className="face-online"></div>}
          </div>,
          width: '20%',
        },

        {
          title: 'ATTRIBUTES',
          dataIndex: 'Attributes',
          key: 'Attributes',
          sorter: (a, b) => a.Attributes.localeCompare(b.Attributes),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'DATE OF CAPTURE',
          dataIndex: 'CaptureDate',
          key: 'CaptureDate',
          sorter: (a, b) => a.date.localeCompare(b.date),
          sortDirections: ['descend', 'ascend'],
          render: (dateTime) => <div>{moment(dateTime).format('MMM DD YYYY h:m A')}</div>
        },

        {
          title: 'DID ENABLED',
          dataIndex: 'DIDEnabled',
          key: 'DIDEnabled',
          sorter: (a, b) => a.DIDEnabled.localeCompare(b.DIDEnabled),
          sortDirections: ['descend', 'ascend'],
        },

      ],
      selectedRows: [],
      selectedRowKeys: [],
      UpldoadFile: false
    }
  }

  onSelectedRow = (selectedRowKeys, rows) => {
    this.setState({ selectedRowKeys, selectedRows: rows })
  }
  onClickSetPrimary = () => {
    const { dispatch } = this.props;
    if (this.state.selectedRows.length == 1) {
      dispatch(setPrimaryUser(_.first(this.state.selectedRows)));
    }

  }

  onClickAddFace = () => {
    this.setState({ UpldoadFile: true })
  }

  handleModalCancel = () => {
    this.setState({ UpldoadFile: false })
  }


  onClickDeleteFace = () => {
    const { dispatch, usersDetail } = this.props;
    let req = {
      FaceIds: this.state.selectedRows.map(r => r.OnlineModelFaceID)
    }
    dispatch(removeUserFace(usersDetail.OloID, req))
      .then(res => {
        if (res.error) {
          message.error(res.message)
        }
      })
  }


  render() {
    const { columns, selectedRows } = this.state;
    const { userFaces } = this.props;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectedRow(selectedRowKeys, selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };


    return (
      <div className='connection-container'>
        <div className="face-user-container">
          <div className="row">
            <div className="col-6">
              <div className='endp-button-box'>
                <Button
                  className="endp-clear-btn"
                  onClick={() => { this.onClickAddFace() }}
                >ADD FACE</Button>
                <Button
                  className={`${(selectedRows.length == 0 || selectedRows.length > 1) ? 'disabled' : ''} endp-clear-btn`}
                  onClick={() => { this.onClickSetPrimary() }}
                >SET PRIMARY</Button>

                <div
                  onClick={() => { this.onClickDeleteFace() }}
                  className={`${selectedRows.length == 0 ? 'disabled' : ''} user-delete-btn`}>
                  <div className="user-delete-button">
                  </div>
                </div>

                <div className="delete-count">{selectedRows.length} Face(s) selected</div>
              </div>
            </div>
            <div className="col-6">
              <div className="face-user-right-containt">
                Total Face Authentications: 123 <br></br> Last Face Authentication: 25 May 2019, 5:30 PM
            </div>
            </div>
          </div>
        </div>
        <div className='table-box face-table'>
          <Table
            rowKey="FaceID"
            dataSource={(userFaces.length && userFaces) || []}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{
              pageSize: 10,
              total: userFaces.length,
              showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
              defaultCurrent: 1
            }}
          />
        </div>
        <AddFace showModal={this.state.UpldoadFile} handleCancel={this.handleModalCancel} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { usersDetail } = state.users;
  return {
    usersDetail,
    userFaces: usersDetail.Faces || []
  }
}
export default connect(mapStateToProps)(Faces);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import './applicationDetail.scss';
import { Table, message } from 'antd';
import { getAllConnection } from '../../connections/action/connection.actions';
import { Row, Col } from 'antd';
import { Switch } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { updateApplication } from '../action/application.actions';
import _ from "lodash";

const type = 'DragbleBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });

  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    >
    </tr>
  );
};

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
          sorter: (a, b) => a.ConnectionDisplayName.localeCompare(b.ConnectionDisplayName),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'SOURCE',
          dataIndex: 'OnlineModel',
          key: 'OnlineModel',
          sorter: (a, b) => a.OnlineModel.localeCompare(b.OnlineModel),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'ACTION',
          dataIndex: 'IsAdded',
          key: 'IsAdded',
          render: (IsAdded, obj) => <Row>
            <Col span={24} className="from-left-col">
              <Switch checked={IsAdded} onChange={(e) => this.onAddConnection(e, 'IsAdded', obj)} className='switch-box' />
            </Col>
          </Row>
        }
      ],
      connections: []
    }
  }

  componentDidMount() {
    const { dispatch, applicationDetail } = this.props;
    this.setState({ loading: true })
    dispatch(getAllConnection())
      .then((res) => {
        let connection = res;
        _.map(connection, (conn) => {
          let appConn = _.find(applicationDetail.Connections, (appConn) => { return appConn.ConnectionID == conn.ConnectionID });
          if (appConn) {
            conn.IsAdded = true;
            conn.Priority = appConn.Priority;
          }
        });
        connection = _.orderBy(connection, (conn) => { return conn.Priority });
        this.setState({ connections: connection || [], loading: false })
      });
  }


  onSaveConnection = () => {
    const { dispatch, applicationDetail } = this.props;
    let { connections } = this.state;
    let enableConnection = _.filter(connections, (conn) => { return conn.IsAdded });
    let params = {
      ...applicationDetail,
      Connections: enableConnection.map((conn, index) => {
        return {
          ConnectionDisplayName: conn.ConnectionDisplayName,
          ConnectionID: conn.ConnectionID,
          OndeviceModel: conn.OndeviceModel,
          OnlineModel: conn.OnlineModel,
          Priority: (index + 1)
        }
      })
    }
    dispatch(updateApplication(params))
      .then((res) => {
        message.success("Application updated successfully");
      });
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    let { connections } = this.state;
    const dragRow = connections[dragIndex];
    connections.splice(dragIndex, 1);
    connections.splice(hoverIndex, 0, dragRow);
    this.setState({ connections: connections })
  };

  onAddConnection = (checked, name, obj) => {
    const conn = Object.assign([], this.state.connections);
    let index = conn.findIndex((res) => { return res.ConnectionID == obj.ConnectionID });
    if (index != -1) {
      conn[index][name] = checked;
      this.setState({ connections: conn });
    }
  }



  render() {
    const { columns, loading, connections } = this.state;

    return (
      <div className='connection-container'>
        <div className='txt-add-application'>Connections are sources of users. An application may be linked to different connections.</div>
        <div className='table-box connection-table-box'>
          <DndProvider backend={HTML5Backend}>
            <Table
              rowKey="ConnectionID"
              dataSource={connections || []}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: connections.length,
                showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent: 1
              }}
              components={this.components}
              onRow={(record, index) => ({
                index,
                moveRow: this.moveRow,
              })}
            />
          </DndProvider>
        </div>
        <button onClick={() => { this.onSaveConnection() }} className="btn-save ant-btn ant-btn-primary" type="primary">SAVE</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { applicationDetail } = state.application;
  return {
    user,
    applicationDetail
  }
}
export default connect(mapStateToProps)(Connection);

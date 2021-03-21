import React, { Component } from "react";
import { connect } from "react-redux";
import "../../tenant/component/tenants.scss";
import { Select, Row, Col, Table, Button, Tag } from "antd";
import TextField from "@material-ui/core/TextField";
import "../../application/component/applicationDetail.scss";
import { getUserImport } from "../action/users.actions";
import moment from "moment";
import "./import.css";
import { Icon } from 'antd';
import "../../../modules/report/component/report.scss";
import { DatePicker } from 'antd';
import log from './log.txt';

const dateFormat = 'YYYY/MM/DD';
/* eslint eqeqeq: 0 */
export class UserImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "DATE",
          dataIndex: "date",
          key: "date",
          width: "20%",
          sorter: (a, b) => a.date.localeCompare(b.date),
          sortDirections: ['descend', 'ascend'],
          render: date => (
            <div>{moment(date).format("MMM DD YYYY ")}</div>
          )
        },

        {
          title: "TIME",
          dataIndex: "date",
          key: "time",
          width: "20%",
          sorter: (a, b) => a.time.localeCompare(b.time),
          sortDirections: ['descend', 'ascend'],
          render: date => <div>{moment(date).format("h:m A")}</div>
        },
        {
          title: "TYPE",
          dataIndex: "type",
          key: "type",
          width: "20%",
          sorter: (a, b) => a.time.localeCompare(b.time),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: "FILE UPLOADED",
          dataIndex: "fileName",
          key: "fileName",
          width: "20%",
          sorter: (a, b) => a.fileName.localeCompare(b.fileName),
          sortDirections: ['descend', 'ascend'],
          render: (fileName, row, index) => <div className="import-upload-file-link"><a href={log} download={fileName}>{fileName}</a></div>
        },

        // {
        //   title: "RESULT",
        //   dataIndex: "result",
        //   key: "result",
        //   width: "10%",
        //   sorter: (a, b) => a.result.localeCompare(b.result),
        //   sortDirections: ['descend', 'ascend'],
        //   render: result => {
        //     return <div>
        //       {result && <Icon type="check-circle" theme="filled" />}
        //       {!result && <Icon type="exclamation-circle" theme="filled" />}
        //     </div>
        //   }
         
        // },
        {
          title: "LOGS",
          dataIndex: "log",
          key: "log",
          width: "20%",
          sorter: (a, b) => a.log.localeCompare(b.log),
          sortDirections: ['descend', 'ascend'],
          render: (text, row, index) => <div><a href={log} download={text}>{text}</a></div>
        }
      ]
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserImport());
  }



  render() {
    const { columns } = this.state;
    const { userImports } = this.props;

    return (
      <div className="teanant-container report-container">

        <div className="bottom-box">
          <div className="customize-select">
            <Row>
              <Col span={6} className="from-left-col datetime">
                <DatePicker placeholder="From Date" format={dateFormat} />
              </Col>
              <Col span={6} className="datetime">
                <DatePicker placeholder="To Date" format={dateFormat} />
              </Col>
            </Row>

            <div className="table-box">
              <Table
                dataSource={(userImports) || []}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  total: (userImports && userImports.length) || 0,
                  showTotal: (total, range) =>
                    `${range[0]} to ${range[1]} from ${total}`,
                  defaultCurrent: 1
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userImports } = state.users;
  return {
    userImports
  };
}
export default connect(mapStateToProps)(UserImport);
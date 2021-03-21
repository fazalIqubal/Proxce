import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col, Table, Button } from 'antd';
import { getAllReport }  from '../action/report.actions';
import '../../tenant/component/tenants.scss';
import './report.scss';
import TextField from "@material-ui/core/TextField";
import moment from 'moment';
const Option = Select.Option;

/* eslint eqeqeq: 0 */
export class Reports extends Component {

  constructor(props){
    super(props);
    this.state={
      report:{},
      modeList:[
        'Online',
        'Offline',
      ],
      columns: [
        {
          title: '',
          dataIndex: 'bullet',
          key: 'bullet',
          render: bullet=><div className='bullet'></div>
        },
        {
          title: 'BADGE ID',
          dataIndex: 'badgeId',
          key: 'badgeId',
          sorter: (a, b) => a.badgeId.localeCompare(b.badgeId),
          sortDirections: ['descend', 'ascend'],
          render: (text, badgeId)=><div>{text}</div>
        },
        {
          title: 'TRANSACTION ID',
          dataIndex: 'transactionId',
          key: 'transactionId',
          sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'DEVICE CODE',
          dataIndex: 'deviceCode',
          key: 'deviceCode',
          sorter: (a, b) =>  this.compareByAlph(a.deviceCode, b.deviceCode),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'OVERALL STATUS',
          dataIndex: 'overallStatus',
          key: 'overallStatus',
          sorter: (a, b) =>  this.compareByAlph(a.overallStatus, b.overallStatus),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'PUNCH RFESPONSE',
          dataIndex: 'punchResponse',
          key: 'punchResponse',
          sorter: (a, b) =>  this.compareByAlph(a.punchResponse, b.punchResponse),
          sortDirections: ['descend', 'ascend'],
				},
				{
          title: 'PUNCH TIME',
          dataIndex: 'punchTime',
          key: 'punchTime',
          sorter: (a, b) =>  this.compareByAlph(a.punchTime, b.punchTime),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'CREATED DATE TIME',
          dataIndex: 'createdDateTime',
          key: 'createdDateTime',
          sorter: (a, b) =>  this.compareByAlph(a.createdDateTime, b.createdDateTime),
          sortDirections: ['descend', 'ascend'],
        },
      ]
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getAllReport());
  }

  compareByAlph =(a, b)=>{ if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    const { report } = Object.assign({}, this.state)
    report[name]= value;
    this.setState({report})
  }

  handleDropdwonItems = (data, name) => {
    let report = Object.assign({}, this.state.report)
    report[name] = data;
    this.setState({ report});
  }

  render() {
    const { columns, modeList, report } = this.state;
    const { allReport } = this.props
    return (
      <div className='teanant-container report-container'>
        <div className='bottom-box'>
          <div className='txt-customer'>Sort by created date time</div>
          <Select defaultValue='Desending' className="select-input">
            <Option key="Desending" value="Desending">Desending</Option>
						<Option key="Asecending" value="Asecending">Asecending</Option>
          </Select>

					<div className='txt-customer txt-condition'>Condition</div>
					<Row>
						<Col span={6} className="from-left-col">
							<TextField
								name="badge_id"
								type="text"
								className='tenant-form-textfield'
								margin="normal"
								variant="outlined"
								placeholder='Badge ID'
								onChange={(e)=>this.handleInput(e)}
							/>
						</Col>
						<Col span={6} className="from-right-col">
							<TextField
								name="transaction_id"
								type="text"
								className='tenant-form-textfield'
								margin="normal"
								variant="outlined"
								placeholder='Transaction ID'
								onChange={(e)=>this.handleInput(e)}
							/>
						</Col>
					</Row>
					<div className='customize-select'>
						<Row>
							<Col span={6} className="from-left-col">
								<Select defaultValue='Device code' className="select-input">
									<Option key="Device code" value="Device code">Device code</Option>
								</Select>
							</Col>
							<Col span={6}>
								<Select defaultValue='Vault ID' className="select-input">
									<Option key="Vault_ID" value="Vault ID">Vault ID</Option>
								</Select>
							</Col>

							<Col span={6}>
								{/* <Select defaultValue='Mode' className="select-input mode-input">
									<Option key="Online" value="Online">
										<span className='onlineBullet'></span> 
										<span>Online</span>
									</Option>
									<Option key="Offline" value="Offline">
										<span className='offlineBullet'></span> 
										<span>Offline</span>
									</Option>
                </Select> */}
                
                <div className="dropdown">
                  <button className="mode-button" type="button" data-toggle="dropdown">
                    <span className='label'>
                      {
                        (report.mode) || 'Mode'
                      }
                    </span>
                    <div className="down-dropdown-icon up-dropdown-icon"></div>
                  </button>
                  <div className="dropdown-menu" >
                    <ul className="dropdown-menu-height">
                      {
                        modeList.map((res, i) => {
                          return <a href='#' className="dropdown-item" key={i}
                           onClick={() => { this.handleDropdwonItems(res, 'mode') }}>
                             <span className={`mode-bullet ${res}-bullet`}></span> 
                            <span className="txt-item">{res}</span>
                          </a>
                        })
                      }
                    </ul>
                  </div>
                </div>
							</Col>
						</Row>

						<Row>
							<Col span={6} className="from-left-col datetime">
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue={new Date(new Date().setHours(0, 0, 0, 0)).toISOString().substring(0, 16)}
                  className=''
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
							</Col>
							<Col span={6}  className='datetime'>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue={new Date(new Date().setHours(0, 0, 0, 0)).toISOString().substring(0, 16)}
                  className=''
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
							</Col>
						</Row>
					</div>

					<div className='button-box'>
						<Button className="btn-update" type="primary">UPDATE</Button>
						<Button className="clear-btn" key="submit">CLEAR</Button>
						<Button className="clear-btn" key="submit">EXPORT TO XL</Button>
					</div>
					<div className='table-box'>
            <Table
              dataSource={allReport}
              columns={columns}
              pagination = {{
                pageSize: 10,
                total: allReport.length,
                showTotal:(total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent:1
              }
            }/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allReport } = state.report;
  return {
    user,
    allReport
  }
}
export default connect(mapStateToProps)(Reports);

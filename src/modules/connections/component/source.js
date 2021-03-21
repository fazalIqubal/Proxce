import React, { Component } from 'react';
import { Row, Col, Switch, Tabs, Select, DatePicker, TimePicker } from 'antd';
import './source.scss';
import moment from 'moment';
import _ from 'lodash';
const { TabPane } = Tabs
const Option = Select.Option;

export class Source extends Component{

	constructor(props) {
    super(props);
    this.state = {
			dataType:{},
			published:{},
			activeTab:'scheduled',
			activeKey:'1'
    }
  }

	handleSwitch=(checked, name, key)=>{
		const dataType = Object.assign({}, this.state.dataType)
		dataType[name] = checked;
		const activeKey = checked ? `${key}` : this.state.activeKey
    this.setState({ dataType, activeKey });
	}

	activeOptions=(name)=>{		
    this.setState({ activeTab: name });
	}

	handlePublished =(name)=>{		
    const published = Object.assign({}, this.state.published)
    published[name] = true;
    this.setState({ published });
	}

	rightSideData=(activeTab)=>{
		return 	<Col span={18}>
			<div className='right-menu-tab height-fixed'>
				<div>
					<Row>
						<label>Run Script</label>
						<Col span={24} className="">
							<Select className="select-input" placeholder='Run Script'>
								<Option key="ALL" value="ALL">ALL</Option>
							</Select>
						</Col>
					</Row>
				</div>

				<div className='button-container'>
					<div className='btn-submit'>TEST CONNECTION</div>
					<div className='btn-submit btn-publish' onClick={()=>this.handlePublished(activeTab)}>PUBLISH</div>
				</div>
			</div>
		</Col>
	}

	scheduledRightSideData=(activeTab)=>{
		const dateFormat = 'DD MMMM YYYY - dddd';
		return 	<Col span={18}>
			<div className='right-menu-tab'>
				<div>
					<Row>
						<label>Run Script</label>
						<Col span={24} className="">
							<Select className="select-input" placeholder='Run Script'>
								<Option key="ALL" value="ALL">ALL</Option>
							</Select>
						</Col>
					</Row>
				</div>

				<div className='date-box'>
					<Row>
						<Col span={14}>
							<label>Date</label>
							<div>
								<DatePicker 
								onChange={this.onChange}  
								defaultValue={moment(moment(), dateFormat)} 
								format={dateFormat}
								placeholder='Date'/>
							</div>
						</Col>
						
						<Col span={10}>
							<label className='mg-l'>Time</label>
							<div className='mg-l'>
							<TimePicker 
								onChange={this.onChange} 
								defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
								placeholder='Time'/>,
							</div>
						</Col>
					</Row>
				</div>

				<div className='select-box'>
					<Row>
						<Col span={24} className="">
							<Select className="select-input">
								<Option key="OnlyOnce" value="Only Once">Only Once</Option>
							</Select>
						</Col>
					</Row>
					<div className='feilds-desc'>The next scheduled date to run the script is 2nd May, Monday, 2020</div>
				</div>

				<div className='button-box'>
					<div className='btn-submit'>TEST CONNECTION</div>
					<div className='btn-submit btn-publish' onClick={()=>this.handlePublished(activeTab)}>PUBLISH</div>
				</div>
			</div>
		</Col>
	}

	onChange = activeKey => {
    this.setState({ activeKey });
  };

	render(){
		const { dataType, activeTab, published, activeKey } = this.state;
		const isdisabledForm = !dataType.import && !dataType.custom
		return (
			<div className='source-container'>
				<div className='mr-bottom'>
					<Switch checked={dataType.import} onChange={(e)=>this.handleSwitch(e, 'import', 1)} className='switch-box'/>
					<span className='txt-import'>Import Data to Oloid</span>
				</div>
				<div>
					<Switch checked={dataType.custom} onChange={(e)=>this.handleSwitch(e, 'custom', 2)} className='switch-box'/>
					<span className='txt-import'>Use Custom Meta Data Source</span>
				</div>

				<div className='tab-box'>
					<Tabs  activeKey={activeKey} onChange={this.onChange} showArrow={false}>
						<TabPane tab="Import" key="1" disabled={!dataType.import}>
							<Row className={!dataType.import  ? 'disabled-tab' : ''}>
								<Col span={6}>
									<div className='left-menu-tab'>
										<div className='left-border'>
											<div className={`left-options mr-bt ${activeTab == 'scheduled' ? 'active' : ''}`} onClick={()=>this.activeOptions('scheduled')}>
												{published.scheduled && <div className='green-bullet'></div>}
												<div className='txt-item'>Scheduled</div>
											</div>

											<div className={`left-options mr-bt ${activeTab == 'onboarding' ? 'active' : ''}`} onClick={()=>this.activeOptions('onboarding')}>
												{published.onboarding && <div className='green-bullet'></div>}
												<div className='txt-item'>Onboarding</div>
											</div>

											<div className={`left-options ${activeTab == 'admin' ? 'active' : ''}`} onClick={()=>this.activeOptions('admin')}>
												{published.admin && <div className='green-bullet'></div>}
												<div className='txt-item'>Admin Initiated</div>
											</div>
										</div>
									</div>
								</Col>
								{activeTab == 'scheduled' && this.scheduledRightSideData('scheduled')}
								{(activeTab == 'onboarding' || activeTab == 'admin') && this.rightSideData(activeTab)}
							</Row>
						</TabPane>
						<TabPane tab="Look Up" key="2" disabled={!dataType.custom}>
						<Row className={!dataType.custom  ? 'disabled-tab' : ''}>
							<Col span={6}>
								<div className='left-menu-tab'>
									<div className='left-border height-fix'>
										<div className={`left-options mr-bt ${activeTab == 'faceMatch' ? 'active' : ''}`} 
											onClick={()=>this.activeOptions('faceMatch')}>
											{published.faceMatch && <div className='green-bullet'></div>}
											<div className='txt-item'>On Face Match</div>
										</div>

										<div className={`left-options mr-bt ${activeTab == 'weblook' ? 'active' : ''}`} 
											onClick={()=>this.activeOptions('weblook')}>
											{published.weblook && <div className='green-bullet'></div>}
											<div className='txt-item'>WebLook</div>
										</div>
									</div>
								</div>
							</Col>
								{this.rightSideData(activeTab)}
							</Row>
						</TabPane>
					</Tabs>
				</div>

				<button className={`btn-save mg-top ${isdisabledForm ? 'disabled' : ''}`} type="primary">SAVE</button>
			</div>)
	}
}

export default Source
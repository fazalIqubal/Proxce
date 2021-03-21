import React, { Component } from 'react';
import { connect } from 'react-redux';
import './customizeTab.scss';
import { Icon, Row, Col, Menu, Dropdown, Button, Tabs } from 'antd';
import TextField from "@material-ui/core/TextField";
import { history, fromValidate } from '../../../helpers'
import { updateApplicationById } from '../action/application.actions';
import moment from 'moment';
import { Select, Table } from 'antd';
import _ from 'lodash';


const Option = Select.Option;
/* eslint eqeqeq: 0 */
export class customizeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customeFiled: {
        fieldLabel: '',
        descriptions: '',
        options: ['']
      },

      columns: [
        {
          title: 'FIELD LABEL',
          dataIndex: 'fieldLabel',
          key: 'fieldLabel',
          sorter: (a, b) => a.fieldLabel.localeCompare(b.fieldLabel),
        },
        {
          title: 'FIELD TYPE',
          dataIndex: 'fieldType',
          key: 'fieldType',
          sorter: (a, b) => a.fieldType.localeCompare(b.fieldType),
          sortDirections: ['descend', 'ascend']
        },
        {
          title: 'OPTIONS',
          dataIndex: 'options',
          key: 'options',
          render: (text, obj) => <div>
            {obj.options && obj.options.map(res => { return <div>{res} </div> })}
          </div>
        },
        {
          title: 'DESCRIPTIONS',
          dataIndex: 'descriptions',
          key: 'descriptions'
        },
        {
          title: '',
          dataIndex: '',
          key: 'action',
          render: (text, obj) => <div>
            <Icon onClick={() => { this.removeFiledSet(obj) }} type="close" style={{ pointer: 'cursor', fontSize: '16px', fontWeight: 'bold', color: '#E42A31' }} />
          </div>
        }
      ]

    }
  }

  componentDidMount() {

  }


  handleChange = (e) => {
    const customeFiled = Object.assign({}, this.state.customeFiled)
    const name = e.target.name;
    const value = e.target.value;
    customeFiled[name] = value;
    this.setState({ customeFiled });
  }

  handleDropDownChange = (value) => {
    const customeFiled = Object.assign({}, this.state.customeFiled)
    customeFiled.fieldType = value;
    customeFiled.options = [''];
    this.setState({ customeFiled });
  }

  addNewFiled = (e) => {
    const customeFiled = Object.assign({}, this.state.customeFiled)
    customeFiled.options.push('');
    this.setState({ customeFiled });

  }
  removeNewFiled = (index) => {
    const customeFiled = Object.assign({}, this.state.customeFiled)
    customeFiled.options.splice(index, 1);
    this.setState({ customeFiled });
  }

  handleOptionChange = (e, index) => {
    const customeFiled = Object.assign({}, this.state.customeFiled)
    customeFiled.options[index] = e.target.value;
    this.setState({ customeFiled });

  }


  removeFiledSet = (res) => {
    const { applicationDetail, dispatch } = this.props;

    const appDetails = Object.assign({}, applicationDetail)

    const id = _.findIndex(appDetails.customizeFiled, (data) => { return res.id == data.id });
    appDetails.customizeFiled.splice(id, 1);
    dispatch(updateApplicationById(appDetails.applicationId, appDetails));
  }


  handleSubmit = e => {
    const { applicationDetail, dispatch } = this.props;
    const customeFiled = Object.assign({}, this.state.customeFiled)
    e.preventDefault();
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);

    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else if (!customeFiled.fieldType) {
      return;
    }
    else {

      applicationDetail.customizeFiled.push(Object.assign({ id: this.state.customeFiled.length }, this.state.customeFiled));
      dispatch(updateApplicationById(applicationDetail.applicationId, applicationDetail));
      this.setState({
        formError: {}, formSubmit: false,
        customeFiled: {
          fieldLabel: '',
          descriptions: '',
          options: ['']
        }
      });
    }
  };


  render() {
    const { customeFiled, formError, formSubmit, columns } = this.state;
    const { applicationDetail } = this.props;
    return (
      <div className="customer-info customize-tab">
        <div className="field-header">
          You can add custom fields to capture additional user profile information
        </div>

        <div className="field-container">
          <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
            <div>
              <Row>
                <Col span={7} className="padding-right-10">
                  <TextField
                    required
                    id="field_Label"
                    type="text"
                    className='form-textfield'
                    variant="outlined"
                    placeholder="Field Label"
                    value={customeFiled.fieldLabel}
                    name="fieldLabel"
                    error={formSubmit && formError['fieldLabel'] && (!formError['fieldLabel'].valid)}
                    onChange={(e) => { this.handleChange(e) }}
                  />
                </Col>
                <Col span={7} className="padding-right-10">
                  <Select
                    required

                    value={customeFiled.fieldType}
                    name="fieldType"
                    onChange={(val) => { this.handleDropDownChange(val) }}
                    className={`select-input ${(formSubmit && !customeFiled.fieldType) ? 'error' : ''}`}
                    placeholder='Field Type'>
                    <Option key="String" value="String">String</Option>
                    <Option key="Number" value="Number">Number</Option>
                    <Option key="List" value="List">List</Option>
                  </Select>
                </Col>

                <Col span={7} className="padding-right-10 descriptions-input">
                  <TextField
                    inputProps={{maxLength: 140}}
                    id="descriptions"
                    type="text"
                    className='form-textfield'
                    variant="outlined"
                    placeholder="Description to be displayed (140 characters)"
                    value={customeFiled.descriptions}
                    name="descriptions"
                    onChange={(e) => { this.handleChange(e) }}
                  />
                </Col>
                <Col span={3}>
                  <Button className="add-button" type="primary" htmlType="submit">ADD</Button>
                </Col>
              </Row>
            </div>

            <div>
              <div className="option-header">Max of 5 fields may be added</div>

              <div className="option-container">
                {
                  customeFiled.fieldType == 'List' && customeFiled.options && customeFiled.options.map((res, index) => {
                    return <Row>
                      <Col span={1} className="padding-10">{index + 1}</Col>
                      <Col span={7}>
                        <TextField
                          required
                          id="option"
                          type="text"
                          className='form-textfield'
                          variant="outlined"
                          placeholder={`Option ${index + 1}`}
                          value={res}
                          name="option"
                          error={formSubmit && !res}
                          onChange={(e) => { this.handleOptionChange(e, index) }}
                        />
                      </Col>
                      <Col span={1} className="padding-10 text-center">
                        <Icon onClick={() => { this.removeNewFiled(index) }} type="close" style={{ pointer: 'cursor', fontSize: '16px', fontWeight: 'bold', color: '#E42A31' }} />
                      </Col>
                      <Col span={3} className="padding-10">
                        {
                          (customeFiled.options.length == (index + 1)) &&
                          <span className="add-more" onClick={() => { this.addNewFiled() }}>
                            + ADD MORE
                        </span>}
                      </Col>
                      <Col span={12}></Col>
                    </Row>

                  })
                }
              </div>
            </div>
          </form>

          <div className='table-box'>
            <Table
              dataSource={applicationDetail.customizeFiled}
              columns={columns}
              pagination = {false} />
          </div>

          <Button className="add-button save-btn" type="primary" htmlType="submit">SAVE</Button>
        </div>
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
export default connect(mapStateToProps)(customizeTab);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, message } from 'antd';
import './tenants.scss'
import TextField from "@material-ui/core/TextField";
import { history, fromValidate } from '../../../helpers'
import { updateTenant } from '../action/tenant.actions';

export class General extends Component {

  constructor(props) {
    super(props);
    this.state = {
      advanceSetting: false,
      tenantDetail: {
        CustomerID: '',
        TenantID: '',
        CreatedDate: new Date(),
        Image: '',
        TenantName: '',
        TenantOwnerName: '',
        TenantOwnerEmail: '',
        SupportEmail: '',
        SupportURL: '',
        Region: '',
        CustomerName: '',
        CustomerAddress: ''
      },
      formSubmit: false,
      formError: {}
    }
  }

  componentDidMount() {
    const { tenantDetail } = this.props;
    this.setState({
      tenantDetail: {
        ...this.state.tenantDetail,
        ...tenantDetail
      }
    })
  }

  componentWillReceiveProps(props) {
    const { tenantDetail } = props;
    if (tenantDetail) {
      this.setState({
        tenantDetail: {
          ...this.state.tenantDetail,
          ...tenantDetail
        }
      })
    }

  }

  handleChange = (e) => {
    const tenantDetail = Object.assign({}, this.state.tenantDetail)
    const name = e.target.name;
    const value = e.target.value;
    tenantDetail[name] = value;
    this.setState({ tenantDetail });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {
      const tenant = Object.assign({}, this.state.tenantDetail)
      const updateParam = {
        TenantOwnerName: tenant.TenantOwnerName,
        CustomerName: tenant.CustomerName,
        SupportEmail: tenant.SupportEmail,
        SupportURL: tenant.SupportURL,
        CustomerAddress: tenant.CustomerAddress,
        TenantOwnerEmail: tenant.TenantOwnerEmail
      }
      dispatch(updateTenant(tenant.TenantName, updateParam))
        .then((res) => {
          if (res.error) {
            message.error(res.message);
          }
          else {
            message.success("Tenant updated successfully")
          }
        })
    }
  };

  render() {
    const { tenantDetail, formSubmit, formError } = this.state;
    return (
      <div className='tenant-container'>

        <div className='bottom-box'>
          <div className="customize-select">
            <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
              <div className="customer-info">
                <Row className="row">
                  <label>Tenant Name</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      disabled
                      type="text"
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Tenant Display Name"
                      margin="normal"
                      name="TenantName"
                      value={tenantDetail.TenantName}
                      onChange={(e) => { this.handleChange(e) }}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Tenant Owner Name</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      type="text"
                      required
                      error={formSubmit && formError['TenantOwnerName'] && (!formError['TenantOwnerName'].valid)}
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Tenant Owner Name"
                      name="TenantOwnerName"
                      value={tenantDetail.TenantOwnerName}
                      margin="normal"
                      onChange={(e) => { this.handleChange(e) }}
                      helperText={formError['TenantOwnerName'] && (!formError['TenantOwnerName'].valid) ? 'Required' : ''}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Support Email</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      type="text"
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Support Email"
                      name="SupportEmail"
                      value={tenantDetail.SupportEmail}
                      margin="normal"
                      onChange={(e) => { this.handleChange(e) }}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Region</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      disabled
                      type="text"
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Region"
                      name="Region"
                      value={tenantDetail.Region}
                      margin="normal"
                      onChange={(e) => { this.handleChange(e) }}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Customer Name</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      type="text"
                      error={formSubmit && formError['CustomerName'] && (!formError['CustomerName'].valid)}
                      required
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Customer Name"
                      name="CustomerName"
                      value={tenantDetail.CustomerName}
                      margin="normal"
                      onChange={(e) => { this.handleChange(e) }}
                      helperText={formError['CustomerName'] && (!formError['CustomerName'].valid) ? 'Required' : ''}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Tenant Owner Email</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      disabled
                      type="text"
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Tenant Owner Email"
                      name="TenantOwnerEmail"
                      value={tenantDetail.TenantOwnerEmail}
                      margin="normal"
                      onChange={(e) => { this.handleChange(e) }}
                    />
                  </Col>
                  <div>(Verified )</div>
                </Row>
                <Row>
                  <label>Support URL</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      type="text"
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Support URL"
                      name="SupportURL"
                      value={tenantDetail.SupportURL}
                      margin="normal"
                      onChange={(e) => { this.handleChange(e) }}
                    />
                  </Col>
                </Row>
                <Row>
                  <label>Customer Address</label>
                  <Col span={24} className="from-left-col">
                    <TextField
                      inputProps={{
                        readOnly: false,
                        maxLength: 140
                      }}
                      type="text"
                      className='form-textfield'
                      variant="outlined"
                      placeholder="Customer Address"
                      name="CustomerAddress"
                      value={tenantDetail.CustomerAddress}
                      margin="normal"
                      variant="outlined"
                      multiline={true}
                      rows={4}
                      onChange={(e) => { this.handleChange(e) }}
                    />
                  </Col>
                </Row><br></br>
                <Row>
                  <Col span={24}>
                    <div>
                      <button className="btn-save ant-btn ant-btn-primary" type="submit">SAVE</button>
                    </div>
                  </Col>
                </Row>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tenant } = state.authentication;
  const { allTenant } = state.tenant;
  return {
    tenant,
    allTenant
  }
}
export default connect(mapStateToProps)(General);
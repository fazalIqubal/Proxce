import React, { Component } from 'react';
import "./deleteTenant.scss";
import { Modal, Button } from 'antd';
import TextField from "@material-ui/core/TextField";
import { fromValidate } from '../../../helpers'

class DeleteTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: {},
      formSubmit: false,
      customer: {
        tenantName: '',
        description: ''
      }
    }
  }



  handleCancel = e => {
    this.props.toggle()
  };

  handleOk = e => {
    let { typeDetails } = this.props;
    let { customer } = this.state;
    e.preventDefault();
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(this.fromNode);
    const typeName = this.getTypeName();
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else if(!(typeName == customer.tenantName)) {
      this.setState({ formError: {tenantName :{valid : false}} })
    } else{
      this.handleToggleComponent();
      
    }
  };

  handleToggleComponent = () => {
    let { typeDetails, modalName } = this.props;
    let { customer } = this.state;
    switch(modalName) {
      case 'User' :
        this.props.toggle(typeDetails && typeDetails.OloID);
        break;
      case 'Application' : 
        this.props.toggle(typeDetails && typeDetails.ApplicationID, customer && customer.description);
        break;
      case 'Integrations' : 
        this.props.toggle(typeDetails && typeDetails.applicationName);
        break;
      case 'Connection' : 
        this.props.toggle(typeDetails && typeDetails.ConnectionID, customer && customer.description);
        break;
      case 'Endpoint' : 
        this.props.toggle(typeDetails && typeDetails.EndpointID, customer && customer.description);
        break;
      case 'Group' : 
        this.props.toggle(typeDetails && typeDetails.GroupID, customer && customer.description);
        break;
      default :
        this.props.toggle();
    }
  }

  getTypeName = () => {
    let { typeDetails, modalName } = this.props;
    var typeName = '';
    if(typeDetails) {
      switch(modalName) {
        case 'User' :
          typeName = typeDetails.DisplayName;
          break;
        case 'Application' : 
        typeName = typeDetails.ApplicationName;
          break;
        case 'Integrations' : 
        typeName= typeDetails.applicationName;
          break;
        case 'Connection' : 
        typeName= typeDetails.ConnectionDisplayName;
          break;
        case 'Endpoint' : 
        typeName =  typeDetails.EndpointName;
          break;
        case 'Group' : 
        typeName= typeDetails.GroupName;
          break;
        default :
          typeName = ''
      }
    }
    return typeName;
  }

  handleChange = (e) => {
    const customer = Object.assign({}, this.state.customer)
    const name = e.target.name;
    const value = e.target.value;
    customer[name] = value;
    this.setState({ customer });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  render() {
    const { customer, formError, formSubmit } = this.state;
    let { modalName, typeName, isRotate, isBlock, typeDetails } = this.props;
    modalName = modalName || "Tenant";

    const componentName = isRotate ? 'rotate' : isBlock ? 'block' : 'delete'

    return (
      <div >
        <Modal
          className={`delete-account ${modalName}`}
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box" key="delete">
              <Button className="delete-btn" key="back" onClick={this.handleOk}>
                {componentName == 'rotate' ? 'ROTATE' : componentName == 'block' ? 'BLOCK' : 'DELETE'}
              </Button>
              <Button className="cancle-btn" key="submit" type="primary" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <form ref={node => this.fromNode = node} noValidate autoComplete="off">
            <div className="heading-text">Are you absolutely sure?</div>
            {!isBlock && <div className="sub-heading-text">This action cannot be undone.</div>}
            {!isBlock && <div className="sub-heading-text marign-bottom-20">This will permanently {componentName == 'rotate' ? 'rotate the client secret for' : componentName} the {modalName} <b>- {this.getTypeName() || 'oloid.com'}</b></div>}
            {isBlock && <div className="sub-heading-text marign-bottom-20">This action will block any attempt of sign-in of<b> {this.getTypeName()}</b></div>}
            {modalName != 'User' && <div>
              <TextField
                id="tenant"
                label={`Type the name of the ${modalName}`}
                type="text"
                className='education-form-textfield'
                margin="normal"
                variant="outlined"
                placeholder={`Type the name of the ${modalName}`}
                required
                value={customer.tenantName}
                name="tenantName"
                error={formSubmit && formError['tenantName'] && (!formError['tenantName'].valid)}
                onChange={(e) => { this.handleChange(e) }}
              />
              <TextField
                id="description"
                label={`Please type the reason you are ${componentName == 'rotate' ? 'rotating the secret' : `deleting the ${modalName}`}`}
                multiline
                rows="6"
                className='education-form-textfield'
                margin="normal"
                variant="outlined"
                placeholder={`Please type the reason you are ${componentName == 'rotate' ? 'rotating the secret' : `deleting the ${modalName}`}`}
                required
                value={customer.description}
                name="description"
                error={formSubmit && formError['description'] && (!formError['description'].valid)}
                onChange={(e) => { this.handleChange(e) }}
              />
            </div>}
          </form>
        </Modal>
      </div>
    );
  }
}

export default DeleteTenant;

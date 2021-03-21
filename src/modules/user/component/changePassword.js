import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.scss';
import { Button } from 'antd';
import TextField from "@material-ui/core/TextField";
import logo from '../../../image/Logo-Horizontal.png';
import { fromValidate } from '../../../helpers'

class ChangePassword extends Component{

	constructor(props) {
    super(props);
    this.state = {
      formError: {},
      formSubmit: false,
      user: {}
		}
	}

	handleChange = (e) => {
    const user = Object.assign({}, this.state.user)
    const name = e.target.name;
    const value = e.target.value;
    user[name] = value;
    this.setState({ user });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

	render(){
		const { user, formError, formSubmit } = this.state;
		return (
			<div className='login-container'>
				<div className='oloid-box'>
					<img src={logo}></img>
					{/* <div className='text-oloid'>Oloid</div> */}
				</div>
				<div className='login-box'>
					<div className='txt-login txt-change'>CHANGE PASSWORD</div>
					<div className='txt-desc'>You need to change your password because this is the first time you have logged in</div>
					<div>
						<form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
							<div>
								<TextField
									required
									id="current_password"
									label="Current Password"
									type="text"
									className='form-textfield'
									margin="normal"
									variant="outlined"
									placeholder="Current Password"
									value={user.currentPassword}
									name="currentPassword"
									error={formSubmit && formError['currentPassword'] && (!formError['currentPassword'].valid)}
									onChange={(e) => { this.handleChange(e) }}
								/>
							</div>
							<div className='txt-forgot'>Forgot your password?</div>
							<div>
								<TextField
									required
									id="new_password"
									label="New Password"
									type="text"
									className='form-textfield'
									variant="outlined"
									margin="normal"
									placeholder="New Password"
									value={user.newPassword}
									name="newPassword"
									error={formSubmit && formError['newPassword'] && (!formError['newPassword'].valid)}
									onChange={(e) => { this.handleChange(e) }}
								/>
							</div>
							<div>
								<TextField
									required
									id="confirm_password"
									label="Confirm Password"
									type="text"
									className='form-textfield'
									variant="outlined"
									margin="normal"
									placeholder="Confirm Password"
									value={user.confirmPassword}
									name="confirmPassword"
									error={formSubmit && formError['confirmPassword'] && (!formError['confirmPassword'].valid)}
									onChange={(e) => { this.handleChange(e) }}
								/>
							</div>
							<div>
								<Button className='btn-login mg-top'>SAVE</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
      user,
    }
  }
export default connect(mapStateToProps)(ChangePassword);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.scss';
import { Button } from 'antd';
import TextField from "@material-ui/core/TextField";
import logo from '../../../image/Logo-Horizontal.png';
import { fromValidate } from '../../../helpers'

class ResetPassword extends Component{

	constructor(props) {
    super(props);
    this.state = {
      formError: {},
      formSubmit: false,
			user: {},
			userNumber:'****7890',
			isSuccess: true,
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
		const { user, formError, formSubmit, userNumber, isSuccess } = this.state;
		return (
			<div className='login-container'>
				<div className='oloid-box'>
					<img src={logo}></img>
					{/* <div className='text-oloid'>Oloid</div> */}
				</div>
				<div className='login-box'>
					<div className='txt-login'>RESET PASSWORD</div>
					<div className='txt-desc mg-bottom'>Enter your email below and we will send you reset password instructions</div>
					<form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
						<div>
							<div>
								<TextField
									required
									id="email"
									label="Work Email"
									type="text"
									className='form-textfield'
									variant="outlined"
									placeholder="Work Email"
									value={user.workEmail}
									name="workEmail"
									error={formSubmit && formError['workEmail'] && (!formError['workEmail'].valid)}
									onChange={(e) => { this.handleChange(e) }}
								/>
							</div>
							<div>
								<Button className='btn-login mg-top'>RESET</Button>
							</div>
						</div>
					</form>
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
export default connect(mapStateToProps)(ResetPassword);
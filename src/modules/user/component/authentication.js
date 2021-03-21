import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.scss';
import { Button } from 'antd';
import TextField from "@material-ui/core/TextField";
import logo from '../../../image/Logo-Horizontal.png';
import { fromValidate, history } from '../../../helpers'

class Authentication extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formError: {},
			formSubmit: false,
			user: {},
			userNumber: '****7890',
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

	handleSubmit = () => {
		history.push('/applications')
	}

	render() {
		const { user, formError, formSubmit, userNumber, isSuccess } = this.state;
		return (
			<div className='login-container'>
				<div className='oloid-box'>
					<img src={logo}></img>
					{/* <div className='text-oloid'>Oloid</div> */}
				</div>
				<div className='login-box'>
					<div className='txt-login'>2-FACTOR AUTHENTICATION</div>
					<div className='txt-desc'>This extra step is to verify that it's really you trying to log in</div>
					{isSuccess && <div className='txt-success-msg'>A text message with a 6 digit verification code has been sent to phone number ending {userNumber}</div>}
					<form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>

						<div>
							<div>
								<TextField
									required
									id="code"
									label="Code"
									type="text"
									className='form-textfield'
									variant="outlined"
									placeholder="Enter 6 digit code"
									value={user.code}
									name="code"
									error={formSubmit && formError['code'] && (!formError['code'].valid)}
									onChange={(e) => { this.handleChange(e) }}
								/>
							</div>
							<div>
								<Button htmlType="submit" className='btn-login mg-top'>VERIFY</Button>
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
export default connect(mapStateToProps)(Authentication);
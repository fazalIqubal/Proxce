import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.scss';
import { Button, message } from 'antd';
import logo from '../../../image/Logo-Horizontal.png';
import { fromValidate } from '../../../helpers';
import { history } from '../../../helpers'
import { login, setNewPassword, logout, forgotPasswordSubmit } from '../action/user.actions'
import Amplify from 'aws-amplify';
import _ from "lodash";
import axios from 'axios';
import { apiEndpoint } from '../../../services/endpoint';
import { setItem, removeItem } from '../../../helpers';
import * as qs from 'qs';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formError: {},
			formSubmit: false,
			newPasswordReq: false,
			user: {}
		}
	}

	componentDidMount() {
		const { location } = this.props;
		const searchParam = qs.parse(location.search, { ignoreQueryPrefix: true });
		this.getUserPoolId();
		let user = searchParam && searchParam.user;
		if (user) {
			try {
				user = JSON.parse(user);
			} catch (error) {
				console.log(error)
			}
			if (user && user.accesstoken) {
				setItem('user', user);
				history.push('/applications');
			}
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

	goToResetPassword = () => {
		history.push('/resetPassword')
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { user } = this.state;

		this.setState({ formSubmit: true, formError: {} })
		const formValidation = fromValidate(this.fromNode);
		if (!formValidation.valid) {
			this.setState({ formError: formValidation.invalidationEle })
		}

		message.loading({ content: 'sign in...', key: 'loging' });
		dispatch(login(user.workEmail, user.password))
			.then((res) => {
				if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
					this.setState({ formSubmit: false, formError: {}, newPasswordReq: true, userData: res })
				}
				else if (res.code === 'PasswordResetRequiredException') {
					this.setState({ formSubmit: false, formError: {}, resetPasswordReq: true, userData: res })
				}
				else if (res.accesstoken) {
					history.push('/applications')
				}
				if (res.message) {
					message.error({ content: res.message, key: 'loging' });
				}
			});

	}

	handleSetPassword = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { user, userData } = this.state;
		if (!(user.newPassword || user.confirmPassword)) {
			message.error('Password and confirm password should not blank');
			return;
		}
		if (user.newPassword != user.confirmPassword) {
			message.error('Password and confirm password not match');
			return;
		}
		// var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		// if (!reg.test(user.newPassword)) {
		// 	message.error('Password must be alphanumeric with minimum 8 characters');
		// 	return;
		// }

		dispatch(setNewPassword(userData, user.newPassword))
			.then((res) => {
				if (res.accesstoken) {
					history.push('/applications')
				}
				if (res.message) {
					message.error({ content: res.message, key: 'loging' });
				}
			})

	}

	forgotPasswordSubmit = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { user } = this.state;
		if (!(user.newPassword) || !(user.code)) {
			message.error('Please fill the all the required field');
			return;
		}

		dispatch(forgotPasswordSubmit(user.workEmail, user.code, user.newPassword))
			.then((res) => {
				if (res.message) {
					message.error({ content: res.message, key: 'loging' });
				}
				else if (res.accesstoken) {
					history.push('/tenants');
				}
			})

	}

	render() {
		const { user, formError, formSubmit, newPasswordReq, resetPasswordReq } = this.state;
		return (
			<div className='login-container'>
				<div className='oloid-box'>
					<img src={logo}></img>
					{/* <div className='text-oloid'>Oloid</div> */}
				</div>
				{(!newPasswordReq && !resetPasswordReq) &&

					<div className='login-box'>
						<div className='txt-login'>LOGIN</div>
						<form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
							<div>
								<div>
									<TextField
										required
										id="email"
										label="Username or Email"
										type="text"
										className='form-textfield'
										variant="outlined"
										placeholder="Username or Email"
										value={user.workEmail}
										name="workEmail"
										error={formSubmit && formError['workEmail'] && (!formError['workEmail'].valid)}
										onChange={(e) => { this.handleChange(e) }}
									/>
								</div>
								<div>
									<TextField
										required
										id="password"
										label="Password"
										type="password"
										className='form-textfield'
										margin="normal"
										variant="outlined"
										placeholder="Password"
										value={user.password}
										name="password"
										error={formSubmit && formError['password'] && (!formError['password'].valid)}
										onChange={(e) => { this.handleChange(e) }}
									/>
								</div>
								<div className='txt-forgot' onClick={this.goToResetPassword}>Forgot your password?</div>
								<div className='remember-box'>
									<div className='square-box'>
										<div className='green-box'></div>
									</div>
									<div>Remember Me</div>
								</div>
								<div>
									<Button htmlType="submit" className='btn-login'>LOGIN</Button>
								</div>
							</div>
						</form>
					</div>
				}
				{
					(newPasswordReq) &&
					<div className='login-box'>
						<div className='txt-login'>Set New Password</div>
						<form ref={node => this.fromNode = node} noValidate autoComplete="off"
							onSubmit={(e) => { this.handleSetPassword(e) }}>
							<div>
								<div>
									<TextField
										required
										id="newPassword"
										label="New Password"
										type="password"
										className='form-textfield'
										variant="outlined"
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
										id="confirmPassword"
										label="Confirm Password"
										type="password"
										className='form-textfield'
										margin="normal"
										variant="outlined"
										placeholder="Confirm Password"
										value={user.confirmPassword}
										name="confirmPassword"
										error={formSubmit && formError['confirmPassword'] && (!formError['confirmPassword'].valid)}
										onChange={(e) => { this.handleChange(e) }}
									/>
								</div>
								<div>
									<Button htmlType="submit" className='btn-login'>LOGIN</Button>
								</div>
							</div>
						</form>
					</div>
				}

				{
					(resetPasswordReq) &&
					<div className='login-box'>
						<div className='txt-login'>Set New Password</div>
						<form ref={node => this.fromNode = node} noValidate autoComplete="off"
							onSubmit={(e) => { this.forgotPasswordSubmit(e) }}>
							<div>
								<div>
									<TextField
										disabled
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
									<TextField
										required
										id="code"
										label="Code"
										type="text"
										className='form-textfield'
										margin="normal"
										variant="outlined"
										placeholder="Code"
										value={user.code}
										name="code"
										error={formSubmit && formError['code'] && (!formError['code'].valid)}
										onChange={(e) => { this.handleChange(e) }}
									/>
								</div>
								<div>
									<TextField
										required
										id="newPassword"
										label="New Password"
										type="password"
										className='form-textfield'
										margin="normal"
										variant="outlined"
										placeholder="New Password"
										value={user.newPassword}
										name="newPassword"
										error={formSubmit && formError['newPassword'] && (!formError['newPassword'].valid)}
										onChange={(e) => { this.handleChange(e) }}
									/>
								</div>

								<div className="mg-top">
									<Button htmlType="submit" className='btn-login'>LOGIN</Button>
								</div>
							</div>
						</form>
					</div>
				}
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
export default connect(mapStateToProps)(Login);
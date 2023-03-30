import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../ThemeContext/ThemeContext'
import {
  LogInContainer,
  FormContainer,
  Label,
  LoginBtn,
  CheckboxLabel,
} from '../../StyledComponent'
import './index.css'

class LoginForm extends Component {
  state = {showPassword: false, username: '', password: '', errMsg: ''}

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  enterUserName = event => {
    this.setState({username: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const {showPassword, password, username, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const loginImg = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <LogInContainer theme={isDark}>
              <FormContainer onSubmit={this.onClickLogin} theme={isDark}>
                <img src={loginImg} alt="website logo" className="login-logo" />
                <Label theme={isDark} htmlFor="username">
                  USERNAME
                </Label>
                <input
                  onChange={this.enterUserName}
                  placeholder="Username"
                  className="input-bar"
                  id="username"
                  type="text"
                  value={username}
                />
                <Label theme={isDark} htmlFor="password">
                  PASSWORD
                </Label>
                <input
                  onChange={this.enterPassword}
                  placeholder="Password"
                  className="input-bar"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <div className="checkbox-container">
                  <input
                    onClick={this.toggleShowPassword}
                    type="checkbox"
                    id="checkbox"
                  />
                  <CheckboxLabel theme={isDark} htmlFor="checkbox">
                    Show Password
                  </CheckboxLabel>
                </div>
                <LoginBtn type="submit" className="login-btn">
                  Login
                </LoginBtn>
                {errMsg !== '' && <p className="err-msg">*{errMsg}</p>}
              </FormContainer>
            </LogInContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm

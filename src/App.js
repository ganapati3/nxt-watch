import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import ThemeContext from './ThemeContext/ThemeContext'
import LoginForm from './components/LogInForm'
import Home from './components/Home'
import VideoDetailsItem from './components/VideoDetailsItem'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false}

  changeTheme = theme => {
    this.setState({isDark: theme})
  }

  render() {
    const {isDark} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideoDetailsItem} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App

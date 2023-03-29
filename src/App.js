import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import ThemeContext from './ThemeContext/ThemeContext'
import LoginForm from './components/LogInForm'
import Home from './components/Home'
import VideoDetailsItem from './components/VideoDetailsItem'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedList: []}

  changeTheme = theme => {
    this.setState({isDark: theme})
  }

  addToSaved = list => {
    const {savedList} = this.state
    this.setState(prevState => ({savedList: [...prevState.savedList, list]}))
  }

  render() {
    const {isDark, savedList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedList,
          addToSaved: this.addToSaved,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideoDetailsItem} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App

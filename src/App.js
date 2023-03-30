import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './ThemeContext/ThemeContext'
import LoginForm from './components/LogInForm'
import Home from './components/Home'
import VideoDetailsItem from './components/VideoDetailsItem'
import TrendingPage from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedList: []}

  changeTheme = theme => {
    this.setState({isDark: theme})
  }

  addToSaved = list => {
    const {savedList} = this.state
    const isSaved = savedList.find(eachItem => eachItem.id === list.id)
    if (isSaved !== undefined) {
      const filtered = savedList.filter(item => item.id !== list.id)
      this.setState({savedList: filtered})
    } else {
      this.setState(prevState => ({savedList: [...prevState.savedList, list]}))
    }
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
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoDetailsItem}
          />
          <ProtectedRoute exact path="/trending" component={TrendingPage} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App

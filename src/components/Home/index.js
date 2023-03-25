import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../ThemeContext/ThemeContext'
import './index.css'

class Home extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <Header />
              <div className="side-bar-and-video-container">
                <SideBar />
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home

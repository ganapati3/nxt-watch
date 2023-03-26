import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import {VideoAndBannerContainer} from '../../StyledComponent'
import ThemeContext from '../../ThemeContext/ThemeContext'
import './index.css'

const apiConstants = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class VideoDetailsItem extends Component {
  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

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
                <VideoAndBannerContainer theme={isDark}>
                  <h1>slkdflk</h1>
                </VideoAndBannerContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoDetailsItem

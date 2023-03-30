import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingVideoItem from '../GamingVideoItem'
import {
  TrendingContainer,
  FailureTextHeading,
  FailureTextDescription,
  RouteHeader,
  HeaderLogo,
} from '../../StyledComponent'
import ThemeContext from '../../ThemeContext/ThemeContext'
import './index.css'

const apiConstants = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class Gaming extends Component {
  state = {apiStatus: '', gamingVideos: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        gamingVideos: formattedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getGamingVideos()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-video-details-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const failureImg = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="loader-video-details-container">
            <img className="failure-img" src={failureImg} alt="failure view" />
            <FailureTextHeading theme={isDark}>
              Oops! Something Went Wrong
            </FailureTextHeading>
            <FailureTextDescription theme={isDark}>
              We are having some trouble to complete your request. Please try
              again.
            </FailureTextDescription>
            <button
              onClick={this.onClickRetry}
              type="button"
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderGamingVideos = () => {
    const {gamingVideos} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const trendingHeading = isDark
            ? 'trending-heading-dark'
            : 'trending-heading-light'
          return (
            <>
              <RouteHeader theme={isDark}>
                <HeaderLogo theme={isDark}>
                  <SiYoutubegaming className="trending-logo" />
                </HeaderLogo>
                <h1 className={trendingHeading}>Gaming</h1>
              </RouteHeader>
              <ul className="gaming-video-items">
                {gamingVideos.map(video => (
                  <GamingVideoItem key={video.id} videoDetails={video} />
                ))}
              </ul>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderTrendingView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderGamingVideos()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <div className="side-bar-and-video-container">
                <SideBar />
                <TrendingContainer data-testid="gaming" theme={isDark}>
                  {this.renderTrendingView()}
                </TrendingContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming

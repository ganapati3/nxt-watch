import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingVideoItem from '../TrendingVideoItem'
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

class TrendingPage extends Component {
  state = {apiStatus: '', trendingVideos: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        trendingVideos: formattedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getTrendingVideos()
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

  renderTrendingVideos = () => {
    const {trendingVideos} = this.state
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
                  <HiFire className="trending-logo" />
                </HeaderLogo>
                <h1 className={trendingHeading}>Trending</h1>
              </RouteHeader>
              <ul className="trending-videos-container">
                {trendingVideos.map(eachVideo => (
                  <TrendingVideoItem
                    key={eachVideo.id}
                    videoDetails={eachVideo}
                  />
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
        return this.renderTrendingVideos()
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
            <div className="main-container">
              <Header />
              <div className="side-bar-and-video-container">
                <SideBar />
                <TrendingContainer data-testid="trending" theme={isDark}>
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

export default TrendingPage

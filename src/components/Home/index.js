import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoCloseSharp} from 'react-icons/io5'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoCardItem from '../VideoCardItem'
import ThemeContext from '../../ThemeContext/ThemeContext'

import {
  BannerContainer,
  VideoAndBannerContainer,
  FailureTextHeading,
  FailureTextDescription,
} from '../../StyledComponent'
import './index.css'

const apiConstants = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: '',
    homeVideos: [],
    isBannerClosed: false,
  }

  componentDidMount() {
    this.getHomeVideoContent()
  }

  getHomeVideoContent = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      console.log(formattedData)
      this.setState({
        apiStatus: apiConstants.success,
        homeVideos: formattedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  onClickRetry = () => {
    this.getHomeVideoContent()
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const failureImg = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <>
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
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderNoVideosView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        return (
          <>
            <img
              className="failure-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <FailureTextHeading theme={isDark}>
              No Search results found
            </FailureTextHeading>
            <FailureTextDescription theme={isDark}>
              Try different key words or remove search filter
            </FailureTextDescription>
            <button
              onClick={this.onClickRetry}
              type="button"
              className="retry-btn"
            >
              Retry
            </button>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderHomeVideos = () => {
    const {homeVideos} = this.state
    return (
      <>
        {homeVideos.length > 0 ? (
          <ul className="video-card-items">
            {homeVideos.map(video => (
              <VideoCardItem key={video.id} videoDetails={video} />
            ))}
          </ul>
        ) : (
          this.renderNoVideosView()
        )}
      </>
    )
  }

  filterResults = () => {
    this.getHomeVideoContent()
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderHomeVideos()
      default:
        return null
    }
  }

  closeBanner = () => {
    this.setState({isBannerClosed: true})
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, isBannerClosed} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div className="main-container">
              <Header />
              <div className="side-bar-and-video-container">
                <SideBar />
                <VideoAndBannerContainer theme={isDark} data-testid="home">
                  {isBannerClosed ? null : (
                    <BannerContainer
                      data-testid="banner"
                      className="banner-container"
                    >
                      <div>
                        <img
                          className="banner-logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p className="subscription-text">
                          Buy NXT Watch Premium prepaid plans with UPI
                        </p>
                        <button type="button" className="get-now-btn">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        onClick={this.closeBanner}
                        data-testid="close"
                        type="button"
                      >
                        <IoCloseSharp className="banner-close-icon" />
                      </button>
                    </BannerContainer>
                  )}
                  <div className="home-videos-and-search-container">
                    <div className="search-container">
                      <input
                        value={searchInput}
                        onChange={this.updateSearchInput}
                        placeholder="Search"
                        type="search"
                        className="search-bar"
                      />
                      <div className="search-icon">
                        <button
                          data-testid="searchButton"
                          type="button"
                          onClick={this.filterResults}
                        >
                          <AiOutlineSearch />
                        </button>
                      </div>
                    </div>
                    <div className="home-videos-container">
                      {this.renderView()}
                    </div>
                  </div>
                </VideoAndBannerContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home

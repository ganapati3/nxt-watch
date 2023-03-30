import {Component} from 'react'
import ReactPlayer from 'react-player'
import {GoPrimitiveDot} from 'react-icons/go'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import {
  TrendingContainer,
  FailureTextHeading,
  FailureTextDescription,
} from '../../StyledComponent'
import ThemeContext from '../../ThemeContext/ThemeContext'
import './index.css'

const apiConstants = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class VideoDetailsItem extends Component {
  state = {apiStatus: '', videoDetails: {}, isLiked: false, isDisliked: false}

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
    if (response.ok) {
      const formattedData = {
        id: data.video_details.id,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        subscriberCount: data.video_details.channel.subscriber_count,
        videoUrl: data.video_details.video_url,
        description: data.video_details.description,
      }
      this.setState({
        apiStatus: apiConstants.success,
        videoDetails: formattedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getVideoDetails()
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

  onClickLike = () => {
    this.setState({isLiked: true, isDisliked: false})
  }

  onClickDislike = () => {
    this.setState({isLiked: false, isDisliked: true})
  }

  renderVideoDetails = () => {
    const {videoDetails, isLiked, isDisliked} = this.state
    const {
      id,
      name,
      profileImageUrl,
      publishedAt,
      title,
      viewCount,
      description,
      videoUrl,
      subscriberCount,
    } = videoDetails
    const formatDate = formatDistanceToNow(new Date(publishedAt)).split(' ')

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, savedList, addToSaved} = value
          const fontStyle = isDark ? 'dark-card-content' : 'light-card-content'

          const liked = isLiked ? 'active-reaction-btn' : 'reaction-btn-light'
          const disliked = isDisliked
            ? 'active-reaction-btn'
            : 'reaction-btn-light'
          const onClickSave = () => {
            addToSaved(videoDetails)
          }
          const isSaved = savedList.find(eachItem => eachItem.id === id)

          const savedText = isSaved
            ? ['Saved', 'active-reaction-btn']
            : ['Save', '']

          return (
            <>
              <div className="video-details-container">
                <div className="video-player">
                  <ReactPlayer height="100%" width="100%" url={videoUrl} />
                </div>
                <div className="video-details-content-card">
                  <p className={fontStyle}>{title}</p>
                  <div className="views-and-like-Container">
                    <div className="video-card-content views-and-published-container">
                      <p className="video-card-content">{viewCount} views</p>
                      <GoPrimitiveDot />
                      <p className="video-card-content">
                        {formatDate.slice(1).join(' ')} ago{' '}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={this.onClickLike}
                        className={liked}
                        type="button"
                      >
                        <BiLike className={liked} />
                        Like
                      </button>
                      <button
                        onClick={this.onClickDislike}
                        className={disliked}
                        type="button"
                      >
                        <BiDislike className={disliked} />
                        Dislike
                      </button>
                      <button
                        onClick={onClickSave}
                        className={`reaction-btn-light ${savedText[1]}`}
                        type="button"
                      >
                        <CgPlayListAdd
                          className={`reaction-btn-light ${savedText[1]}`}
                        />
                        {savedText[0]}
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="video-card-content">
                    <img
                      className="card-channel-logo"
                      src={profileImageUrl}
                      alt="channel logo"
                    />
                    <div>
                      <p className="video-card-content">{name}</p>
                      <p className="video-card-content">
                        {subscriberCount} subscribers
                      </p>
                      <p className={fontStyle}>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderVideoDetailsItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderVideoDetails()
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
                <TrendingContainer
                  data-testid="videoItemDetails"
                  theme={isDark}
                >
                  {this.renderVideoDetailsItem()}
                </TrendingContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoDetailsItem

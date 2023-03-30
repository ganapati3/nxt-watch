import {Link, withRouter} from 'react-router-dom'
import {GoPrimitiveDot} from 'react-icons/go'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../ThemeContext/ThemeContext'
import './index.css'

const TrendingVideoItem = props => {
  const {videoDetails} = props
  const {
    id,
    name,
    profileImageUrl,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  const formatDate = formatDistanceToNow(new Date(publishedAt)).split(' ')

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headingText = isDark ? 'dark-heading' : 'light-heading'
        return (
          <Link className="link-style" to={`/videos/${id}`}>
            <li className="trending-video-card">
              <img
                className="trending-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div>
                <p className={headingText}>{title}</p>
                <p className="video-card-content">{name}</p>
                <div className="views-and-published-container video-card-content">
                  <p className="video-card-content">{viewCount} views</p>
                  <GoPrimitiveDot />
                  <p className="video-card-content">{publishedAt} ago </p>
                </div>
              </div>
            </li>
            <li className="trending-video-card-sm">
              <img
                className="trending-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="logo-and-content-container">
                <img
                  className="trending-channel-logo"
                  src={profileImageUrl}
                  alt="profile"
                />
                <div>
                  <p className={headingText}>{title}</p>
                  <div className="trending-content">
                    <div className="views-and-published-container video-card-content">
                      <p className="video-card-content">{name}</p>
                      <GoPrimitiveDot />
                      <p className="video-card-content">{viewCount} views</p>
                      <GoPrimitiveDot />
                      <p className="video-card-content">{publishedAt} ago </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(TrendingVideoItem)

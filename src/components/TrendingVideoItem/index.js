import {Link} from 'react-router-dom'
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
                <h1 className={headingText}>{title}</h1>
                <p className="video-card-content">{name}</p>
                <p className="video-card-content">
                  {viewCount} views
                  <GoPrimitiveDot />
                  {formatDate.slice(1).join(' ')} ago{' '}
                </p>
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
                  alt="channel logo"
                />
                <div>
                  <h1 className={headingText}>{title}</h1>
                  <div className="trending-content">
                    <p className="video-card-content">
                      {name}
                      <GoPrimitiveDot />
                    </p>
                    <p className="video-card-content">
                      {viewCount} views
                      <GoPrimitiveDot />
                      {formatDate.slice(1).join(' ')} ago{' '}
                    </p>
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

export default TrendingVideoItem

import {Link} from 'react-router-dom'
import {GoPrimitiveDot} from 'react-icons/go'
import {formatDistanceToNow} from 'date-fns'

import ThemeContext from '../../ThemeContext/ThemeContext'

import './index.css'

const VideoCardItem = props => {
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
        const fontStyle = isDark ? 'dark-card-content' : 'light-card-content'
        return (
          <Link to={`/videos/${id}`} className="link-style">
            <li className="video-item-card">
              <img
                className="thumbnail-img"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="video-card-content">
                <img
                  className="card-channel-logo"
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p className={fontStyle}>{title}</p>
                  <p className="video-card-content">{name}</p>
                  <div className="views-and-published-container">
                    <p className="video-card-content">{viewCount} views</p>
                    <GoPrimitiveDot />
                    <p className="video-card-content">
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

export default VideoCardItem

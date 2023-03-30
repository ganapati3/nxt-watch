import {Link} from 'react-router-dom'
import ThemeContext from '../../ThemeContext/ThemeContext'
import './index.css'

const GamingVideoItem = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const fontStyle = isDark ? 'dark-card-content' : 'light-card-content'
        return (
          <Link to={`/videos/${id}`} className="link-style">
            <li className="gaming-video-card">
              <img
                className="gaming-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <p className={fontStyle}>{title}</p>
              <p className="video-card-content">
                {viewCount} Watching Worldwide
              </p>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingVideoItem

import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../ThemeContext/ThemeContext'
import {SideBarContainer, CustomText} from '../../StyledComponent'
import './index.css'

const SideBar = props => {
  const {location} = props

  const home = location.pathname === '/'
  const trending = location.pathname === '/trending'
  const gaming = location.pathname === '/gaming'
  const saved = location.pathname === '/saved-videos'
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const linkStyle = isDark ? 'link-item-dark' : 'link-item-light'
        const darkOrLight = isDark ? 'active-link-dark' : 'active-link-light'
        return (
          <SideBarContainer theme={isDark}>
            <ul className="link-item-container">
              <Link to="/" className="link-item">
                <li className={home ? darkOrLight : linkStyle}>
                  <AiFillHome className="link-icon" />
                  Home
                </li>
              </Link>
              <Link to="/trending" className="link-item">
                <li className={trending ? darkOrLight : linkStyle}>
                  <HiFire className="link-icon" />
                  Trending
                </li>
              </Link>
              <Link to="/gaming" className="link-item">
                <li className={gaming ? darkOrLight : linkStyle}>
                  <SiYoutubegaming className="link-icon" />
                  Gaming
                </li>
              </Link>
              <Link className="link-item" to="/saved-videos">
                <li className={saved ? darkOrLight : linkStyle}>
                  <MdPlaylistAdd className="link-icon" />
                  Saved Videos
                </li>
              </Link>
            </ul>
            <div>
              <CustomText theme={isDark} as="p">
                CONTACT US
              </CustomText>
              <div className="social-icons-container">
                <img
                  className="social-icon"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="social-icon"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  className="social-icon"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <CustomText theme={isDark} as="p">
                Enjoy! Now to see your channels and recommendations!
              </CustomText>
            </div>
          </SideBarContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(SideBar)

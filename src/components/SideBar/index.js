import {Link, NavLink, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../ThemeContext/ThemeContext'
import {SideBarContainer, CustomText} from '../../StyledComponent'
import './index.css'

const SideBar = props => {
  const {location} = props
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const linkStyle = isDark ? 'link-item-dark' : 'link-item'
        return (
          <SideBarContainer theme={isDark}>
            <ul className="link-item-container">
              <NavLink
                to="/"
                className={isActive => (isActive ? 'active' : {linkStyle})}
              >
                <li>
                  <AiFillHome className="link-icon" /> Home
                </li>
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/trending"
                className={linkStyle}
              >
                <li>
                  <HiFire className="link-icon" /> Trending
                </li>
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/gaming"
                className={linkStyle}
              >
                <li>
                  <SiYoutubegaming className="link-icon" /> Gaming
                </li>
              </NavLink>
              <NavLink
                activeClassName="active"
                className={linkStyle}
                to="/saved-videos"
              >
                <li>
                  <MdPlaylistAdd className="link-icon" /> Saved
                </li>
              </NavLink>
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

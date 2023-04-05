import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose, AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../ThemeContext/ThemeContext'
import {
  NavBar,
  HamburgerContainer,
  LogoutButton,
  LogoutContainer,
} from '../../StyledComponent'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const {location} = props

  const home = location.pathname === '/'
  const trending = location.pathname === '/trending'
  const gaming = location.pathname === '/gaming'
  const saved = location.pathname === '/saved-videos'

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, changeTheme} = value

        const toggleTheme = () => {
          changeTheme(!isDark)
        }

        const logo = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const linkStyle = isDark ? 'link-item-dark' : 'link-item-light'
        const darkOrLight = isDark ? 'active-link-dark' : 'active-link-light'

        const lightAndDarkLogo = isDark
          ? [
              <FiSun className="dark-icon" />,
              <GiHamburgerMenu className="dark-icon" />,
              <FiLogOut className="dark-icon" />,
              <AiOutlineClose className="dark-icon close-icon-dark" />,
            ]
          : [
              <FaMoon className="light-icon" />,
              <GiHamburgerMenu className="light-icon" />,
              <FiLogOut className="light-icon" />,
              <AiOutlineClose className="light-icon close-icon-light" />,
            ]
        const logoutText = isDark ? 'logout-text' : 'logout-text-light'
        return (
          <>
            <NavBar theme={isDark}>
              <Link to="/">
                <img className="logo" src={logo} alt="website logo" />
              </Link>
              <ul className="sm-icon-container">
                <li>
                  <button
                    data-testid="theme"
                    onClick={toggleTheme}
                    type="button"
                  >
                    {lightAndDarkLogo[0]}
                  </button>
                </li>
                <li>
                  <Popup
                    modal
                    trigger={
                      <button type="button">{lightAndDarkLogo[1]}</button>
                    }
                  >
                    {close => (
                      <HamburgerContainer theme={isDark}>
                        <button type="button" onClick={() => close()}>
                          {lightAndDarkLogo[3]}
                        </button>
                        <ul className="link-item-container link-item-container-sm ">
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
                      </HamburgerContainer>
                    )}
                  </Popup>
                </li>
                <Popup
                  modal
                  trigger={<button type="button">{lightAndDarkLogo[2]}</button>}
                >
                  {close => (
                    <LogoutContainer theme={isDark}>
                      <p className={logoutText}>
                        Are you sure, you want to logout
                      </p>
                      <div>
                        <button
                          onClick={() => close()}
                          type="button"
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onClickLogout}
                          type="button"
                          className="logout-btn"
                        >
                          Confirm
                        </button>
                      </div>
                    </LogoutContainer>
                  )}
                </Popup>
              </ul>
              <ul className="md-icon-container">
                <li>
                  <button
                    data-testid="theme"
                    onClick={toggleTheme}
                    type="button"
                  >
                    {lightAndDarkLogo[0]}
                  </button>
                </li>
                <li>
                  <img
                    className="profile-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </li>
                <Popup
                  modal
                  trigger={
                    <LogoutButton theme={isDark} type="button">
                      Logout
                    </LogoutButton>
                  }
                >
                  {close => (
                    <LogoutContainer theme={isDark}>
                      <p className={logoutText}>
                        Are you sure, you want to logout
                      </p>
                      <div>
                        <button
                          onClick={() => close()}
                          type="button"
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onClickLogout}
                          type="button"
                          className="logout-btn"
                        >
                          Confirm
                        </button>
                      </div>
                    </LogoutContainer>
                  )}
                </Popup>
              </ul>
            </NavBar>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)

import {Link} from 'react-router-dom'
import {AiOutlineClose, AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../ThemeContext/ThemeContext'
import {SideBarContainer} from '../../StyledComponent'
import './index.css'

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const linkStyle = isDark ? 'link-item-dark' : 'link-item'
      return (
        <SideBarContainer theme={isDark}>
          <ul className="link-item-container">
            <Link to="/" className={linkStyle}>
              <li>
                <AiFillHome /> Home
              </li>
            </Link>
            <Link to="/trending" className={linkStyle}>
              <li>
                <HiFire /> Trending
              </li>
            </Link>
            <Link to="/gaming" className={linkStyle}>
              <li>
                <SiYoutubegaming /> Gaming
              </li>
            </Link>
            <Link className={linkStyle} to="/saved-videos">
              <li>
                <MdPlaylistAdd /> Saved
              </li>
            </Link>
          </ul>
        </SideBarContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideBar

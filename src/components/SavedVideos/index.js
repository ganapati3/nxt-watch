import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../ThemeContext/ThemeContext'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingVideoItem from '../TrendingVideoItem'
import {
  RouteHeader,
  HeaderLogo,
  TrendingContainer,
  FailureTextHeading,
  FailureTextDescription,
} from '../../StyledComponent'
import './index.css'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, savedList} = value
      const savedHeading = isDark
        ? 'trending-heading-dark'
        : 'trending-heading-light'

      return (
        <div>
          <Header />
          <div className="side-bar-and-video-container">
            <SideBar />
            <TrendingContainer data-testid="savedVideos" theme={isDark}>
              {savedList.length > 0 ? (
                <>
                  <RouteHeader theme={isDark}>
                    <HeaderLogo theme={isDark}>
                      <MdPlaylistAdd className="trending-logo" />
                    </HeaderLogo>
                    <h1 className={savedHeading}>Saved Videos</h1>
                  </RouteHeader>
                  <ul className="trending-videos-container">
                    {savedList.map(eachVideo => (
                      <TrendingVideoItem
                        key={eachVideo.id}
                        videoDetails={eachVideo}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                <div className="loader-video-details-container">
                  <img
                    className="failure-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <FailureTextHeading theme={isDark}>
                    No saved videos found
                  </FailureTextHeading>
                  <FailureTextDescription theme={isDark}>
                    You can save your videos while watching them
                  </FailureTextDescription>
                </div>
              )}
            </TrendingContainer>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos

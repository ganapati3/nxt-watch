import ThemeContext from '../../ThemeContext/ThemeContext'
import {
  FailureTextDescription,
  FailureTextHeading,
  TrendingContainer,
} from '../../StyledComponent'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const failureImg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <TrendingContainer theme={isDark}>
          <div className="loader-video-details-container">
            <img className="failure-img" src={failureImg} alt="not found" />
            <FailureTextHeading theme={isDark}>
              Page Not Found
            </FailureTextHeading>
            <FailureTextDescription theme={isDark}>
              we are sorry, the page you requested could not be found.
            </FailureTextDescription>
          </div>
        </TrendingContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound

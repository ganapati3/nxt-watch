import styled from 'styled-components'

export const LogInContainer = styled.div`
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#ffffff')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const LoginBtn = styled.button`
  background-color: #3b82f6;
  border: none;
  border-radius: 10px;
  align-self: stretch;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 15px;
  height: 40px;
`

export const FormContainer = styled.form`
  background-color: ${props => (props.theme === true ? '#000000' : '#ffffff')};
  box-shadow: ${props =>
    props.theme === true ? '' : '2px 2px 4px 0px #e2e8f0'};
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 80vw;
  }
`
export const Label = styled.label`
  color: ${props => (props.theme === true ? '#ffffff' : '#94a3b8')};
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 15px;
`
export const CheckboxLabel = styled(Label)`
  color: ${props => (props.theme === true ? '#ffffff' : '#000000')};
  font-weight: 400;
`
export const NavBar = styled.nav`
  background-color: ${props => (props.theme === true ? '#181818' : '#f9f9f9')};
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  width: 100vw;
  position: fixed;
`

export const HamburgerContainer = styled.div`
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#ffffff')};
  height: 100vh;
  background-size: cover;
  width: 100vw;
  display: flex;
  flex-direction: column;
`
export const SideBarContainer = styled.div`
  background-color: ${props => (props.theme === true ? '#181818' : '#f9f9f9')};
  width: 22vw;
  height: 90vh;
  display: flex;
  padding: 10px;
  position: fixed;
  flex-direction: column;
  margin-top: 10vh;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
  align-items: flex-start;
`
export const LogoutButton = styled.button`
  width: 80px;
  border: 2px solid ${props => (props.theme === true ? '#f1f1f1' : '#3b82f6')};
  color: ${props => (props.theme === true ? '#f1f1f1' : '#3b82f6')};
  background-color: transparent;
  font-weight: 600;
  height: 35px;
  border-radius: 5px;
  margin: 10px;
`

export const LogoutContainer = styled.div`
  width: 80vw;
  border-radius: 10px;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => (props.theme === true ? '#181818' : '#ffffff')};
  box-shadow: ${props =>
    props.theme === true ? '' : '2px 2px 4px 0px #e2e8f0'};
  @media (min-width: 768px) {
    width: 35vw;
  }
`
export const CustomText = styled(Label)`
  color: ${props => (props.theme === true ? '#ffffff' : '#1e293b')};
`

export const VideoAndBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.theme === true ? '#181818' : '#f9f9f9')};
  width: 78vw;
  overflow: auto;
  @media (max-width: 768px) {
    min-height: 90vh;
    margin-left: 0px;
    width: 100vw;
  }
  margin-left: 22vw;
  margin-top: 9vh;
  min-height: 90vh;
`

export const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#f9f9f9')};
  width: 78vw;
  overflow: auto;
  @media (max-width: 768px) {
    min-height: 90vh;
    margin-left: 0px;
    width: 100vw;
  }
  margin-left: 22vw;
  margin-top: 9vh;
  min-height: 90vh;
`

export const FailureTextHeading = styled.h1`
  color: ${props => (props.theme === true ? '#f9f9f9' : '#1e293b')};
  font-family: 'Roboto';
  font-weight: 600;
  align-self: center;
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`
export const FailureTextDescription = styled.p`
  color: ${props => (props.theme === true ? '#909090' : '#475569')};
  font-family: 'Roboto';
`
export const RouteHeader = styled.div`
  background-color: ${props => (props.theme === true ? '#212121' : '#f4f4f4')};
  height: 18vh;
  display: flex;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
`
export const HeaderLogo = styled.div`
  background-color: ${props => (props.theme === true ? '#000000' : '#e2e8f0')};
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  height: 25%;
  background-size: 100% 100%;
  width: 100%;
  background-repeat: no-repeat;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

import styled from 'styled-components'

export const LogInContainer = styled.div`
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#ffffff')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormContainer = styled.form`
  background-color: ${props => (props.theme === true ? '#000000' : '#ffffff')};
  box-shadow: ${props =>
    props.theme === true ? '' : '2px 2px 4px 0px #e2e8f0'};
  width: 40vw;
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
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#ffffff')};
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
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
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#ffffff')};
  width: 20vw;
  min-height: 100vh;
  display: none;
  @media (min-width: 768px) {
    display: flex;
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
  background-color: ${props => (props.theme === true ? '#0f0f0f' : '#ffffff')};
  box-shadow: ${props =>
    props.theme === true ? '' : '2px 2px 4px 0px #e2e8f0'};
  @media (min-width: 768px) {
    width: 35vw;
  }
`

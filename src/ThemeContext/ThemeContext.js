import React from 'react'

const ThemeContext = React.createContext({
  isDark: true,
  changeTheme: () => {},
})

export default ThemeContext

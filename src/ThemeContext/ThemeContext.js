import React from 'react'

const ThemeContext = React.createContext({
  isDark: true,
  changeTheme: () => {},
  savedList: [],
  addToSaved: () => {},
})

export default ThemeContext

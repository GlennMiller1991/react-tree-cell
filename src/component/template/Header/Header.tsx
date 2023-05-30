import './Header.css'
import React from 'react'

export const Header = React.memo(() => {

  return (
    <header className="page-header">
      <b>Testing the tree-cell-react</b>
    </header>
  )
})
Header.displayName = 'Header'


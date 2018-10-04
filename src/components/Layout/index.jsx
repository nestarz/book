import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'

export default ({ children }) => (
  <div className="layout">
    <Helmet defaultTitle="Blog by John Doe" />
    {children}
  </div>
)
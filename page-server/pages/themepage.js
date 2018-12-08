import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'

const ThemePage = ({ theme }) => {
  return (
    <div>
      <Header />
      theme page <span className='span'>here</span> {theme.span}
      <style jsx>{`
        div {
          background-color: orange;
          ${theme.main}
        }
        span { 
          ${theme.span}
        } 
      `}
      </style>
    </div>
  )
}

ThemePage.getInitialProps = async () => {
  const theme = {
    main: `background-color: yellow;`,
    span: `background-color: red;`
  }
  return { theme }
}

ThemePage.propTypes = {
  theme: PropTypes.string.isRequired
}

export default ThemePage

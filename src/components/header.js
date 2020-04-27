import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import NavBar from '../app/components/NavBar'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `0 1rem`
      }}
    >
      <h1 style={{ margin: 0, lineHeight: '10vh' }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <NavBar/>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

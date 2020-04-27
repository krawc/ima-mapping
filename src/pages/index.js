import React from "react"
import { Link } from "gatsby"

// let secureEnv = require('secure-env');
// global.env = secureEnv({secret:'imaWeltMap'});

import Layout from "../components/layout"
import MapContainer from "../components/mapcontainer"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  state = { loading: false, msg: null }
  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/token-hider")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.message }))
  }

  render() {
    const { loading, msg } = this.state
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <MapContainer/>
      </Layout>
    )
  }
}

export default IndexPage

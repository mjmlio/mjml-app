import React, { Component } from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Hero from 'components/Hero'
import Features from 'components/Features'
import GithubCorner from 'react-github-corner'

class App extends Component {

  componentDidMount () {
    const loader = document.getElementById('root-loader')
    const spinner = loader.querySelector('.root-loader-wrapper')
    new TimelineMax()
      .to(spinner, 0.5, { opacity: 0, scale: 0, y: 50, ease: Back.easeIn.config(3) })
      .to(loader, 0.5, { opacity: 0 })
      .set(loader, { display: 'none' })
  }

  render () {
    return (
      <div className='App'>
        <GithubCorner href='https://github.com/mjmlio/mjml-app' bannerColor='#e5e5e5' />
        <Header />
        <Hero />
        <Features />
        <Footer />
      </div>
    )
  }

}

export default App

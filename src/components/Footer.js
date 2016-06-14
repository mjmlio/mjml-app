import React, { Component } from 'react'

import 'styles/Footer.scss'

const contributors = [
  { img: require('../assets/meriadec.png'), link: 'https://github.com/meriadec' },
  { img: require('../assets/carlos.png'), link: 'https://twitter.com/cadxcad' },
  { img: require('../assets/shub.png'), link: 'https://github.com/shubs' },
  { img: require('../assets/nico.png'), link: 'https://github.com/ngarnier' },
  { img: 'https://avatars3.githubusercontent.com/u/6558790?v=3&s=460', link: 'https://github.com/GuillaumeBadi' },
  { img: require('../assets/loek.png'), link: 'https://github.com/lohek' },
  { img: 'https://avatars2.githubusercontent.com/u/570317?v=3&s=460', link: 'https://github.com/iRyusa' },
  { img: 'https://avatars0.githubusercontent.com/u/116530?v=3&s=460', link: 'https://github.com/robink' },
  { img: require('../assets/arnaud.png'), link: 'https://github.com/arnaudbreton' },
  { img: require('../assets/remi.png'), link: 'https://github.com/hteumeuleu' },
  { img: require('../assets/mat.png'), link: 'https://github.com/swibge' },
]

class Footer extends Component {

  render () {
    return (
      <div className='Footer'>
        <div className='contributors'>
          {contributors.map((contributor, key) =>
            <a href={contributor.link} target='_blank' key={key}>
              <img src={contributor.img} className={key % 2 ? 'small' : 'big'} />
            </a>
          )}
        </div>
        <div className='team'>
          <p className='title'>Be part of the<span className='bold'> Crew</span></p>
          <span className='desc'>The more, the merrier, agreed? Then join the party and help us make the mjml app even better!</span>
          <a className='Button flat' target='_blank' href='https://mjml.io/slack'>
            <i className='ion-pound' />
            <span>Join the community on Slack</span>
          </a>
        </div>
        <div className='bottom-bar'>
          <a target='_blank' href='http://mjml.io'><img src='https://mjml.io/assets/img/logo-footer.png' /></a>
        </div>
      </div>
    )
  }

}

export default Footer

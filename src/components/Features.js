
import React, { Component } from 'react'
import ReactInterval from 'react-interval'

import Feature from 'components/Feature'

import 'styles/Features.scss'

const steps = [
  {
    title: 'Browse the official presets library',
    img: require('assets/slides/1-browse.png'),
    desc: 'The presets section will provide a selection of the best community \
      templates using MJML. If you want your template to appear in this \
      section, please submit a pull request',
  },
  {
    title: 'Manage your templates',
    img: require('assets/slides/2-manage.png'),
    desc: 'Managing your templates can be done within the app. You can import \
      your ‘.mjml’ files, create new ones, delete your old templates, and \
      edit them with a pretty cool live reload!',
  },
  {
    title: 'Edit your email using a customizable editor',
    img: require('assets/slides/3-edit.png'),
    desc: 'When focused on the editor, you can toggle a live preview by \
      hitting ‘Cmd+p’ (or click the preview button on the top left corner) \
      and select the platform you want your email to be previewed on.',
  },
  {
    title: 'Customize your environment',
    img: require('assets/slides/4-customize.png'),
    desc: 'As a developer, I like my environment to look the way I want. \
      The Ace editor allows you to select a theme from all Ace themes \
      library available in the Settings button on the top left corner.',
  },
  {
    title: 'Send your tests to your inbox',
    img: require('assets/slides/5-send.png'),
    desc: 'The live preview is pretty cool, but we also provided a way to \
      directly send tests to your inbox to visualize the final email on your \
      phone, desktop client or browser client. You will need a Mailjet \
      account, with your API Keys, and an valid email address to be \
      used as a sender, and recipient.',
  },
]

class Features extends Component {

  state = {
    step: 0,
    automatic: true,
  }

  switchStep (index) {
    this.setState({ step: index, automatic: false })
    window.setTimeout(() => this.setState({ automatic: true }), 10000)
  }

  nextSlide = () => {

    const { step, automatic } = this.state

    if (automatic) {
      this.setState({ step: step === steps.length - 1 ? 0 : step + 1 })
    }
  }

  render () {

    const step = steps[this.state.step]
    const next = steps[this.state.step + 1]

    return (
      <div className='Features'>
        <div className='container'>
         <div className='switcher'>
           <ul>
             {steps.map((s, i) => (
               <li key={i} onClick={() => this.switchStep(i)} className={(this.state.step === i ? 'active' : '')} >
                 <i className={'ion-record'} />
               </li>
             ))}
           </ul>
         </div>
         <Feature content={step} next={next} onNext={this.nextSlide} />
        </div>
        <ReactInterval timeout={6000} enabled callback={this.nextSlide} />
      </div>
    )
  }
}

export default Features

import React from 'react'
import { storiesWithContext, storiesOf, action } from '../../stories/helpers.js'
import WithContext from 'react-with-context'

import Factory from '../../factories'
import '../components.js'

import Error404 from './Error404.jsx'
import Footer from './Footer.jsx'
import Logo from './Logo.jsx'
import Flash from './Flash.jsx'
import AppLoading from './AppLoading.jsx'
import Vote from './Vote.jsx'

storiesOf('Error404', module)
  .add('default view', () => {
    return <Error404 />
  })

storiesOf('Footer', module)
  .add('default view', () => {
    return <Footer />
  })

storiesOf('Logo', module)
  .add('image', () => {
    return <Logo logoUrl='/telescope.png' siteTitle='nova' />
  })
  .add('no image', () => {
    return <Logo siteTitle='nova' />
  })

const flashCallbacks = {
  dismissCallback: action('dismiss'),
  seenCallback: action('seen'),
}

storiesOf('Flash', module)
  .add('default', () => {
    return <Flash message={Factory.build('message')} {...flashCallbacks} />
  })
  .add('error', () => {
    return <Flash message={Factory.build('error-message')} {...flashCallbacks} />
  })

storiesOf('AppLoading', module)
  .add('default', () => {
    return <AppLoading />
  })

storiesOf('Vote', module)
  .add('logged out', () => {
    const context = { messageCallback: action('message') }
    return (
      <WithContext context={context}>
        <Vote post={Factory.build('post')} voteCallback={action('vote')} />
      </WithContext>
    )
  })
  .add('logged in', () => {
    const context = {
      currentUser: Factory.build('user'),
      messageCallback: action('message')
    }
    return (
      <WithContext context={context}>
        <Vote post={Factory.build('post')} voteCallback={action('vote')} />
      </WithContext>
    )
  })

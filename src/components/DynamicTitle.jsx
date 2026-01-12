import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'

const DynamicTitle = () => {
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Helmet>
      <title>{`${couple.nickname}'s Wedding - ${weddingDate}`}</title>
      <meta name="description" content={`${couple.nickname}'s Wedding - Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta property="og:title" content={`${couple.nickname}'s Wedding`} />
      <meta property="og:description" content={`Join us for ${couple.nickname}'s special day on ${weddingDate}`} />
      <meta name="twitter:title" content={`${couple.nickname}'s Wedding`} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
    </Helmet>
  )
}

export default DynamicTitle 
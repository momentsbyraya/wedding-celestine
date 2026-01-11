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
      <title>{`Ric & Yob's Wedding - ${weddingDate}`}</title>
      <meta name="description" content={`Ric & Yob's Wedding - Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta property="og:title" content={`Ric & Yob's Wedding`} />
      <meta property="og:description" content={`Join us for Ric & Yob's special day on ${weddingDate}`} />
      <meta name="twitter:title" content={`Ric & Yob's Wedding`} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
    </Helmet>
  )
}

export default DynamicTitle 
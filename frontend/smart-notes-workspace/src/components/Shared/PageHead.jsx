import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function PageHead({Pagetitle, description="Smart Notes App"}) {
  return (
    <Helmet>
        <title>{Pagetitle ? `${Pagetitle} | Smart Notes` : "Smart Notes"}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

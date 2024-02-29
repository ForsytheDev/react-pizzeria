import React from 'react'
import ContentLoader from 'react-content-loader'

export const PizzaSkeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={320}
      height={320}
      title=""
      viewBox="0 0 320 320"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="160" cy="160" r="160" />
    </ContentLoader>
  )
}

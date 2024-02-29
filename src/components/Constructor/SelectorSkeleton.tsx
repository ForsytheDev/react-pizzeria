import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from './Constructor.module.scss'

export const SelectorSkeleton: React.FC = () => {
  return (
    <ContentLoader
      className={styles.skeleton}
      speed={2}
      width={370}
      height={374}
      title=""
      viewBox="0 0 370 374"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" rx="8" ry="8" width="250" height="30" />
      <rect x="0" y="38" rx="8" ry="8" width="180" height="20" />
      <rect x="0" y="80" rx="8" ry="8" width="360" height="50" />
      <rect x="0" y="180" rx="8" ry="8" width="360" height="100" />
      <rect x="0" y="326" rx="30" ry="30" width="360" height="48" />
    </ContentLoader>
  )
}

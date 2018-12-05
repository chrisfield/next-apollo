import React from 'react'
import dynamic from 'next/dynamic'

const Card =  dynamic(import('../card'))
const PageOne =  dynamic(import('../page-one'))

export default (props) => {

  const { widgetPath, ...otherProps } = props

  switch (widgetPath) {
    case '/page-one': {
      return <PageOne {...otherProps} />
    }
    default: {
      return  <p> ggg {widgetPath}</p>
    }
  }

}

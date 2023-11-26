import withBaseComponent from 'hocs/withBaseComponent'
import React from 'react'

const Wishlist = (props) => {
  console.log(props)
  return (
    <div onClick={() => props.navigate('/')}>Wishlist</div>
  )
}

export default withBaseComponent(Wishlist)
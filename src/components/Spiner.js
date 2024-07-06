import React, { Component } from 'react'
import loading from './loading.gif'

export class Spiner extends Component {
  render() {
    return (
      <div className='text-center' style={{marginTop: '14rem' , }}>
        <img src={loading} alt="" />
      </div>
    )
  }
}

export default Spiner

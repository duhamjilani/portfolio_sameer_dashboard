import React from 'react'

import { MDBFooter } from 'mdb-react-ui-kit';
const Footer = () => {
  return (
    <div>
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
         Nexa Web & App Freelancers All rights reserved
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer

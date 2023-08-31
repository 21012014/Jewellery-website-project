import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '32px'}} className='bg-dark text-light'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h4 style={{ textAlign: 'center' }}>Contact Us</h4>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }} className="fa fa-facebook"></a>
            <a href="#" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }} className="fa fa-instagram"></a>
            <a href="#" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }} className="fa fa-twitter"></a>
            <a href="#" style={{ textDecoration: 'none', color: 'white', marginRight: '15px' }} className="fa fa-pinterest"></a>
          </div>
        </div>
      </div>
      <hr style={{ borderTop: '1px solid #ccc' }} />
      <p style={{ textAlign: 'center' }}>&copy; 2023 Radiance. All rights reserved.</p>
      <p style={{ textAlign: 'center'}}>&copy; Radiance Onwer: 0x88b056952F73ED69EB4F8048Bd137943C22f94d6</p>
    </footer>
  );
}

export default Footer;
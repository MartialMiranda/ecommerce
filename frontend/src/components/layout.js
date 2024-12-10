import Footer from './Footer'
import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col items-center'>
      <Navbar />
      <div className='container mt-16'>{children}</div>
      <Footer/>
    </div>
  )
}

export default Layout

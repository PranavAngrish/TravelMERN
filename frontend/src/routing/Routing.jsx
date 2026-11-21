import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Blog from '../pages/Blog'
import BlogPostPage from '../pages/BlogPostPage'
import Kasol from '../pages/landing-kasol'
import ThankYou from '../pages/ThankYou'
import Legal from '../pages/Legal'
import EmailVerify from '../components/EmailVerify'
import Host from '../components/HostSection'
import RoomInfo from '../components/RoomInfo'
import RoomEnquiry from '../components/RoomEnquiry'
import { rooms } from '../data/rooms'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/user/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/host" element={<Host />} />
      <Route path="/midorchard-kasol" element={<Kasol />} />
      <Route path="/midorchard-policy" element={<Legal />} />

      {/* One info page and one enquiry page per room, generated from data/rooms.js */}
      {rooms.map((room) => [
        <Route key={`${room.slug}-info`} path={room.infoPath} element={<RoomInfo room={room} />} />,
        <Route key={`${room.slug}-enq`} path={room.enquiryPath} element={<RoomEnquiry room={room} />} />,
      ])}
    </Routes>
  )
}

export default Routing

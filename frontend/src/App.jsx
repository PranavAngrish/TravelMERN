import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Gallery from './pages/Gallery'
import Enquiry from './pages/Enquiry'
import ThankYou from './pages/ThankYou'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'

// Old URLs (/midorchard-kasol, /kasol-river-view-hotel, ...) are 301-redirected by the server.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<RoomDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

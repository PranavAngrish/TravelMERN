import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import PrivateRouting from '../components/PrivateRouting'
import Blog from '../pages/Blog';
import BlogPostPage from '../pages/BlogPostPage';
import Kasol from '../pages/landing-kasol.jsx'
import SD from '../pages/info-sd.jsx'
import Lux from '../pages/info-lux.jsx'
import Fam from '../pages/info-fam.jsx'
import Sdenq from '../pages/sd-enq.jsx'
import Luxenq from '../pages/lux-enq.jsx'
import Famenq from '../pages/fam-enq.jsx'
import ThankYou from '../pages/ThankYou.jsx'

import Legal from '../pagesMohin/legal.jsx'


import EmailVerify from '../components/EmailVerify/index'





import Host from '../components/host'



function Routing() {
  return (
    <Routes>
      

      {/* <Route element={<PrivateRouting/>}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route> */}

      <Route path="/" element={<Home />} />
      <Route path="/thankyou" element={<ThankYou />} />














      <Route path="/signin" element={<SignIn />} /> 
      <Route path="/signup" element={<SignUp />} />  
      <Route path="/about" element={<AboutUs />} />    
      <Route path="/user/:id/verify/:token" element={<EmailVerify/>}></Route>
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
 
             

      <Route path="/about" element={<AboutUs />} />  
      <Route path="/host" element={<Host />} /> 
  
      <Route path="/midorchard-kasol" element={<Kasol />} />      
      <Route path="/kasol-mountain-view-hotel" element={<SD />} />  
      <Route path="/kasol-river-view-hotel" element={<Lux />} /> 
      <Route path="/kasol-family-hotel" element={<Fam />} /> 
         

      <Route path="/deluxe-room-booking" element={<Sdenq />} /> 
      <Route path="/river-view-booking" element={<Luxenq />} />
      <Route path="/family-hotel-booking" element={<Famenq />} /> 
   
      <Route path="/midorchard-policy" element={<Legal />} />  
   
     

    </Routes>
  )
}

export default Routing

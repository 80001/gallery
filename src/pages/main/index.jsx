import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'
import GalleryImage from '../gallery/ImageShow'

const MainPage = () => {

    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Gallery />} />
                <Route path='/s/:search/:page' element={<Gallery />} />
                <Route path='/s/:search/:page/:id' element={<GalleryImage />} />
                <Route path='/s/:search/:page/create_post/:id' element={<GalleryImage showModal={true} />} />
                <Route path='blog/*' element={<Blog />} />
                <Route path='account' element={<Account />}>
                </Route>
            </Routes>
        </div>
    )
}

export default MainPage
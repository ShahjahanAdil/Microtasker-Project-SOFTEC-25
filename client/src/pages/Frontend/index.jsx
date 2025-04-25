import React from 'react'
import './frontend.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Policies from './Policies'
import Footer from '../../components/Footer'
import Payouts from './Payouts'
import Contact from './Contact'

export default function Frontend() {
    return (
        <div className='overflow-x-hidden'>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='policies' element={<Policies />} />
                <Route path='payouts' element={<Payouts />} />
                <Route path='contact' element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    )
}
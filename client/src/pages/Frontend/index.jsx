import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Policies from './Policies'
import Footer from '../../components/Footer'

export default function Frontend() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='policies' element={<Policies />} />
            </Routes>
            <Footer />
        </>
    )
}
import React from 'react'
import Layout from '@/components/Layout.jsx'
import Home from '@/components/Home'

export default function IndexPage() {
    return (
        <Layout currentPageName={'Home'}>
            <Home />
        </Layout>
    )
}
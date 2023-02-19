import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
export default function Home() {
    return (
        <div>
            <Navbar />
            <Tabs />
        </div>
    )
}
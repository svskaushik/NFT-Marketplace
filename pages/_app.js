import Router from "next/router"
import nProgress from "nprogress"
import "../styles/globals.css"
import "../styles/NProgress.css"
import Link from 'next/link'
import WalletConnectButton from "./Components/ConnectButton.js"

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);





function MyApp({ Component, pageProps }) {

  return (
    <div className="min-h-screen bg-bg bg-cover">
      <nav className="border-b-2 p-6">
        <p className="text-4xl font-bold text-white text-center">Metaverse Marketplace</p>
        <div className="flex mt-4 justify-between">
          <div className="flex">
            <Link href="/">
              <a className="rounded-full px-4 transition duration-500 font-semibold hover:bg-white transform hover:-translate-y-1 mr-6 text-pink-500">
                Home
              </a>
            </Link>
            <Link href="/create-item">
              <a className="rounded-full px-4 transition duration-500 font-semibold hover:bg-white transform hover:-translate-y-1 mr-6 text-pink-500">
                Sell Digital Asset
              </a>
            </Link>
            <Link href="/my-assets">
              <a className="rounded-full px-4 transition duration-500 font-semibold hover:bg-white transform hover:-translate-y-1 mr-6 text-pink-500">
                My Digital Assets
              </a>
            </Link>
            <Link href="/creator-dashboard">
              <a className="rounded-full px-4 transition duration-500 font-semibold hover:bg-white transform hover:-translate-y-1 mr-6 text-pink-500">
                Creator Dashboard
              </a>
            </Link>
          </div>
          <div className="flex">
            <WalletConnectButton/>
            {/*<button className="button rounded-full px-4 bg-white hover:bg-blue-500 transition duration-500 " type="button">
              Connect
            </button>*/}
          </div>
        </div>  
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
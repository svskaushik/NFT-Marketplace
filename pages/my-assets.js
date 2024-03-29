import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Spinner from "./Components/Spinner.js"
import Image from "next/image"

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    if (window.ethereum) {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
      })
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()

      const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const data = await marketContract.fetchMyNFTs().catch(e => window.alert('Account not detected. Please ensure your wallet is connected to Polygon Mumbai', e))

      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        }
        return item
      }))
      setNfts(items)
      setLoadingState('loaded')
    } 
    else {
      window.alert('Account not detected. Please ensure your wallet is connected to Polygon Mumbai')
    }
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl text-white">No assets owned</h1>)
  if (loadingState != 'loaded') return ( < Spinner/>  )

  return (
    <div className="flex justify-center animate-loadtransition">
      <div className="p-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 animate-loadtransition">
                <Image placeholder="empty" alt="NFT Image" height="500" width="400" src={nft.image} className="rounded-t" onClick={() => window.open(nft.image)} role="button"/>
                <div className="p-4 bg-black bg-opacity-50">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Matic</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
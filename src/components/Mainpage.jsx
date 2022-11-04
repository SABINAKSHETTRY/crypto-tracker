import React, { useEffect, useState} from 'react'
import axios from "axios"
import "../App.css"
export default function Mainpage() {
    const[Store,setStore] = useState([])
    const[Search,setSearch] =useState([])
async function data (){

    try {
    let response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        setStore( response.data)
        setSearch(response.data)
    } catch (error) {
        alert(error)
    }

}
useEffect(
    ()=>{
        data();
    },[]
)
const search = (e)=>{
  let value = e.target.previousElementSibling.value
  let result = Store.filter(coins=>coins.id.includes(value))
  setSearch(result)
  
}


  return (
    <div>
        <div className="searchholder">
         <input  className ="input" type="text" placeholder="Type here" />
         <button className='searches' onClick={search}>Search</button>
         </div>
         <div className="table">
            <div className='symbol'>Symbol</div>
            <div className='id'>Id</div>
            <div className='symb'>Shortname</div>
            <div className='name'>Name</div>
            <div className='current_price'>Price</div>
            <div className='market_price'>Market_price</div>
            <div className='price_change_24hr'>Price_change_24hr</div>
         </div>
         <div className="coinholder">
         {Search.map(coin=>{
            return(
                <div className='pageholder'>
                     <div className="imag">
                        <img src={coin.image} alt="" />
                    </div>
                    <div className="id"> {coin.id}</div>
                    <div className="symbol">{coin.symbol}</div>
                    <div className="name">{coin.name}</div>
                   
                    <div className="current_price">${coin.current_price}</div>
                    <div className="market_cap"> ${coin.market_cap}</div>
                    <div className={coin.price_change_percentage_24h <0 ?"negative":"positive"}>
                        {coin.price_change_percentage_24h}%
                    </div>
                </div>
            )
         })}
         
         
         </div>
       
    </div>
  )
}

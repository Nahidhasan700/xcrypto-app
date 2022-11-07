import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {server} from '../index';
import { Button, Container, HStack, Radio, RadioGroup, } from '@chakra-ui/react';
import Loader from './Loader';
import CoinCard from './CoinCard';
import ErrorComponants from './ErrorComponants';

const Coins = () => {
  
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(false);
  const [currency, setCurrency] = useState("bdt");

  const currancySymbol = currency==="bdt" ? "৳" : currency === "eur" ? "€" : "$";

  const changPage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);


useEffect(()=>{
  const fetchCoins = async()=>{
  try {
    
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
  
      setCoins(data);
      setLoading(false);
      
    
  } catch (error) {
    setError(true);
    setLoading(false);
  }
    
  };
  fetchCoins();

},[currency,page]);
if(error) return <ErrorComponants message={"fatching coins problem"} />;


  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={"4"}>
            <Radio value={"bdt"}>BDT</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>

        </RadioGroup>


        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {coins.map((i) => (
            // <div>{i.name}</div>
            <CoinCard id={i.id} key={i.id} name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} currancySymbol={currancySymbol} />
          ))}
        </HStack>
        <HStack w={"full"} overflowX={"auto"} p={"8"}>
          {
            btns.map((item,index)=>(
              <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changPage(index+1)}>{index+1}</Button>
            ))
          }
        </HStack>
        </>
      )
    }

    </Container>
  )
};




export default Coins;

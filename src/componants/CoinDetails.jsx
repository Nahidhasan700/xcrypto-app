import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '..';
import ErrorComponants from './ErrorComponants';
import Loader from './Loader';
import Chart from './Chart';


const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("bdt");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState({});

  const currancySymbol = currency==="bdt" ? "৳" : currency === "eur" ? "€" : "$";



  const params = useParams();

  const btns = ["24h","7d","14d","30d","60d","200d","365d","max"];
  const switchChartStats = (key)=>{
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        
        break;
        case "7d":
        setDays("7d");
        setLoading(true);
        
        break;
        case "14d":
        setDays("14d");
        setLoading(true);
        
        break;
        case "30":
        setDays("30d");
        setLoading(true);
        
        break;
        case "60d":
        setDays("60d");
        setLoading(true);
        
        break;
        case "200d":
        setDays("200d");
        setLoading(true);
        
        break;
        case "365d":
        setDays("365d");
        setLoading(true);
        
        break;
        case "max":
        setDays("max");
        setLoading(true);
        
        break;

    
      default:
        setDays("24h");
        setLoading(true);
        break;
    }

  }

  useEffect(()=>{
    const fetchCoin = async()=>{
    try {
      
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
    
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
        
      
    } catch (error) {
      setError(true);
      setLoading(false);
    }
      
    };
    fetchCoin();
  
  },[params.id,currency,days]);
  if(error) return <ErrorComponants message={"fatching coinDetails problems"} />;






  return <Container maxW={"container.xl"}>
    {
      loading ? <Loader /> : (
        <>


        <Box width={"full"} borderWidth={1}>
          <Chart arr={chartArray} currency={currancySymbol} days={days}/>
        </Box>


        <HStack P='4' overflowX={"auto"}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
            ))
          }

        </HStack>

        





        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={"4"}>
            <Radio value={"bdt"}>BDT</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>

        </RadioGroup>

        <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
          <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
            Last update on {Date(coin.market_data.last_updated).split("G")[0]}
          </Text>



          <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />

          <Stat>
            <StatLabel>
              {coin.name}
            </StatLabel>
            <StatNumber>{currancySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h >0? "increase" : "decrease"} />
              {coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>
          <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
            {`#${coin.market_cap_rank}`}
          </Badge>
          <CoustomBar high={`${currancySymbol}${coin.market_data.high_24h[currency]}`} 
          low={`${currancySymbol}${coin.market_data.low_24h[currency]}`} />

          <Box w={"full"} p="4">
            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
            <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
            <Item title={"Market cap"} value={`${currancySymbol}${coin.market_data.market_cap[currency]}`} />
            <Item title={"All time low"} value={`${currancySymbol}${coin.market_data.atl[currency]}`} />
            <Item title={"All time high"} value={`${currancySymbol}${coin.market_data.ath[currency]}`} />
            

          </Box>

        </VStack>

        </>
      )
    }

  </Container>
};



const Item=({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
) 


const CoustomBar = ({high,low}) =>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-evenly"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H range</Text>
      <Badge children={high} colorScheme={"green"} />

    </HStack>
  </VStack>
)

export default CoinDetails;

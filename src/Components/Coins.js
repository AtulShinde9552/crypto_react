import {useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '..'
import { Button, Container, HStack,} from '@chakra-ui/react'
import ExchangeError from './ExchangeError'
import CoinsCard from '../CoinsCard'
import Loader from './Loader'

const Coins = () => {
  const [Coins, setCoins]= useState([])
  const [loading, setloading]= useState(true)
  const [Error, setError]= useState(false)
  const [page, setpage] = useState(1)
  const [currency, setcurrency]= useState('inr')


  const currencySymbol = currency==='inr'? ' ₹' : currency==='eur'? '€': ' $'

 


  const  changepage =(page) =>{
    setpage(page)
    setloading(true)
  }

  const btns = new Array(132). fill(1)

  useEffect(() => {
    const fechCoin = async ()=>{
  try {
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
      setCoins(data);
      setloading(false);
      console.log(data);
  } catch (error) {
    setError(true)
    setloading(false)
  }
   }
   fechCoin()
  }, [currency, page])

  if (Error) return <ExchangeError massage={'Error while faching Coins'} />
    
  
  return (
   <Container maxW={'container.lg'}>
    {loading? <Loader/> : <>
    <HStack wrap={'wrap'}>
      {Coins.map((i)=>(
        <CoinsCard id={i.id} name={i.name} price={i.current_price} image={i.image} symbol={i.symbol} url={i.url} currencySymbol={currencySymbol} key={i.id}/>
        ))}
    </HStack>
    </>}
    <HStack overflowY={'auto'}>
      {btns.map((i, index)=>(
        <Button bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changepage(index + 1)}>
        {index + 1}
      </Button>
      ))}
    </HStack>
   </Container>
  )
}


export default Coins
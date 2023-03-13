import {useEffect, useState} from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack,} from '@chakra-ui/react'
import ExchangeCard from './ExchangeCard'
import ExchangeError from './ExchangeError'
import Loader from './Loader'

const Exchanges = () => {
  const [Exchanges, setExchanges]= useState([])
  const [loading, setloading]= useState(true)
  const [Error, setError]= useState(false)


  useEffect(() => {
    const fechExchanges = async ()=>{
  try {
      const {data} = await axios.get(`${server}/exchanges`)
      setExchanges(data);
      setloading(false);
  } catch (error) {
    setError(true)
    setloading(false)
  }
   }
   fechExchanges()
  }, [])

  if (Error) return <ExchangeError massage={'Error while faching Exchange'} />
    



  
  return (
   <Container maxW={'container.lg'}>
    {loading? <Loader/> : <>
    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
      {Exchanges.map((i)=>(
        <ExchangeCard name={i.name} image={i.image} url={i.url} rank={i.trust_score_rank} key={i.id}/>
        ))}
    </HStack>
    </>}
   </Container>
  )
}


export default Exchanges
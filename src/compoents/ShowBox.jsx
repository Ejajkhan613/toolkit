import { Box, Text } from '@chakra-ui/react';
import React from 'react'

const ShowBox = ({eur, usd, cny}) => {
  return (
    <Box display={"grid"} color={"yellow"} fontWeight={"400"} position={"absolute"} top={4} right={4} backgroundColor={"green"} padding={"20px 40px"} >
        <Text> USD: {usd} </Text> 
        <Text> EUR: {eur} </Text>  
        <Text> CNY: {cny} </Text>
    </Box>
  )
}

export default ShowBox; 


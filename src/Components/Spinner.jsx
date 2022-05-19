import { Flex, Progress, useColorModeValue, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BallTriangle, Circles } from 'react-loader-spinner'

const Spinner = ({ msg, progress }) => {
    const textColor = useColorModeValue("gray.900", "gray.50")
    useEffect(() => {}, [progress])

    return (
        <Flex direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width='full'
            height='full'
            px={10}>
            <Circles color="#00BFFF" height={80} width={80} />
            <Text mt={"5px"} fontSize={25} textAlign={'center'} p={2}> {msg} </Text>
            {progress &&
                <Progress mt={"12px"}
                    isAnimated
                    size={'sm'}
                    value={Number.parseInt(progress)}
                    width={'lg'}
                    rounded={'sm'}
                    colorScheme={"linkedin"} />}
        </Flex>
    )
}

export default Spinner
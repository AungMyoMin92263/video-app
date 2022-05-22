import { Box, Flex, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { getfetchVideoDetail } from '../utils/fetchData';
import Spinner from '../Components/Spinner'
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase-config';



const VideoPinDetail = () => {

  const textColor = useColorModeValue('gray.500', 'gray.900')

  const firestoreDb = getFirestore(firebaseApp)
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState(null)

  const { videoId } = useParams()

  useEffect(() => {
    if (videoId) {
      setLoading(true)
      getfetchVideoDetail(firestoreDb, videoId)
        .then((data) => {
          console.log(data)
          setVideo(data)
          setLoading(false)
        })
    }
  }, [videoId])


  if (loading) return <Spinner />
  return (
    <Flex width={'full'}
      height={'auto'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      py='2'
      px='4'

    >
      <Flex alignItems={'center'}
        width={'full'}
        my={4}
      >
        <Link to={'/'}>
          <IoHome fontSize={25} />
        </Link>
        <Box width='1px'
          height='20px'
          bg={'gray.500'}
          mx={2}
        >
        </Box>
        <Text isTruncated
          color={textColor}>{video?.title}</Text>
      </Flex>
      {/* Main Grid for video */}
      <Grid templateColumns={'repeat(3, 1fr)'}
        gap={2}
        width={'100%'}>
        <GridItem width={'100%'}
          bg={'blue'}
          p={2}
          colSpan={2}>
          <Flex width={'full'}
            bg='black'
            position={'relative'}></Flex>
        </GridItem>
        <GridItem width={'100%'}
          bg={'blue'}
          p={2}
          colSpan></GridItem>

      </Grid>
    </Flex>
  )
}

export default VideoPinDetail
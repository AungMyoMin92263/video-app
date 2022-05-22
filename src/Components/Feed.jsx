import React, { useEffect, useState } from 'react'

import firebaseApp from '../firebase-config'
import { getFirestore, } from 'firebase/firestore'
import { getAllFeeds } from '../utils/fetchData'
import Spinner from '../Components/Spinner'
import { Box, SimpleGrid } from '@chakra-ui/react'
import VideoPin from './VideoPin'
const Feed = () => {


    // firestore database instance
    const firestoreDb = getFirestore(firebaseApp)


    const [feeds, setFeeds] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAllFeeds(firestoreDb).then(data =>
           { setFeeds(data)
            setLoading(false)})
        


    }, [])

    if (loading) return <Spinner />
    return (
        <SimpleGrid minChildWidth='300px'
            spacing='15px'
            width={'full'}
            autoColumns={'max-content'}
            overflowX={'hidden'}
            px='2'
            >
            {feeds && feeds.map((feed) => 
            (
                <VideoPin key={feed.id} maxwidth={420} height='80px' data={feed} />
            ))}
        </SimpleGrid>
    )
}

export default Feed
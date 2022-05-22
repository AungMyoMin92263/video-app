import { Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import firebaseApp from '../firebase-config';
import { getUserInfo } from '../utils/fetchData';
import moment from "moment"
const VideoPin = ({ data }) => {

    // firestore database instance
    const firestoreDb = getFirestore(firebaseApp)


    const { colorMode } = useColorMode();
    const bg = useColorModeValue("blackAlpha.700", "gray.900");
    const textColor = useColorModeValue('gray.100', 'gray.100')

    const [userInfo, setUserInfo] = useState(null)
    const [userId, setUserId] = useState(null)

    const avator = "https://tse2.mm.bing.net/th?id=OIP.udIfmXkDTzwuDF4YKPHBPgHaHk&pid=Api&P=0&w=159&h=162"

    useEffect(() => {
        if (data) setUserId(data.userId)
        if (userId) getUserInfo(firestoreDb, userId).then((data) => {
            setUserInfo(data)
        })
    }, [userId])


    return (
        <Flex justifyContent={'space-between'}
            alignItems={'center'}
            cursor={'pointer'}
            direction={'column'}
            shadow={'lg'}
            _hover={{ shadwo: 'x1' }}
            rounded='md'
            overflow='hidden'
            position={'relative'}
            maxWidth={'300px'}
            bg='gray.200'
            p={4}
        >
            <Link to={`/videoDetail/${data.id}`}>
                <video src={data.videoUrl}
                    muted
                    onMouseOver={(e) => { e.target.play() }}
                    onMouseOut={(e) => { e.target.pause() }} />
            </Link>

            <Flex position={'absolute'}
                bottom='0'
                left='0'
                p={2}
                width='full'
                direction={'column'}
                bg={bg}
            >
                <Flex width={'full'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Text color={textColor}
                        fontSize={20}
                        isTruncated>
                        {data.title}
                    </Text>
                        <Link to={`/userProfile/${data.userId}`}>
                            <Image
                                src={userInfo?.photoURL ? userInfo?.photoURL : avator}
                                width={'50px'}
                                height={'50px'}
                                rounded={"full"}
                                border={'2px'}
                                borderColor={bg}
                                mt={-10}
                            />

                        </Link>
                </Flex>
                <Text fontSize={12}
                    color={textColor}
                    ml='auto'
                    mt={-2}
                >
                    {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
                </Text>

            </Flex>
        </Flex>
    )
}

export default VideoPin
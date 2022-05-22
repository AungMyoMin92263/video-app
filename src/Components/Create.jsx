import { Box, Button, Flex, FormLabel, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Checkmark, ChevronDownOutline, CloudUpload, LocationOutline, Trash, WarningOutline } from 'react-ionicons';
import { categories } from '../data';
import Spinner from './Spinner';

import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import firebaseApp from "../firebase-config"
import AlertMsg from './Alert';
import { fetchUser, userAccessToken } from '../utils/fetchUser';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {

    // user fetch
    const [userInfo] = fetchUser()

    // color 
    const { colorMode } = useColorMode();
    const bg = useColorModeValue("gray.50", "gray.900");
    const textColor = useColorModeValue("gray.900", "gray.50")


    // navigate
    const navigate = useNavigate()

    // state
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Choose a category')
    const [location, setLocation] = useState('')
    const [videoAsset, setVideoAsset] = useState(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(1)
    const [alert, setAlert] = useState(false)
    const [alertStatus, setAlertStatus] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertIcon, setAlertIcon] = useState(null)
    const [description, setDescription] = useState('')


    // create firebase storage
    const storage = getStorage(firebaseApp)
    const firebaseDb = getFirestore(firebaseApp)

    const uploadImage = (e) => {
        console.log(e.target)
        setLoading(true)
        const videoFile = e.target.files[0]

        const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(uploadProgress)
        }, (error) => {
            console.log(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setVideoAsset(downloadURL)
                setLoading(false)
                setAlert(true)
                setAlertStatus('success')
                setAlertIcon(<Checkmark fontSize={25} />)
                setAlertMsg('Your video has been successfully uploaded')
                setTimeout(() => {
                    setAlert(false);
                }, 4000)
            });
        })

    }
    const deleteImage = () => {
        const deleteRef = ref(storage, videoAsset)
        deleteObject(deleteRef).then(() => {
            setVideoAsset(null)
            setAlert(true)
            setAlertStatus('error')
            setAlertIcon(<WarningOutline fontSize={25} />)
            setAlertMsg('Your video has been successfully deleted')
            setTimeout(() => {
                setAlert(false);
            }, 4000)
        })
            .catch((error) =>
                console.log(error))
    }

    const uploadDetail = async () => {
        try {
            setLoading(true)
            if (!title && !category && !videoAsset) {
                setAlert(true)
                setAlertStatus('error')
                setAlertIcon(<WarningOutline fontSize={25} />)
                setAlertMsg('Required fields are missing')
                setTimeout(() => {
                    setAlert(false);
                }, 4000)
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    userId: userInfo?.uid,
                    category: category,
                    location: location,
                    videoUrl: videoAsset,
                    description: description,
                };
                console.log("data", data)

                await setDoc(doc(firebaseDb, 'videos', `${Date.now()}`), data)
                setLoading(false)
                navigate('/', {replace: true})
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { }, [title, location, description, category])


    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            width={'full'}
            minHeight='100vh'
            padding={10}
            bg={bg}
        >
            <Flex
                width={'80%'}
                height='full'
                border={'1px'}
                borderColor={'gray.300'}
                borderRadius={'md'}
                p='4'
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
            >
                {alert && (
                    <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
                )}
                <Input
                    variant={'flushed'}
                    placeholder="Title"
                    focusBorderColor='gray.400'
                    isRequired
                    errorBorderColor='red'
                    type={'text'}
                    _placeholder={{ color: 'gray.500' }}
                    fontSize={'20'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></Input>
                <Flex
                    justifyContent={'space-between'}
                    width='full'
                    alignItems={'center'}
                    gap={8}
                    my={4}
                >
                    <Menu >
                        <MenuButton width={'full'} color={'blue'} as={Button} rightIcon={<ChevronDownOutline Shake />}>
                            {category}
                        </MenuButton>
                        <MenuList zIndex={101} width={'md'} shadow={'xl'}>
                            {categories && categories.map(data =>
                                <MenuItem
                                    key={data.id}
                                    _hover={{ bg: 'blackApha.300' }}
                                    fontSize={'20'}
                                    px={4}
                                    onClick={() => setCategory(data.name)}
                                >{data.iconSrc}<Text fontFamily={18} ml={4}>{data.name}</Text></MenuItem>
                            )}

                        </MenuList>
                    </Menu>
                    <InputGroup>
                        <InputLeftElement pointerEvents={'none'} children={<LocationOutline fontSize={20} color={`${colorMode === 'dark' ? '#f1f1f1' : '#111'}`} />} />
                        <Input
                            variant={'flushed'}
                            placeholder="Location"
                            focusBorderColor='gray.400'
                            isRequired
                            errorBorderColor='red'
                            type={'text'}
                            _placeholder={{ color: 'gray.500' }}
                            fontSize={'20'}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        ></Input>
                    </InputGroup>
                </Flex>


                {/* File upload */}
                <Flex
                    border={'1px'}
                    borderColor="gray.500"
                    height={'400px'}
                    borderStyle={'dashed'}
                    width='full'
                    borderRadius={'md'}
                    overflow='hidden'
                    position={'relative'}
                >
                    {!videoAsset ? <FormLabel width={'full'}>
                        <Flex direction={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            width='full'
                            height='full'>
                            <Flex direction={'column'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                width='full'
                                height='full'
                                cursor='pointer'>
                                {loading ? <Spinner msg={'Uploading Your Video'} progress={progress} /> :
                                    <>
                                        <CloudUpload fontSize={30}
                                            color={`${colorMode === 'dark' ? "#f1f1f1" : '#111'}`} />
                                        <Text mt={3} fontSize={20} color={textColor}> click to upload </Text>
                                    </>}
                            </Flex>
                        </Flex>
                        {!loading &&
                            <input
                                type={"file"}
                                name='upload-image'
                                onChange={(e) => { uploadImage(e) }}
                                style={{ width: 0, height: 0 }}
                                accept="video/mp4,video/x-m4v, video/*"
                            />}

                    </FormLabel> :
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={'full'}
                            height={'full'}
                            position={'relative'}
                            bg={bg}
                        >
                            <Flex
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'40px'}
                                height={'40px'}
                                position={'absolute'}
                                rounded='full'
                                bg='red'
                                top={5}
                                right={5}
                                cursor={'pointer'}
                                zIndex={10}
                                onClick={deleteImage}
                            >
                                <Trash fontSize={20} color="white" />
                            </Flex>
                            <video
                                src={videoAsset}
                                controls
                                style={{ width: "100%", height: "100%" }}
                            />

                        </Flex>}
                </Flex>
                <Textarea
                    focusBorderColor='gray.400'
                    isRequired
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Write about video'
                    size='sm'
                    borderStyle={'dashed'}
                    border={'1px'}
                    borderColor="gray.500"
                    borderRadius={'md'}
                />
                <Button isLoading={loading}
                    loadingText='Saving'
                    colorScheme={'linkedin'}
                    variant={`${loading ? 'outline' : 'solid'}`}
                    width={'50%'}
                    _hover={{ shadow: 'lg' }}
                    fontSize={20}
                    onClick={() => uploadDetail()}
                >
                    Save
                </Button>
            </Flex>
        </Flex >
    )
}

export default Create
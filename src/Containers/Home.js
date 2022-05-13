import React from 'react'
import { Category, Create, Feed, Navbar, Search, VideoPin } from '../Components'
import { Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

const Home = ({ user }) => {
	return (
		<>
			<Navbar />
			<Flex
				direction={'column'}
				justifyContent={'start'}
				alignItems={'center'}
				width="20"
			>
				<Category />
			</Flex>
			<Flex
				width={'full'}
				justifyContent="center"
				alignItems={'center'}
				px="4"
				>
				<Routes>
					<Route path="/" element={<Feed/>}/>
					<Route path="/category/:categoryId" element={<Feed />} />
					<Route path="/create" element={<Create/>} />
					<Route path="/videoDetail/:videoId" element={<VideoPin />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Flex>
		</>
	)
}

export default Home
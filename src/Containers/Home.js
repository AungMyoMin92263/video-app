import React, { useEffect, useState } from 'react'
import { Category, Create, Feed, Navbar, Search, UserDetail, VideoPin, VideoPinDetail } from '../Components'
import { Flex} from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { categories } from "../data"


const Home = ({ user }) => {



	return (
		<>
			<Navbar user={user} />
			<Flex width={'100vw'}>


				<Flex
					direction={'column'}
					justifyContent={'start'}
					alignItems={'center'}
					width="20"
				>
					{categories && categories.map(data => <Category key={data.id} data={data} />)}
				</Flex>
				<Flex
					width={'97%'}
					justifyContent="center"
					alignItems={'start'}
					px="20"
					mt="10"
				>
					<Routes>
						<Route path="/" element={<Feed />} />
						<Route path="/category/:categoryId" element={<Feed />} />
						<Route path="/create" element={<Create />} />
						<Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
						<Route path="/search" element={<Search />} />
						<Route path="/userProfile/:userId" element={<UserDetail />} />
					</Routes>
				</Flex>
			</Flex>
		</>
	)
}

export default Home
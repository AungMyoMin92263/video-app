import { Button, Flex, HStack, VStack, Image } from '@chakra-ui/react'
import {React, useState} from 'react'
import Musicbg from '../img/musicbg.jpg'
import { FcGoogle, } from 'react-icons/fc'
import { AiFillFacebook } from 'react-icons/ai'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import firebaseApp from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore } from "firebase/firestore";



const Login = () => {
	const [user, setUser] = useState()
	const firebaseAuth = getAuth(firebaseApp);
	const Googleprovider = new GoogleAuthProvider();
	const Facebookprovider = new FacebookAuthProvider();
	const firebaseDb = getFirestore(firebaseApp)
	const navigate = useNavigate()


	const set_doc = async (providerData) => {
		await setDoc(
			doc(firebaseDb, "users", providerData[0].uid),
			providerData[0]
		);
		navigate("/", { replace: true })
	}
	
	if (user){
		const { refreshToken, providerData } = user
		console.log(refreshToken, providerData)
		localStorage.setItem('user', JSON.stringify(providerData))
		localStorage.setItem('accessToken', JSON.stringify(refreshToken))

		set_doc(providerData)
	}
	
	

	const loginGoogle = async () => {
		const { user } = await signInWithPopup(firebaseAuth, Googleprovider)
		setUser(user)

		
	}

	const loginFacebook = async () => {
		const { user } = await signInWithPopup(firebaseAuth, Facebookprovider)
		setUser(user)
	}

	return (
		<Flex
			justifyContent={'center'}
			alignItems={'center'}
			width={'100vw'}
			height={'100vh'}
			position={'relative'}
		>
			<Image src={Musicbg} objectFit='cover' width={'full'} height={'full'} />
			<Flex
				position={'absolute'}
				width={'100vw'}
				height={'100vh'}
				bg={'blackAlpha.600'}
				top={0}
				left={0}
				justifyContent='center'
				alignItems={'center'}
			>
				<VStack>
					<Button
						leftIcon={<FcGoogle fontSize={25} />}
						colorScheme="whiteAlpha"
						shadow={"lg"}
						onClick={() => loginGoogle()}
					>
						Signin with Google
					</Button><Button
						leftIcon={<AiFillFacebook fontSize={25} />}
						colorScheme="whiteAlpha"
						shadow={"lg"}
						onClick={() => loginFacebook()}
					>
						Signin with Facebook
					</Button>
				</VStack>
			</Flex>
		</Flex>

	)
}

export default Login
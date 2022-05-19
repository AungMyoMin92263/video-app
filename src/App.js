import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, Router } from 'react-router-dom'
import Home from './Containers/Home';
import Login from './Containers/Login';
import { fetchUser, userAccessToken } from './utils/fetchUser';



const App = () => {

	const [user, setUser] = useState(null)
	const navigate = useNavigate();



	useEffect(() => {
		const accessToken = userAccessToken();
		if (!accessToken) {
			navigate("login", { replace: true })
		}else{
			const [userInfo] = fetchUser();
			setUser(userInfo)
		}

	}, [])



	return (

		<Routes>
			<Route path="login" element={<Login />}></Route>
			<Route path="/*" element={<Home user={user}/>}></Route>
		</Routes>

	)
}

export default App
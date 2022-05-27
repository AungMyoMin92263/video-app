import {
	Box,
	Flex,
	Grid,
	GridItem,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
	useColorModeValue,
	Image,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoHome, IoPause, IoPlay } from "react-icons/io5";
import { getfetchVideoDetail } from "../utils/fetchData";
import Spinner from "../Components/Spinner";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase-config";
import ReactPlayer from "react-player";
import {
	MdOutlineReplay10,
	MdForward10,
	MdVolumeUp,
	MdVolumeOff,
	MdOpenInFull,
} from "react-icons/md";
import logo from "../img/logo.png";
const VideoPinDetail = () => {
	const textColor = useColorModeValue("gray.500", "gray.900");

	const firestoreDb = getFirestore(firebaseApp);
	const [loading, setLoading] = useState(false);
	const [video, setVideo] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [muted, setMuted] = useState(false);
	const { videoId } = useParams();
	const [volume, setVolume] = useState(0.5);
	const [played, setPlayed] = useState(0);
	const [seeking, setSeeking] = useState(false);

	const format = (seconds) => {
		if (isNaN(seconds)) return "00:00";

		const date = new Date(seconds * 1000);
		const hh = date.getUTCHours();
		const mm = date.getUTCMinutes();
		const ss = date.getUTCSeconds();

		if(hh){
			return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
		}else{
			return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
		}
	};
	// custom ref
	const playerRef = useRef();

	useEffect(() => {
		if (videoId) {
			setLoading(true);
			getfetchVideoDetail(firestoreDb, videoId).then((data) => {
				console.log(data);
				setVideo(data);
				setLoading(false);
			});
		}
	}, [videoId]);

	useEffect(() => {
		return () => {};
	}, [muted, volume]);

	const onvolumechange = (e) => {
		setVolume(parseFloat(e / 100));
		e === 0 ? setMuted(true) : setMuted(false);
	};

	const handleFastRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
	};

	const handleFastForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
	};

	const handleProgress = (changeState) => {
		if (!seeking) {
			setPlayed(parseFloat(changeState.played / 100) * 100);
		}
	};

	const handleSeekChange = (e) => {
		setPlayed(parseFloat(e / 100));
	};

	const onSeekMouseDown = (e) => {
		setSeeking(true);
	};

	const onSeekMouseUp = (e) => {
		console.log("Eup", e);
		setSeeking(false);
		playerRef.current.seekTo(e / 100);
	};

	const currentTime = playerRef.current
		? playerRef.current.getCurrentTime()
		: "00:00";

	const duration = playerRef.current
		? playerRef.current.getDuration()
		: "00:00";

	if (loading) return <Spinner />;
	return (
		<Flex
			width={"full"}
			height={"auto"}
			justifyContent={"center"}
			alignItems={"center"}
			direction={"column"}
			py='2'
			px='4'
		>
			<Flex alignItems={"center"} width={"full"} my={4}>
				<Link to={"/"}>
					<IoHome fontSize={25} />
				</Link>
				<Box width='1px' height='20px' bg={"gray.500"} mx={2}></Box>
				<Text isTruncated color={textColor}>
					{video?.title}
				</Text>
			</Flex>
			{/* Main Grid for video */}
			<Grid templateColumns={"repeat(3, 1fr)"} gap={2} width={"100%"}>
				<GridItem width={"100%"} p={2} colSpan={2}>
					<Flex width={"full"} bg='black' position={"relative"}>
						<ReactPlayer
							ref={playerRef}
							url={video?.videoUrl}
							width={"100%"}
							height={"100%"}
							// controls={"true"}
							playing={isPlaying}
							muted={muted}
							volume={volume}
							onProgress={handleProgress}
						/>
						{/* Customize player */}
						<Flex
							position={"absolute"}
							top={0}
							bottom={0}
							right={0}
							left={0}
							direction={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							zIndex={10}
							cursor={"pointer"}
							// onClick={() => { setIsPlaying(!isPlaying) }}
						>
							{/* play Icon */}
							<Flex
								alignItems={"center"}
								justifyContent={"center"}
								zIndex={100}
								onClick={() => {
									setIsPlaying(!isPlaying);
								}}
								width={"full"}
								height={"full"}
							>
								{!isPlaying && (
									<IoPlay fontSize={60} color='#f2f2f2' cursor={"pointer"} />
								)}
							</Flex>
							{/* progress controls */}
							<Flex
								width={"100%"}
								direction={"column"}
								justifyContent={"flex-end"}
								alignItems={"center"}
								zIndex={110}
								// cursor={'pointer'}
							>
								<Flex
									width={"100%"}
									alignItems={"center"}
									direction={"column"}
									// flex={'end'}
									bgGradient='linear(to-t, blackAlpha.900, blackAlpha.500, blackAlpha.50)'
									px={4}
								>
									<Slider
										aria-label='slider-ex-4'
										min={0}
										value={played * 100}
										max={100}
										transition='ease-in-out'
										transitionDuration={"0.1"}
										onChange={handleSeekChange}
										onMouseDown={onSeekMouseDown}
										onChangeEnd={onSeekMouseUp}
									>
										<SliderTrack bg={"teal.50"}>
											<SliderFilledTrack bg={"teal.300"} />
										</SliderTrack>
										<SliderThumb boxSize={3} />
									</Slider>

									{/* other controls */}
									<Flex width={"full"} alignItems={"center"} my={2} gap={10}>
										<MdOutlineReplay10
											fontSize={30}
											color={"#f1f1f1"}
											cursor='pointer'
											onClick={handleFastRewind}
										/>
										<Box
											onClick={() => {
												setIsPlaying(!isPlaying);
											}}
										>
											{!isPlaying ? (
												<IoPlay
													fontSize={30}
													color='#f2f2f2'
													cursor={"pointer"}
												/>
											) : (
												<IoPause
													fontSize={30}
													color='#f2f2f2'
													cursor={"pointer"}
												/>
											)}
										</Box>
										<MdForward10
											fontSize={30}
											color={"#f1f1f1"}
											cursor='pointer'
											onClick={handleFastForward}
										/>

										{/* volue controls */}
										<Flex
											alignItems={"center"}
											onClick={() => {
												setMuted(!muted);
											}}
										>
											{!muted ? (
												<MdVolumeUp
													fontSize={30}
													color={"#f1f1f1"}
													cursor='pointer'
												/>
											) : (
												<MdVolumeOff
													fontSize={30}
													color={"#f1f1f1"}
													cursor='pointer'
												/>
											)}
										</Flex>
										<Slider
											aria-label='slider-ex-1'
											min={0}
											defaultValue={volume * 100}
											max={100}
											size={"sm"}
											width={"100px"}
											onChangeStart={onvolumechange}
											onChangeEnd={onvolumechange}
										>
											<SliderTrack bg={"teal.50"}>
												<SliderFilledTrack bg={"teal.300"} />
											</SliderTrack>
											<SliderThumb boxSize={3} />
										</Slider>
										{/* duration times */}
										<Flex alignItems={"center"} gap={"2"}>
											<Text fontSize={16} color='whitesmoke'>
												{format(currentTime)}
											</Text>
											<Text fontSize={16} color='whitesmoke'>
												/
											</Text>
											<Text fontSize={16} color='whitesmoke'>
												{format(duration)}
											</Text>
										</Flex>
										<Image src={logo} width={"120px"} ml={"auto"} />
										<MdOpenInFull
											fontSize={30}
											color={"#f1f1f1"}
											cursor='pointer'
											onClick={() => {}}
										/>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</GridItem>
				<GridItem width={"100%"} p={2} colSpan></GridItem>
			</Grid>
		</Flex>
	);
};

export default VideoPinDetail;

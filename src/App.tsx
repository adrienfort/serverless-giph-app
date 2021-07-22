import { ChangeEvent, useEffect, useState } from 'react';

import { Box, Center, Grid, Input, Text } from '@chakra-ui/react';

type GifType = {
	id: string;
	embed_url: string;
};

const GifCard = ({ URL }: { URL: string }): JSX.Element => <iframe title={URL} src={URL} allowFullScreen />;

const App = (): JSX.Element => {
	const [input, setInput] = useState('');
	const [gifs, setGifs] = useState<GifType[]>([]);

	useEffect(() => {
		const fetchGiphy = () => {
			fetch(`.netlify/functions/fetchGiphy/?input=${input}`)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setGifs(data.data);
				});
		};

		const timer = setTimeout(() => {
			fetchGiphy();
		}, 700);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Box w="100%" h="100%" bg="black">
			<Center>
				<Text
					mt="48px"
					bgGradient="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(193,176,15,1) 0%, rgba(0,212,255,1) 100%)"
					bgClip="text"
					fontWeight="extrabold"
					fontSize="32px"
				>
					Serverless Gifs App
				</Text>
			</Center>
			<Center>
				<Input
					onChange={(event) => setInput(event.target.value)}
					value={input}
					mt="48px"
					w="90%"
					maxW="600px"
					color="white"
					size="lg"
					focusBorderColor="green.300"
					placeholder="search gifs"
				/>
			</Center>
			<Center>
				<Grid mt="80px" templateColumns="repeat(3, 1fr)" gap={8}>
					{gifs.map((gif) => (
						<GifCard key={gif.id} URL={gif.embed_url} />
					))}
				</Grid>
			</Center>
		</Box>
	);
};

export default App;

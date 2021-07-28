import { useEffect, useState } from 'react';

import { Flex, Grid, Input, Text } from '@chakra-ui/react';

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
				.then((data) => setGifs(data.data));
		};

		const timer = setTimeout(() => {
			fetchGiphy();
		}, 700);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Flex direction="column" align="center" w="100%" h="100%" bg="black">
			<Text
				mt="48px"
				bgGradient="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(193,176,15,1) 0%, rgba(0,212,255,1) 100%)"
				bgClip="text"
				fontWeight="extrabold"
				fontSize="32px"
			>
				Serverless Gifs App
			</Text>
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
			<Grid mt="80px" templateColumns="repeat(3, 1fr)" gap={8}>
				{gifs.map((gif) => (
					<GifCard key={gif.id} URL={gif.embed_url} />
				))}
			</Grid>
		</Flex>
	);
};

export default App;

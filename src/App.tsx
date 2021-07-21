import { ChangeEvent } from 'react';

import { Box, Center, Input, Text } from '@chakra-ui/react';

const App = (): JSX.Element => {
	const fetchGifs = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		console.log(value);
	};

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
					Serverless Giphs App
				</Text>
			</Center>
			<Center>
				<Input
					onChange={(event) => fetchGifs(event)}
					mt="48px"
					w="90%"
					maxW="600px"
					color="white"
					size="lg"
					focusBorderColor="green.300"
					placeholder="search gifs"
				/>
			</Center>
		</Box>
	);
};

export default App;

"use client";

import { Coordinate } from "@/components/Coordinate";
import { Header } from "@/components/Header";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
	const [review, setReview] = useState<number | undefined>();

	return (
		<>
			<Header />
			<Container mt={5}>
				<Flex>
					<Coordinate label="トップス" />
				</Flex>
				<Flex mt={5}>
					<Coordinate label="ボトムス" />
				</Flex>
				<Flex mt={5}>
					<Button bg={"blue.500"}>送信</Button>
				</Flex>
				<Flex mt={10}>
					<Text>あなたのコーディネートは {review} 点です</Text>
				</Flex>
			</Container>
		</>
	);
}

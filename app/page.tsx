"use client";

import { Coordinate } from "@/components/Coordinate";
import { Header } from "@/components/Header";
import { API_BASE_URL } from "@/const";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

type Response = {
	result: number;
};

export default function Home() {
	const [review, setReview] = useState<number | undefined>();
	const [tops, setTops] = useState<number[]>();
	const [bottoms, setBottoms] = useState<number[]>();

	const handleSubmit = async () => {
		if (!tops || !bottoms) return;
		const res = await fetch(`${API_BASE_URL}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tops: tops, bottoms: bottoms }),
		});
		const data: Response = await res.json();
		setReview(data.result);
	};

	return (
		<>
			<Header />
			<Container mt={5}>
				<Flex>
					<Coordinate label="トップス" onChange={(e) => setTops(e)} />
				</Flex>
				<Flex mt={5}>
					<Coordinate label="ボトムス" onChange={(e) => setBottoms(e)} />
				</Flex>
				<Flex mt={5}>
					<Button bg={"blue.500"} onClick={handleSubmit}>
						送信
					</Button>
				</Flex>
				<Flex mt={10}>
					<Text>あなたのコーディネートは {review} 点です</Text>
				</Flex>
			</Container>
		</>
	);
}

"use client";

import { Coordinate } from "@/components/Coordinate";
import { Header } from "@/components/Header";
import { Reference } from "@/components/Reference";
import { API_BASE_URL } from "@/const";
import { Button, Container, FileUpload, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

type Response = {
	score: number;
	harmony: number;
	comment: string;
};

export default function Home() {
	const [score, setScore] = useState<number | undefined>();
	const [harmony, setHarmony] = useState<number | undefined>();
	const [comment, setComment] = useState<string | undefined>();
	const [tops, setTops] = useState<number[]>([0, 0, 0, 1]);
	const [bottoms, setBottoms] = useState<number[]>([0, 0, 0, 1]);

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
		setScore(data.score);
		setHarmony(data.harmony);
		setComment(data.comment);
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
					<Reference />
				</Flex>
				<Flex mt={5}>
					<Button bg={"blue.500"} onClick={handleSubmit}>
						送信
					</Button>
				</Flex>
				<Flex mt={10}>
					<Text>
						色差スコア：{score}
						<br />
						調和度：{harmony}
						<br />
						コメント：{comment}
					</Text>
				</Flex>
			</Container>
		</>
	);
}

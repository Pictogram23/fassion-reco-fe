"use client";

import { Coordinate } from "@/components/Coordinate";
import { Header } from "@/components/Header";
import { Reference } from "@/components/Reference";
import { API_BASE_URL } from "@/const";
import {
	Button,
	Container,
	createListCollection,
	Flex,
	Portal,
	Select,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";

type Response = {
	total_score: number;
	comment: string;
	recommend_top: number[];
	recommend_bottom: number[];
};

export default function Home() {
	const seasons = createListCollection({
		items: [
			{ label: "指定しない", value: "none" },
			{ label: "春", value: "spring" },
			{ label: "夏", value: "summer" },
			{ label: "秋", value: "autumn" },
			{ label: "冬", value: "winter" },
		],
	});

	const [score, setScore] = useState<number | undefined>();
	const [comment, setComment] = useState<string | undefined>();
	const [recommendTop, setRecommendTop] = useState<number[] | undefined>();
	const [recommendBottom, setRecommendBottom] = useState<
		number[] | undefined
	>();
	const [tops, setTops] = useState<number[]>([0, 0, 0, 1]);
	const [bottoms, setBottoms] = useState<number[]>([0, 0, 0, 1]);
	const [season, setSeason] = useState<string[]>(["none"]);

	const handleSubmit = async () => {
		if (!tops || !bottoms || !season[0]) return;
		const res = await fetch(`${API_BASE_URL}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tops: tops, bottoms: bottoms, season: season[0] }),
		});
		const data: Response = await res.json();
		setScore(data.total_score);
		setComment(data.comment);
		setRecommendTop(data.recommend_top);
		setRecommendBottom(data.recommend_bottom);
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
					<Select.Root
						collection={seasons}
						width="180px"
						value={season}
						onValueChange={(e) => setSeason(e.value)}
						defaultValue={["none"]}
					>
						<Select.Label>季節</Select.Label>
						<Select.Control>
							<Select.Trigger>
								<Select.ValueText placeholder="選択してください" />
							</Select.Trigger>
							<Select.IndicatorGroup>
								<Select.Indicator />
							</Select.IndicatorGroup>
						</Select.Control>
						<Portal>
							<Select.Positioner>
								<Select.Content>
									{seasons.items.map((s) => (
										<Select.Item item={s} key={s.value}>
											{s.label}
											<Select.ItemIndicator />
										</Select.Item>
									))}
								</Select.Content>
							</Select.Positioner>
						</Portal>
					</Select.Root>
				</Flex>
				<Flex mt={5}>
					<Button bg={"blue.500"} onClick={handleSubmit}>
						送信
					</Button>
				</Flex>
				<Flex mt={10}>
					<Text>
						スコア：{score}
						<br />
						コメント：{comment}
						<br />
						おすすめのトップスカラー：
						{recommendTop
							? `${recommendTop[0]}, ${recommendTop[1]}, ${recommendTop[2]}`
							: ""}
						<br />
						おすすめのボトムスカラー：
						{recommendBottom
							? `${recommendBottom[0]}, ${recommendBottom[1]}, ${recommendBottom[2]}`
							: ""}
					</Text>
				</Flex>
			</Container>
		</>
	);
}

"use client";

import { Coordinate } from "@/components/Coordinate";
import { Header } from "@/components/Header";
import { Reference } from "@/components/Reference";
import { API_BASE_URL } from "@/const";
import {
	Box,
	Button,
	Container,
	createListCollection,
	Flex,
	Image,
	Portal,
	Select,
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

	const to16 = (val: number) => {
		if (val === undefined) return undefined;
		const hex = val.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};

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
		const res = await fetch(`${API_BASE_URL}/api/`, {
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
				<div style={{ maxWidth: 640, display: "flex" }}>
					<div style={{ flexGrow: 1 }}>
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
					</div>
					<div style={{ flexGrow: 1 }}>
						<Image
							src={"tops.png"}
							w={160}
							bg={`#${to16(tops[0])}${to16(tops[1])}${to16(tops[2])}`}
						/>
						<Image
							mt={2}
							src={"bottoms.png"}
							w={160}
							bg={`#${to16(bottoms[0])}${to16(bottoms[1])}${to16(bottoms[2])}`}
						/>
					</div>
				</div>
				<Flex mt={10}>
					<div>
						スコア：{score ? score : 0}/100
						<br />
						コメント：{comment}
						<br />
						おすすめのトップスカラー：
						{recommendTop ? (
							<>
								{`#${to16(recommendTop[0])}${to16(recommendTop[1])}${to16(recommendTop[2])}`}
								<Box
									w={8}
									h={8}
									bg={`#${to16(recommendTop[0])}${to16(recommendTop[1])}${to16(recommendTop[2])}`}
								>
									{" "}
								</Box>
							</>
						) : (
							<></>
						)}
						<br />
						おすすめのボトムスカラー：
						{recommendBottom ? (
							<>
								{`#${to16(recommendBottom[0])}${to16(recommendBottom[1])}${to16(recommendBottom[2])}`}
								<Box
									w={8}
									h={8}
									bg={`#${to16(recommendBottom[0])}${to16(recommendBottom[1])}${to16(recommendBottom[2])}`}
								>
									{" "}
								</Box>
							</>
						) : (
							<></>
						)}
					</div>
				</Flex>
			</Container>
		</>
	);
}

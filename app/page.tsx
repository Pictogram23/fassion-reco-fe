"use client";

import { Coordinate } from "@/components/Coordinate";
import { Header } from "@/components/Header";
import { API_BASE_URL } from "@/const";
import {
	Button,
	Container,
	FileUpload,
	Flex,
	Float,
	Image,
	Text,
	useFileUploadContext,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuX } from "react-icons/lu";

type Response = {
	result: number;
};

export default function Home() {
	const [review, setReview] = useState<number | undefined>();
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
		setReview(data.result);
	};

	const FileUploadList = () => {
		const fileUpload = useFileUploadContext();
		const files = fileUpload.acceptedFiles;
		if (files.length === 0) return null;
		return (
			<FileUpload.ItemGroup>
				{files.map((file) => (
					<FileUpload.Item
						w={"auto"}
						boxSize={360}
						p="2"
						file={file}
						key={file.name}
					>
						<FileUpload.ItemPreviewImage asChild>
							<Image w="100%" h="100%" objectFit="contain" />
						</FileUpload.ItemPreviewImage>
						<Float placement="top-end">
							<FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
								<LuX />
							</FileUpload.ItemDeleteTrigger>
						</Float>
					</FileUpload.Item>
				))}
			</FileUpload.ItemGroup>
		);
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
					<FileUpload.Root accept="image/*" maxFiles={1}>
						<FileUpload.HiddenInput />
						<FileUpload.Trigger asChild>
							<Button variant="outline" size="sm">
								Upload file
							</Button>
						</FileUpload.Trigger>
						<FileUploadList />
					</FileUpload.Root>
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

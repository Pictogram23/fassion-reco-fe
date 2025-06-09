import {
	Button,
	FileUpload,
	Float,
	Image,
	useFileUploadContext,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

export function Reference() {
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
		<FileUpload.Root accept="image/*" maxFiles={1}>
			<FileUpload.HiddenInput />
			<FileUpload.Trigger asChild>
				<Button variant="outline" size="sm">
					画像をアップロード
				</Button>
			</FileUpload.Trigger>
			<FileUploadList />
		</FileUpload.Root>
	);
}

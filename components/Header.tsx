import { Box, Flex, Link } from "@chakra-ui/react";

export function Header() {
	return (
		<Box
			bg={"blue.500"}
			px={8}
			borderBottom={"1px"}
			borderStyle={"solid"}
			borderColor={"gray.100"}
		>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				gap={6}
			>
				<Link
					p={2}
					href="/"
					color={"white"}
					fontWeight={"bold"}
					fontSize={"large"}
				>
					IROCA
				</Link>
			</Flex>
		</Box>
	);
}

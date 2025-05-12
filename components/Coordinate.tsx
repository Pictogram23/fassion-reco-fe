import { ColorPicker, HStack, Heading, Portal } from "@chakra-ui/react";

type Props = {
	label: string;
};

export function Coordinate({ label }: Props) {
	return (
		<ColorPicker.Root>
			<ColorPicker.HiddenInput />
			<ColorPicker.Label>
				<Heading>{label}</Heading>
			</ColorPicker.Label>
			<ColorPicker.Control>
				<ColorPicker.Input />
				<ColorPicker.Trigger />
			</ColorPicker.Control>
			<Portal>
				<ColorPicker.Positioner>
					<ColorPicker.Content>
						<ColorPicker.Area />
						<HStack>
							<ColorPicker.EyeDropper size="xs" variant="outline" />
							<ColorPicker.Sliders />
						</HStack>
					</ColorPicker.Content>
				</ColorPicker.Positioner>
			</Portal>
		</ColorPicker.Root>
	);
}

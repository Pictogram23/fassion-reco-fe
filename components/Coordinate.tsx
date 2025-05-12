import { ColorPicker, HStack, Heading, Portal } from "@chakra-ui/react";

type Props = {
	label: string;
	onChange: (value: number[]) => void;
};

export function Coordinate({ label, onChange }: Props) {
	const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
		const value: string = event.target.value;
		const slicedValue = value.slice(5).slice(0, -1).replaceAll(" ", "");
		const splitedValue = slicedValue.split(",");
		const encodedValue = splitedValue.map(Number);
		onChange(encodedValue);
	};

	return (
		<ColorPicker.Root onChange={(e) => handleChange(e)}>
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

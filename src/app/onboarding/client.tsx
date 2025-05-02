"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ThemeSwitcher() {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
			</SelectContent>
		</Select>
	);
}

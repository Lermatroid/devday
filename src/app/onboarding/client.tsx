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

import { setCookie, getCookie } from "cookies-next/client";

export function ThemeSwitcher() {
	return (
		<Select
			defaultValue={getCookie("theme") ?? "light"}
			onValueChange={(value) => setCookie("theme", value)}
		>
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

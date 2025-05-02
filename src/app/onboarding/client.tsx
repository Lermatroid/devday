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
import { useRouter } from "next/navigation";

export function ThemeSwitcher() {
	const router = useRouter();

	function handleThemeChange(value: string) {
		setCookie("theme", value);
		router.refresh();
	}

	return (
		<Select
			defaultValue={getCookie("theme") ?? "light"}
			onValueChange={handleThemeChange}
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

"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { createThread } from "@/app/actions/threads";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

interface SidebarProps {
	threads: {
		id: string;
		updatedAt: Date;
		name: string;
	}[];
}

export function Sidebar(props: SidebarProps) {
	const router = useRouter();
	const { executeAsync: runCreateThread, isExecuting } =
		useAction(createThread);

	async function handleCreateThread() {
		const threadIdReq = await runCreateThread();

		if (!threadIdReq?.data) {
			return alert("An error occured");
		}

		router.push(`/threads/${threadIdReq.data.threadId}`);
	}

	return (
		<div className="flex flex-col gap-y-5 bg-sidebar p-5 h-screen w-[250px]">
			<div>
				<h1 className="font-bold">ACM Chat</h1>
			</div>
			<Button onClick={handleCreateThread}>
				New Thread
				<PlusIcon className="w-4 h-4" />
			</Button>
		</div>
	);
}

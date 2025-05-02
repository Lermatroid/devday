"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { createThread } from "@/app/actions/threads";
import { useAction } from "next-safe-action/hooks";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { threadId } from "worker_threads";

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

		router.push(`/thread/${threadIdReq.data.threadId}`);
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
			<div className="flex flex-col gap-y-1">
				{props.threads.map((thread) => (
					<SidebarThreadItem
						key={thread.id}
						threadId={thread.id}
						name={thread.name}
					/>
				))}
			</div>
		</div>
	);
}

function SidebarThreadItem({
	threadId,
	name,
}: {
	threadId: string;
	name: string;
}) {
	const path = usePathname();

	return (
		<Link href={`/thread/${threadId}`}>
			<div
				className={`px-4 py-2 flex items-center cursor-pointer hover:bg-primary rounded ${
					path.includes(threadId)
						? "bg-primary text-primary-foreground"
						: ""
				}`}
			>
				<p className="text-sm font-semibold">{name}</p>
			</div>
		</Link>
	);
}

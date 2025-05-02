"use server";

import { authedAction } from "@/lib/safe-action";
import { db } from "@/db";
import { threadsTable } from "@/db/schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const createThread = authedAction.action(
	async ({ ctx, parsedInput }) => {
		const userId = ctx.userId;
		const threadId = nanoid();

		await db.insert(threadsTable).values({
			id: threadId,
			name: "New Chat",
			ownerId: userId,
		});

		revalidatePath("/");

		return { threadId: threadId };
	}
);

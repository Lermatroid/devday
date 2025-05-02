import { db } from "@/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { threadsTable } from "@/db/schema";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function Page({ params }: PageProps) {
	const p = await params;

	const thread = await db.query.threadsTable.findFirst({
		where: eq(threadsTable.id, p.id),
	});

	if (!thread) {
		return redirect("/");
	}

	return <div>Thread {p.id}</div>;
}

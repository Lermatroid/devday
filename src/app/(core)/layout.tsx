import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Sidebar } from "./sidebar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = await auth();

	if (!userId) {
		return <RedirectToSignIn />;
	}

	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, userId),
		with: {
			threads: true,
		},
	});

	if (!user) {
		return redirect("/onboarding");
	}

	return (
		<main className="h-screen w-full max-w-screen flex">
			<Sidebar />
			<div className="flex-1">{children}</div>
		</main>
	);
}

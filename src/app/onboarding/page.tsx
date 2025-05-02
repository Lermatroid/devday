import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./client";

export default async function Page() {
	const clerkUser = await currentUser();

	if (!clerkUser) {
		return <RedirectToSignIn />;
	}

	let user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, clerkUser.id),
	});

	if (!user) {
		user = (
			await db
				.insert(usersTable)
				.values({
					id: clerkUser.id,
					firstName: clerkUser.firstName ?? "",
					lastName: clerkUser.lastName ?? "",
					email: clerkUser.emailAddresses[0].emailAddress,
					profileImage: clerkUser.imageUrl,
				})
				.returning()
		)[0];
	}

	return (
		<main className="flex flex-col items-center justify-center h-screen w-full max-w-screen">
			<h1 className="text-6xl font-black">Welcome</h1>
			<p className="text-xl font-bold">Configure your experience below</p>
			<div className="bg-popover border-primary border-2 max-w-[500px] w-full h-[300px] rounded-lg mt-5 flex flex-col items-center justify-center gap-y-5">
				<ThemeSwitcher />
				<Link href="/">
					<Button>Continue</Button>
				</Link>
			</div>
		</main>
	);
}

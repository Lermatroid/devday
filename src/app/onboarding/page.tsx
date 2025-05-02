import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
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

	return <div>{user.firstName}</div>;
}

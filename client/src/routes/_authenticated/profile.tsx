import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
	component: Profile,
});

function Profile() {
	const { isPending, error, data } = useQuery(userQueryOptions);

	if (isPending) return "Loading";
	if (error) return "User Not Logged In" + error.message;

	return (
		<div className="text-3xl">
			<div>Hello {data?.user.given_name}</div>
			<a href="/api/logout">Logout</a>
		</div>
	);
}

import { type QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router";

interface MyRouterContext {
	queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: Root,
});

function Navbar() {
	return (
		<div className="p-2 flex gap-2 max-w-3xl m-auto">
			<Link to="/" className="[&.active]:font-bold">
				Home
			</Link>{" "}
			<Link to="/about" className="[&.active]:font-bold">
				About
			</Link>
			<Link to="/expenses" className="[&.active]:font-bold">
				Expenses
			</Link>
			<Link to="/create-expense" className="[&.active]:font-bold">
				Create
			</Link>
			<Link to="/profile" className="[&.active]:font-bold">
				Profile
			</Link>
		</div>
	);
}
function Root() {
	return (
		<>
			<Navbar />
			<hr />
			<div className="max-w-3xl m-auto">
				<Outlet />
			</div>
		</>
	);
}

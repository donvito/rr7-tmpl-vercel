import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_VERCEL };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Welcome message={loaderData.message} />
      <div className="mt-4">
        <Link to="/characters" className="text-blue-600 hover:underline">
          View Star Wars Characters
        </Link>
      </div>
    </div>
  );
}

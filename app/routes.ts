import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("characters", "routes/characters.tsx"),
  route("demo", "routes/demo.tsx"),
  route("blog", "routes/blog.tsx")
] satisfies RouteConfig;

import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Route file paths are relative to the app directory (./app)
export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth.tsx"),
  route("upload", "routes/upload.tsx"),
] satisfies RouteConfig;
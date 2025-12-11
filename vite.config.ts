import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
<<<<<<< HEAD
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths()
  ],
});
=======
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
>>>>>>> 444b805647ffab956e52deb8331e273562d8da2c

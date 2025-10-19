import type { NextConfig } from "next";

const path = require("path");

const nextConfig: NextConfig = {
   reactStrictMode: true,

   outputFileTracingRoot: path.join(__dirname, "../"),

   /* config options here */
};

export default nextConfig;

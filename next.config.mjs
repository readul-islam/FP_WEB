/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure Next.js output file tracing resolves modules from the monorepo root.
  // Use process.cwd() here because this file runs in an ESM context.
  outputFileTracingRoot: `${process.cwd()}/../..`,
};

export default nextConfig;


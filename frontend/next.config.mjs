/** @type {import('next').NextConfig} */

import nextra from 'nextra';

const nextConfig = {
  images: {
    domains: ['ap-south-1.graphassets.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
});
export default withNextra(nextConfig);

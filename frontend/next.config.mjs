/** @type {import('next').NextConfig} */

import nextra from 'nextra';

const nextConfig = {
  images: {
    domains: ['ap-south-1.graphassets.com'],
  },
  typescript: {
  },
  output: 'standalone'
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
});
export default withNextra(nextConfig);


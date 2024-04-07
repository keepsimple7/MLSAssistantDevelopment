/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dvvjkgh94f2v6.cloudfront.net",
      "cdn.rets.ly",
      "s3.amazonaws.com",
    ],
  },
  env: {
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    REACT_APP_PIC_DOMAIN: process.env.REACT_APP_PIC_DOMAIN,
    REACT_APP_PROJECT_NAME: process.env.REACT_APP_PROJECT_NAME,
    REACT_APP_WEB_API_KEY: process.env.REACT_APP_WEB_API_KEY,
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;

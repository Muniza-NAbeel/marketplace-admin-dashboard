
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['cdn.sanity.io'], // Sanity images allow ho jayengi
//     },
//   };
  
//   export default nextConfig;
  











/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'cdn.sanity.io',
        },
      ],
    },
    env: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || 'your-sanity-project-id', // Add your Sanity project ID here
      SANITY_DATASET: process.env.SANITY_DATASET || 'your-dataset-name', // Add your dataset name here
      SANITY_TOKEN: process.env.SANITY_TOKEN || 'your-sanity-token', // Add your Sanity token here
    },
  };
  
  export default nextConfig;
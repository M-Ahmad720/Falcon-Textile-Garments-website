/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "falcontextilegarments.com" },
      { protocol: "https", hostname: "www.falcontextilegarments.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/product-category/chief-coats",
        destination: "/product-category/chief-coats-cotton-pieces",
        permanent: true,
      },
      {
        source: "/product-category/coveralls-overalls",
        destination: "/product-category/coveralls-overalls-suits",
        permanent: true,
      },
      {
        source: "/product-category/flame-resistant-clothing",
        destination: "/product-category/flame-resistant-fr-clothing",
        permanent: true,
      },
      {
        source: "/product-category/heavy-duty-denimcanvas-clothing",
        destination: "/product-category/heavy-duty-denim-canvas-clothing",
        permanent: true,
      },
      {
        source: "/product-category/hi-visibility-clothing",
        destination: "/product-category/high-visibility-safety-workwear",
        permanent: true,
      },
      {
        source: "/product-category/lab-coats",
        destination: "/product-category/lab-coats-parachute-cotton",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

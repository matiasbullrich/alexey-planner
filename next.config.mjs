/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the site out of search engines: it is a private planner.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;

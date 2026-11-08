import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let a phone on the same Wi-Fi load the dev server's scripts through this PC's
  // network address (http://192.168.x.x:3000). Without it Next blocks them, the page never becomes
  // interactive on the phone, and things like the email menu do nothing. Has no effect on the
  // deployed site. If the PC's address changes, add the new one here.
  allowedDevOrigins: ["192.168.68.115", "192.168.56.1"],
};

export default nextConfig;

import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cekpremi",
        destination: "https://layanan.sahabatinsurance.id/cekpremi/",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });

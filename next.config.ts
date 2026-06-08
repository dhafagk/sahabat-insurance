import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
    }
    config.output.filename = config.output.filename.replace(
      "[chunkhash]",
      "[contenthash]",
    );
    config.output.chunkFilename = config.output.chunkFilename.replace(
      "[chunkhash]",
      "[contenthash]",
    );
    return config;
  },
};

export default withPayload(nextConfig);

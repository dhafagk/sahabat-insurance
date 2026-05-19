import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { News } from "./collections/News";
import { Tags } from "./collections/Tags";
import { Pages } from "./collections/Pages";
import { Unduhan } from "./collections/Unduhan";
import { Tabel } from "./collections/Tabel";
import { LandingPage } from "./globals/LandingPage";
import { VisiMisi } from "./globals/VisiMisi";
import { Manajemen } from "./globals/Manajemen";
import { NavbarConfig } from "./globals/NavbarConfig";
import { FooterConfig } from "./globals/FooterConfig";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, News, Tags, Pages, Unduhan, Tabel],
  globals: [LandingPage, VisiMisi, Manajemen, NavbarConfig, FooterConfig],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      ssl: { rejectUnauthorized: false },
    },
  }),
  sharp,
  plugins: [],
});

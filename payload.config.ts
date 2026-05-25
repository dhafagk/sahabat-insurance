import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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
import { DownloadLeads } from "./collections/DownloadLeads";
import { LandingPage } from "./globals/LandingPage";
import { VisiMisi } from "./globals/VisiMisi";
import { Manajemen } from "./globals/Manajemen";
import { NavbarConfig } from "./globals/NavbarConfig";
import { FooterConfig } from "./globals/FooterConfig";
import { ContactUs } from "./globals/ContactUs";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: { icon: "/api/admin-favicon" },
    },
    css: path.resolve(dirname, 'components/admin/admin.css'),
    components: {
      graphics: {
        Logo: './components/admin/AdminLogo#AdminLogo',
        Icon: './components/admin/AdminIcon#AdminIcon',
      },
    },
  },
  collections: [Users, Media, Products, News, Tags, Pages, Unduhan, Tabel, DownloadLeads],
  globals: [LandingPage, VisiMisi, Manajemen, NavbarConfig, FooterConfig, ContactUs, SiteSettings],
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
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});

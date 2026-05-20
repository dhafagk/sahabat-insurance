import { getPayload } from "payload";
import config from "@payload-config";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import LatestNews from "./components/LatestNews";
import CtaBanner from "./components/CtaBanner";
import PromoStrip from "./components/PromoStrip";
import Footer from "./components/Footer";
// import type { FooterData } from "./components/Footer";
import type { HeroData } from "./components/Hero";
import type {
  SectionMeta as ProductsSectionMeta,
  ProductItem,
} from "./components/Products";
import type { WhyChooseUsData } from "./components/WhyChooseUs";
import type {
  SectionMeta as NewsSectionMeta,
  NewsItem,
} from "./components/LatestNews";
import type { CtaBannerData } from "./components/CtaBanner";
import type { PromoStripData } from "./components/PromoStrip";

export const dynamic = "force-dynamic";

interface LandingPageData {
  hero?: HeroData | null;
  promoStrip?: PromoStripData | null;
  productsSection?: ProductsSectionMeta | null;
  whyChooseUs?: WhyChooseUsData | null;
  newsSection?: NewsSectionMeta | null;
  ctaBanner?: CtaBannerData | null;
}

export default async function Home() {
  const payload = await getPayload({ config });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any;

  const [rawLanding, productsResult, newsResult] = await Promise.all([
    p.findGlobal({ slug: "landing-page" }) as Promise<unknown>,
    p.find({ collection: "products", sort: "order", limit: 100 }) as Promise<{
      docs: unknown[];
    }>,
    p.find({
      collection: "news",
      where: { status: { equals: "published" } },
      sort: "-date",
      limit: 3,
    }) as Promise<{ docs: unknown[] }>,
    p.findGlobal({ slug: "footer", depth: 1 }) as Promise<unknown>,
  ]);

  const landingPage = rawLanding as unknown as LandingPageData;
  const products = productsResult.docs as unknown as ProductItem[];
  const news = newsResult.docs as unknown as NewsItem[];
  // const footer = rawFooter as unknown as FooterData;

  return (
    <>
      <Navbar />
      <main>
        <Hero data={landingPage.hero} />
        {/* <PromoStrip data={landingPage.promoStrip} /> */}
        <Products
          products={products}
          sectionMeta={landingPage.productsSection}
        />
        <WhyChooseUs data={landingPage.whyChooseUs} />
        <LatestNews news={news} sectionMeta={landingPage.newsSection} />
        <CtaBanner data={landingPage.ctaBanner} />
      </main>
      <Footer />
    </>
  );
}

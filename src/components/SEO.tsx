import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title = "Bella Glow Cosméticos - Realce sua beleza natural", 
  description = "Descubra os melhores cosméticos, maquiagens e produtos de skincare na Bella Glow. Qualidade e sofisticação para sua rotina de beleza.",
  image = "/og-image.jpg",
  url = "https://bellaglow.com.br"
}: SEOProps) {
  const fullTitle = `${title} | Bella Glow`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}

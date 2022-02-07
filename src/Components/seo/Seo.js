import ReactGa from "react-ga"
import { useEffect } from "react";
import {Helmet} from "react-helmet"

const Seo = ({ title, description, keywords, keyphrase, image, url }) => {
  let slug = window.location.href  
  useEffect(()=>{
    ReactGa.initialize(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)
    ReactGa.pageview(slug)
  },[])
  return (
    <Helmet>
      {/* analytics */}
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XY0KS1Y346"
      ></script>

      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="keyphrase" content={keyphrase} />
      <meta name="robots" content="index , follow" />
      <meta name="image" content={image} />
      {/* bot */}
      <meta name="googlebot" content="index , follow" />
      <meta name="yandex-verification" content="" />
      {/* link */}
      <link rel="canonical" href={url} />
      {/* twitter */}
      <meta name="twitter:site" content="AquaKart" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter : title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* OG */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="ecommerce" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="og:country-name" content="INDIA" />
      {/* verification */}
      <meta name="google-site-verification" content="" />
      <meta name="yandex-verification" content="57e95579c1776142" />
    </Helmet>
  );
};
export default Seo;

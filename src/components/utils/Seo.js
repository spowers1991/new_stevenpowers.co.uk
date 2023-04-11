
import React from "react";
import { Helmet } from "react-helmet";

const Seo = (props) => {
    return (
      <Helmet>
          <meta name="robots" content={props?.seo?.robots ? props?.seo?.robots : 'all'} />
          <title>
            {props?.seo?.title ? props?.seo?.title : 'Blog'} 
          </title>
          <meta name="description" content={props?.seo?.description ? props?.seo?.description : 'This is a sample blog to showcase the MERN Stack and React component state management.'} />
          <meta name="image" content={props?.seo?.image} />
          <meta property="og:title" content={props?.seo?.title ? props?.seo?.title : 'Blog'} />
          <meta property="og:description" content={props?.seo?.description? props?.seo?.description : 'This is a sample blog to showcase the MERN Stack and React component state management.'}  />
          <meta property="og:image" content={props?.seo?.image} />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content={props?.seo?.title ? props?.seo?.title : 'Blog'}  />
          <meta name="twitter:description" content={props?.seo?.description? props?.seo?.description : 'This is a sample blog to showcase the MERN Stack and React component state management.'} />
          <meta name="twitter:image" content={props?.seo?.image} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": 'url',
              "name": 'Steven Powers',
              "description": "Web Developer"
            })}
          </script>
      </Helmet>
    )
}
export default Seo
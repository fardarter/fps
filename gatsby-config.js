const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
};

module.exports = {
  siteMetadata: {
    title: `Fire Place Studio Development`,
    description: `The Fireplace Experts`,
    author: "Fireplace Studio",
    siteUrl: `${process.env.DEPLOY_URL}`
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig
    },
    `gatsby-plugin-offline`, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: true, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: images.ctfassets.net"
        }
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [
            "Cache-Control: public,max-age=360000",
            `Content-Security-Policy: style-src 'self' 'unsafe-inline'; worker-src 'self'; base-uri 'self'; default-src 'self'; object-src 'none'; form-action 'self'; font-src 'self' data:; connect-src 'self';`
          ]
        } // option to add more headers. `Link` headers are transformed by the below criteria
      }
    }
  ]
};

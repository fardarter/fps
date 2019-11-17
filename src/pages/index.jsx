import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

// import { Foo } from "../components/layout1";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query OtherQuery {
      allContentfulFireplace {
        edges {
          node {
            id
            image {
              title
              file {
                contentType
                fileName
                url
                details {
                  image {
                    height
                    width
                  }
                  size
                }
              }
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <Img fluid={data.allContentfulFireplace.edges[0].node.image.fluid} />
      <img
        src={data.allContentfulFireplace.edges[0].node.image.file.url}
        alt="foo"
      />
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;

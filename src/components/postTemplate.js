import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  location,
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout location={location}>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          {frontmatter.featureImage && (
            <img
              src={frontmatter.featureImage.publicURL}
              alt={frontmatter.featureImage.name}
            />
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        slug
        title
        featureImage {
          name
          publicURL
        }
      }
    }
  }
`;

console.log({ pageQuery });

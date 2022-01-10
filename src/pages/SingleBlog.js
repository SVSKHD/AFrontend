import Layout from "../Components/Layout/Layout";
import Seo from "../Components/seo/Seo";
import BlogPageSchema from "../Components/seo/BlogSchema";

const SingleBlog = ({ match }) => {
  return (
    <>
      <Layout>
        <Seo />
        <BlogPageSchema />
      </Layout>
    </>
  );
};
export default SingleBlog;

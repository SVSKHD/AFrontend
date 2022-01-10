import Layout from "../Components/Layout/Layout";

// seo
import Seo from "../Components/seo/Seo";

const Blog = () => {
  return (
    <Layout>
      <Seo
        title={`Aquakart Blog| Almost every query is solved`}
        description={`Here you can choose your product with custom filters with your need optimised with wide range of varieties of products are added here with great discounts with immediate delivery.`}
        keywords={`Aquakart Shop with various products List , Grundfos , Kent , Liquiclear , Ao Smith`}
        image={`https://aquakart.store/static/media/Default.9c4634fa.png`}
      />
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-body">
            <h1 className="text-center">Blogs</h1>
            <hr />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Blog;

import Layout from "../Components/Layout/Layout";

// seo
import Seo from "../Components/seo/Seo";

const Blog = () => {
  return (
    <Layout>
      <Seo
        title={`Aquakart Blog | Almost every thing about the products in Aquakart`}
        description={`Here you can choose your product with custom filters with your need optimised with wide range of varieties of products are added here with great discounts with immediate delivery.`}
        keywords={`Aquakart Shop with various products List , Grundfos , Kent , Liquiclear , Ao Smith`}
        image={`https://aquakart.co.in/static/media/Default.9c4634fa.png`}
      />
      <div className="container">
        <div className="container blogtitlepart">
          <div className="row">
            <div className="col-2 col-md-2" />
            <div className="col-8 col-md-8">
              <h1 className="display-3 text-center blogfont">Know More About the products Here</h1>
            </div>
            <div className="col-2 col-md-2" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Blog;

import axios from "axios";

export const CreateBlog = async (blog, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/blog`, blog, {
    headers: {
      authtoken,
    },
  });

export const getProductbyCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProduts = async (sort, order, page) => {
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
};

export const DeleteProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

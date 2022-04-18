import React, { useState, useEffect } from "react";
import { getCategories } from "../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(setTimeout(false,4000));

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const LoadCategories = () => (
    <>
      <ul className="list-unstyled mt-3 footer-links">
        {categories.map((category) => (
          <li>
            <a
              href={`/category/${category.slug}`}
              class="text-white text-decoration-none"
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      {loading ? (
        <div className="mb-5">
          <div class="spinner-border text-light" role="status" />
        </div>
      ) : (
        LoadCategories()
      )}
    </>
  );
};
export default CategoryList;

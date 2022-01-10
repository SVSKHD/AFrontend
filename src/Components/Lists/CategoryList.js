import React, { useState, useEffect } from "react";
import { getCategories } from "../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <span class="loader">
          <span class="loader-inner"></span>
        </span>
      ) : (
        LoadCategories()
      )}
    </>
  );
};
export default CategoryList;

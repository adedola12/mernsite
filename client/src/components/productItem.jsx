import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div>
      <Link>
        <img />
        <div>
          <p>{product.name}</p>
        </div>
      </Link>
    </div>
  );
}

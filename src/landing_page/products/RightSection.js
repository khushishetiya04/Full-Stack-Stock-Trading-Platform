import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  linkText,
  linkURL,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            {linkText && linkURL && (
              <a href={linkURL} style={{ textDecoration: "none" }}>
                {linkText} <i className="fa-solid fa-arrow-right-long"></i>
              </a>
            )}
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;

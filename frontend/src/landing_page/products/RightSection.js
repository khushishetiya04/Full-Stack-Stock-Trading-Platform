import React from "react";
import { Link } from "react-router-dom";

function RightSection({
  imageURL,
  productName,
  productDescription,
  linkText,
  linkURL,
}) {
  const hasValidLink = (url) => url && url !== "#";

  const isInternalLink = (url) => url && url.startsWith("/");

  const renderLink = () => {
    if (!linkText || !hasValidLink(linkURL)) {
      return null;
    }

    const content = (
      <>
        {linkText} <i className="fa-solid fa-arrow-right-long"></i>
      </>
    );

    return isInternalLink(linkURL) ? (
      <Link to={linkURL} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    ) : (
      <a href={linkURL} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>

          <div>{renderLink()}</div>
        </div>

        <div className="col-6">
          <img
            src={imageURL}
            alt={`${productName} product illustration`}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;

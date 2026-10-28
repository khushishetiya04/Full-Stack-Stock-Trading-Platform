import React from "react";
import { Link } from "react-router-dom";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  linkText,
  linkURL,
  learnMore,
  googlePlay,
  appStore,
}) {
  const hasValidLink = (url) => url && url !== "#";

  const isInternalLink = (url) => url && url.startsWith("/");

  const renderLink = (url, text, className = "") => {
    if (!hasValidLink(url)) return null;

    const content = (
      <>
        {text} <i className="fa-solid fa-arrow-right-long"></i>
      </>
    );

    return isInternalLink(url) ? (
      <Link to={url} className={className} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    ) : (
      <a href={url} className={className} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-6">
          <img
            src={imageURL}
            alt={`${productName} product illustration`}
            className="img-fluid"
          />
        </div>

        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>

          <div>
            {linkText && renderLink(linkURL, linkText)}

            {renderLink(learnMore, "Learn More", "ms-5")}
          </div>

          <div className="mt-3">
            {hasValidLink(googlePlay) && (
              <a href={googlePlay}>
                <img
                  src="/media/googlePlayBadge.svg"
                  alt="Get it on Google Play"
                  className="img-fluid"
                />
              </a>
            )}

            {hasValidLink(appStore) && (
              <a href={appStore}>
                <img
                  src="/media/appstoreBadge.svg"
                  alt="Download on the App Store"
                  className="img-fluid ms-5"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;

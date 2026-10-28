
import React from "react";

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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} alt={productName} />
        </div>

        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>

          <div>
            {linkText && hasValidLink(linkURL) && (
              <a href={linkURL} style={{ textDecoration: "none" }}>
                {linkText} <i className="fa-solid fa-arrow-right-long"></i>
              </a>
            )}

            {hasValidLink(learnMore) && (
              <a
                href={learnMore}
                style={{
                  marginLeft: "50px",
                  textDecoration: "none",
                }}
              >
                Learn More <i className="fa-solid fa-arrow-right-long"></i>
              </a>
            )}
          </div>

          <div className="mt-3">
            {hasValidLink(googlePlay) && (
              <a href={googlePlay}>
                <img src="/media/googlePlayBadge.svg" alt="Get it on Google Play" />
              </a>
            )}

            {hasValidLink(appStore) && (
              <a href={appStore}>
                <img
                  src="/media/appstoreBadge.svg"
                  alt="Download on the App Store"
                  style={{ marginLeft: "50px" }}
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

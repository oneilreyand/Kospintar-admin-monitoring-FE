import React, { useState } from 'react';

const SafeImage = ({ src, alt, className, fallback = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=80', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallback);
      setIsError(true);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default SafeImage;

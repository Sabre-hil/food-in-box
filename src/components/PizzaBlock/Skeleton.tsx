import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="2" y="252" rx="10" ry="10" width="263" height="33" />
      <rect x="5" y="306" rx="10" ry="10" width="259" height="103" />
      <rect x="8" y="427" rx="10" ry="10" width="93" height="28" />
      <rect x="134" y="420" rx="20" ry="20" width="131" height="43" />
      <rect x="197" y="411" rx="0" ry="0" width="1" height="4" />
      <circle cx="133" cy="120" r="117" />
    </ContentLoader>
  );
}

export default Skeleton;

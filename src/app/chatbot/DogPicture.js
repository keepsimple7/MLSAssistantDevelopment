// new file called DogPicture.jsx
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message);
      });
  }, []);

  return (
    <div>
      <Image src={imageUrl} alt='a dog' />
    </div>
  );
};

export default DogPicture;
import { useState, useEffect } from 'react';
import { getData } from 'services/pixabay-API';

import Searchbar from 'components/Searchbar/Searchbar'
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [imageToEnlarge, setImageToEnlarge] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getImages(query, page);
  }, [query, page]);

  const getImages = async (query, page) => {
    if (query !== '') { 
      try {
        setLoading( true );
        const { hits, totalHits } = await getData(query, page);
        setHits(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  const handleSubmit = query => {
      setQuery(query);
      setHits([]);
      setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleEnlargeImage = (imageURL) => {
    setShowModal(true);
    setImageToEnlarge(imageURL);
};

  const handleCloseModal = event => {
      setShowModal(false);
  }; 

  return (
      <>
          <Searchbar handleSubmit={handleSubmit} />
          {loading && (
              <Loader isLoading={loading} />
              )}
          {hits.length > 0 && (
            <ImageGallery handleEnlargeImage={handleEnlargeImage} hits={hits} />
            )}
          {totalHits !== hits.length && (
            <Button loadMore={handleLoadMore} />
            )}
          {showModal && (
            <Modal imageToEnlarge={imageToEnlarge} handleCloseModal={handleCloseModal} />
            )}
      </>
    );
}


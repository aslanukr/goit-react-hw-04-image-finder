import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (query === '') {
      // if (!isFirstRender) {
      //   toast.warn('Please enter your search request');
      // }
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await getImages(query, page);
        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        if (hits.length > 0 && page === 1) {
          toast.success(`Hooray! We found ${totalHits} images!`);
        }

        const pictures = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        setImages(prev => [...prev, ...pictures]);
        setTotalHits(totalHits);
      } catch (error) {
        toast.error(`${error.message}`);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
    setIsFirstRender(false);
  }, [query, page, isFirstRender]);

  useEffect(() => {
    if (totalHits !== null && totalHits <= images.length) {
      toast.info(`We're sorry, but you've reached the end of search results.`);
    }
  }, [totalHits, images]);

  const handleSearch = query => {
    setIsFirstRender(false);
    setQuery(query);
    setImages([]);
    setPage(1);
    if (query === '') {
      toast.warn('Please enter your search request');
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const showButton = images.length > 0 && totalHits > page * 12 && !isLoading;

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {images?.length > 0 && <ImageGallery images={images} />}
      {showButton && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={1500} />
    </>
  );
}

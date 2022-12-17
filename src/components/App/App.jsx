import { useState, useEffect } from 'react';
import ErrorImg from '../../constance/images/error.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, ErrorImage } from './App.styled';
import { GlobalStyle } from '../../constance/GlobalStyle';

import { Loader } from '../Loader/Loader';
import { SearchBar } from '../SearchBar';
import imagesAPI from '../../servise/FetchImages';
import { ImageGallery } from '../ImageGallery';
import { LoadButton } from '../LoadButton';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImg, setTotalImg] = useState(0);

  useEffect(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }
    getPictures(query, page);
  }, [query, page]);

  const getPictures = (query, page) => {
    setIsLoading(true);
    imagesAPI
      .fetchImages(query, page)
      .then(images => {
        if (images.hits.length < 1) {
          toast.info(
            `😅 Unfortunately the world is not that creative yet, so we did not find pictures on request ${query}. Try something less eccentric and we'll make you happy!`
          );
          return;
        }
        setQuery(query);
        setPage(page);
        setImages(prevImg => [...prevImg, ...images.hits]);
        setTotalImg(images.totalHits);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let querySearch = e.target.query.value;
    if (querySearch.trim() === '') {
      toast.error('Enter your request');
      return;
    } else if (querySearch === query) {
      toast.warn(
        `Hey, you're already looking at super pictures on request ${querySearch}`
      );
      return;
    }

    setQuery(querySearch);
    setPage(1);
    setImages([]);
    setTotalImg(0);

    e.target.query.value = '';
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
      {error && (
        <ErrorImage
          src={ErrorImg}
          alt="Oops, something went wrong. Please reload the page"
        />
      )}

      <ImageGallery images={images} />
      {isLoading && <Loader />}
      <ToastContainer />
      {images.length > 0 && totalImg > images.length && (
        <LoadButton onClick={handleLoadMore} />
      )}
      <GlobalStyle />
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     error: null,
//     isLoading: false,
//     totalImg: 0,
//   };

//   componentDidMount() {
//     this.setState({
//       error: null,
//     });
//   }

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//       this.setState({
//         isLoading: true,
//       });

//       this.getPictures(query, page);
//     }
//   }

//   getPictures = (query, page) => {
//     imagesAPI
//       .fetchImages(query, page)
//       .then(images => {
//         if (images.hits.length < 1) {
//           return toast.info(
//             `😅 Unfortunately the world is not that creative yet, so we did not find pictures on request ${query}. Try something less eccentric and we'll make you happy!`
//           );
//         }

//         this.setState(prevState => ({
//           query,
//           images: [...prevState.images, ...images.hits],
//           page,
//           totalImg: images.totalHits,
//         }));
//       })
//       .catch(error => {
//         this.setState({
//           error,
//         });
//       })
//       .finally(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//   };
//   handleSubmit = e => {
//     e.preventDefault();

//     let querySearch = e.target.query.value;
//     if (querySearch.trim() === '') {
//       toast.error('Enter your request');
//     } else if (querySearch === this.state.query) {
//       toast.warn(
//         `Hey, you're already looking at super pictures on request ${querySearch}`
//       );
//     } else {
//       this.setState({
//         query: querySearch,
//         page: 1,
//         images: [],
//         totalImg: 0,
//       });
//     }

//     e.target.query.value = '';
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   render() {
//     const { isLoading, images, error, totalImg } = this.state;
//     console.log(images.length);
//     return (
//       <Container>
//         <SearchBar onSubmit={this.handleSubmit} onChange={this.handleChange} />
//         {error && (
//           <ErrorImage
//             src={ErrorImg}
//             alt="Oops, something went wrong. Please reload the page"
//           />
//         )}

//         <ImageGallery images={images} />
//         {isLoading && <Loader />}
//         <ToastContainer />
//         {images.length > 0 && totalImg > images.length && (
//           <LoadButton onClick={this.handleLoadMore} />
//         )}
//         <GlobalStyle />
//       </Container>
//     );
//   }
// }

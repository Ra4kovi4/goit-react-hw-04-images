import { Component } from 'react';
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
export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    isLoading: false,
    totalImg: 0,
  };

  componentDidMount() {
    this.setState({
      error: null,
    });
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoading: true,
      });

      imagesAPI
        .fetchImages(query, page)
        .then(images => {
          if (images.hits.length < 1) {
            return toast.info(
              `😅 Unfortunately the world is not that creative yet, so we did not find pictures on request ${query}. Try something less eccentric and we'll make you happy!`
            );
          }
          if (prevState.query !== query || prevState.page !== page) {
            this.setState({
              query,
              images: [...prevState.images, ...images.hits],
              page,
              totalImg: images.totalHits,
            });
          }
        })
        .catch(error => {
          this.setState({
            error,
          });
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    let querySearch = e.target.query.value;
    if (querySearch.trim() === '') {
      toast.error('Enter your request');
    } else if (querySearch === this.state.query) {
      toast.warn(
        `Hey, you're already looking at super pictures on request ${querySearch}`
      );
    } else {
      this.setState({
        query: querySearch,
        page: 1,
        images: [],
        totalImg: 0,
      });
    }

    e.target.query.value = '';
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { isLoading, images, error } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {error && (
          <ErrorImage
            src={ErrorImg}
            alt="Oops, something went wrong. Please reload the page"
          />
        )}
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        <ToastContainer />
        {images.length > 0 && <LoadButton onClick={this.handleLoadMore} />}
        <GlobalStyle />
      </Container>
    );
  }
}

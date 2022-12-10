import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeDots
      height="50"
      width="50"
      radius="9"
      color="blue"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        margin: '0 auto',
      }}
    />
  );
};

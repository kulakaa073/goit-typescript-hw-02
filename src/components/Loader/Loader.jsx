import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Loader({ loading }) {
  return (
    <ClipLoader
      color="#ffffff"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

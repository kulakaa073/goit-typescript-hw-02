import css from './LoadMoreButton.module.css';

interface Props {
  onLoadMore: () => void;
}

export default function LoadMoreButton({ onLoadMore }: Props) {
  return (
    <button type="button" onClick={onLoadMore} className={css.button}>
      Load more
    </button>
  );
}

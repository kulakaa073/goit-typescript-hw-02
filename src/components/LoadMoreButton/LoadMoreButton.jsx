import css from './LoadMoreButton.module.css';

export default function LoadMoreButton({ onLoadMore }) {
  return (
    <button type="button" onClick={onLoadMore} className={css.button}>
      Load more
    </button>
  );
}

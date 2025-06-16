type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</button>
      <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
}

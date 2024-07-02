import styles from "./styles.module.css";


interface PaginationProps {
  postsPerPage: number;
  totalPosts:number;
  paginate: any;
  currentpage:number;
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, totalPosts, paginate, currentpage }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={styles.pagination}>
        {pageNumbers.map(number => (
          <div key={number} className={styles.pagination}>
            <div onClick={() => paginate(number)}  className={currentpage === number ? styles.btn : styles.btnUn}>
              {number}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

Pagination.displayName = "Pagination";
export default Pagination;

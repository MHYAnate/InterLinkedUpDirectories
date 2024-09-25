import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import NextSvg from "./nextSvg";
import PrevSvg from "./prevSvg";
import NextPageSvg from "./nextPageSvg";
import PrevPageSvg from "./prevPageSvg";


interface PaginationProps {
  postsPerPage: number;
  totalPosts:number;
  paginate: any;
  currentpage:number;
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, totalPosts, paginate, currentpage }) => {
  const pageNumbers: number[] = [];

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const [pageRange, setPageRange] = useState(1);

  const visibleRangeSize = 5;
  

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfFirstPageInRange = (pageRange - 1) * visibleRangeSize + 1;
  const indexOfLastPageInRange = Math.min(pageRange * visibleRangeSize, totalPages);

  const visiblePageNumbers = pageNumbers.slice(indexOfFirstPageInRange - 1, indexOfLastPageInRange);

  const handlePrevious = () => {
    if (currentpage > 1) {
      paginate(currentpage - 1);
    }
  };

  const handleNext = () => {
    if (currentpage < pageNumbers.length) {
      paginate(currentpage + 1);
    }
  };

  const handleNextRange = () => {
    if (indexOfLastPageInRange < totalPages) {
      setPageRange(pageRange + 1);
    }
  };

  const handlePrevRange = () => {
    if (pageRange > 1) {
      setPageRange(pageRange - 1);
    }
  };

  return (
    <nav>
      <div className={styles.pagination}>
        {pageRange > 1 && (<div onClick={()=>handlePrevRange()}> <PrevPageSvg/></div>)}
        <div onClick={()=>handlePrevious()}><PrevSvg/></div>
        {visiblePageNumbers.map(number => (
          <div key={number} className={styles.pagination}>
            <div onClick={() => paginate(number)}  className={currentpage === number ? styles.btn : styles.btnUn}>
              {number}
            </div>
          </div>
        ))}
        <div onClick={()=>handleNext()}><NextSvg/></div>
        {indexOfLastPageInRange < totalPages && (<div onClick={()=>{handleNextRange()}}><NextPageSvg/></div>)}
      </div>
    </nav>
  );
};

Pagination.displayName = "Pagination";
export default Pagination;

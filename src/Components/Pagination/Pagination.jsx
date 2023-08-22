import React, {useState , useEffect} from "react";
import "./Pagination.css";
import {Link, useParams} from "react-router-dom";
import app from "../../App";

function Pagination({items , itemsCount , pathName , setShownItems}) {
  const {page} = useParams()
  const [pageCount, setPageCount] = useState(null)

  useEffect(() => {
    let endIndex = itemsCount * page //=> 3 * 1 -> items -> [1 , 3]
    let startIndex = endIndex - itemsCount //=> 3 - 3 = 0 -> [0,3]
    let paginatedItems = items.slice(startIndex , endIndex)
    setShownItems(paginatedItems)
    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPageCount(pagesNumber)
  }, [page , items]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {/*<li className="courses__pagination-item">*/}
        {/*  <a href="#" className="courses__pagination-link">*/}
        {/*    <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>*/}
        {/*  </a>*/}
        {/*</li>*/}
        {
          Array(pageCount).fill(0).map((item , index) => (
              <li className="courses__pagination-item" key={index}>
                {
                  index + 1 === Number(page) ? (
                      <Link to={`${pathName}/${index + 1}`} className="courses__pagination-link courses__pagination-link--active">
                        {index + 1}
                      </Link>
                  ) : (
                      <Link to={`${pathName}/${index + 1}`} className="courses__pagination-link">
                        {index + 1}
                      </Link>
                  )
                }
              </li>
          ))
        }
        {/*<li className="courses__pagination-item">*/}
        {/*  <a href="#" className="courses__pagination-link">*/}
        {/*    <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>*/}
        {/*  </a>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
}

export default Pagination;

import {Component} from 'react'
import styles from "./styles.module.css";
import * as React from "react";
import Image from "next/image";
import  { useState,  useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from "next/navigation";



interface props {
	suggestionsList:any[],
}

const SearchComponentMain: React.FC<props> = ({ suggestionsList}) => {

	const [searchInput, setSearchInput] = useState("");
  const [open, close] = useState(true);

  
  
 
  const pathname = usePathname();
  const searchParams = useSearchParams()
	// let startTime = performance.now();

	// while (performance.now() - startTime < 1) {
	// 	// Do nothing for 1ms per item to emulate extremely slow code
	// }
  const set = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

   
  const searchId = typeof document !== 'undefined' ? document.getElementById(
    "sid"
    ) as HTMLInputElement | null : null;
	
	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
		// handleSuggestionClick;
  };

  // const handleSuggestionClick = (id: string, suggestion: string) => {

  //   setSearchInput(suggestion);
		 
  // };
 
    const filteredList = suggestionsList.filter((eachItem) => {
      const text = eachItem.name.toLowerCase();
      return text.includes(searchInput.toLowerCase());
    });
    const router = useRouter()

    useEffect(() => {
      // Reset input value if pathname is not /vendors
      if (pathname !== '/') {
        setSearchInput('');
        close(false);

      }
    }, [pathname, close,open]);
    useEffect(() => {
      // Reset input value if pathname is not /vendors
      if (pathname === '/') {
        
        close(true);

      }
    }, [pathname, close,open]);

    return (
      <div className={styles.inputCoverBody}>
        <div >
          <div >
            <input
              className={pathname === '/' ?(styles.input):(styles.hide)}
              value={searchInput}
              onChange={updateSearchInput}
							src='@/features/try/svg.svg'
							placeholder="Search Vendors Space"
              id='sid'
            />
          </div>
         {searchId?.value && open ? ( <div className={styles.ul}>
          <div className={styles.filterValueCover}>
            {filteredList.map(eachItem => (
              <div
              onClick={
                ()=>(router.push(`/vendors/${eachItem.name}` + '?' + set('name' , `${eachItem.name}`)+'&'+ set('isrc',`${eachItem.src}`)))
               } 
                className={styles.VendorRenderCover}
                key={eachItem.id}
              >
                <div className={styles.imgCover}>
                  <div className={styles.vendorName}>{eachItem.name}</div>
                  <Image
                    className={styles.idiImg}
                    src={`${eachItem.src}`}
                    alt={`${eachItem.name}`}
                    quality={100}
                    width={500}
                    height={500}
                    // unoptimized
                  />
                </div>
              </div>
            ))}
          </div></div>) :(<div className={styles.noneSearch}></div>)}
         
        </div>
      </div>
    )
  }


export default SearchComponentMain
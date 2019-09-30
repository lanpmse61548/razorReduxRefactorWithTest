// import React, { useRef, useEffect } from "react";
// import PropTypes from "prop-types";

// useOutsideClickHandler = (ref,click) =>{
//   /**
//    * Alert if clicked on outside of element
//    */
//   handleClickOutside = (event) => {
//     if (ref.current && !ref.current.contains(event.target)) {
//       //alert("You clicked outside of me!");
//       click();
//     }
//   }

//   useEffect(() => {
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   });
// }

// /**
//  * Component that alerts if you click outside of it
//  */
// OutsideClickHandler = (props) => {
//   const wrapperRef = useRef(null);
//   useOutsideClickHandler(wrapperRef,props.click);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }

// OutsideClickHandler.propTypes = {
//   children: PropTypes.element.isRequired
// };

// export default OutsideClickHandler;


import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideClickHandler(ref,click){
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event){
    if (ref.current && !ref.current.contains(event.target)) {
      //alert("You clicked outside of me!");
      click();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideClickHandler(props){

  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef,props.click);

  return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideClickHandler.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideClickHandler;

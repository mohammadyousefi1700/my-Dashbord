// import { useEffect, useRef, Fragment, ReactNode } from "react";

// export type ClickAwayCallback = (event: MouseEvent) => void;

// export type ClickAwayListener = (children: ReactNode) => JSX.Element;

// export const useClickAwayListener = (callback: ClickAwayCallback) => {
//   const ref = useRef<HTMLDivElement>(null);
//   console.log("callback", callback);
//   console.log("ref", ref);

//   useEffect(() => {
//     const handleClick = (event: MouseEvent) => {
//       console.log("ref.current", ref.current);

//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         console.log("event", event);

//         callback(event);
//       }
//     };

//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, [callback]);

//   return (children: ReactNode) => {
//     return (
//       <Fragment>
//         <div ref={ref}>{children}</div>
//       </Fragment>
//     );
//   };
// };

// 'use client';

// import { useAppDispatch, useAppSelector } from '@/lib/store/store';
// import { increment, decrement } from '@/lib/store/features/counterSlice';



// export default function Counter() {
//   const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <h2 className="text-2xl font-bold">Counter: {count}</h2>
//       <div className="flex items-center gap-4">
//         <button
          
//           onClick={() => dispatch(decrement())}
//         >
//         {"+"}
//         </button>
//         <button
         
         
//           onClick={() => dispatch(increment())}
//         >
//           {"-"}
//         </button>
//       </div>
//     </div>
//   );
// }
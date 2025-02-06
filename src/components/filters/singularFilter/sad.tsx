// "use client"

// import { useState, React } from "react"
// import Image from "next/image"
// import Link from "next/link"

// export default function Homepage() {
//   const [selectedCategory, setSelectedCategory] = useState("items")
//   const [filters, setFilters] = useState({
//     state: "",
//     area: "",
//     tag: "",
//     status: "",
//     condition: "",
//     searchAddress: "",
//     searchName: ""
//   })

//   const categories = [
//     { id: "automotive", name: "Automotive", icon: "/placeholder.svg?height=24&width=24" },
//     { id: "maintenance", name: "Maintenance", icon: "/placeholder.svg?height=24&width=24" },
//     { id: "items", name: "Items", icon: "/placeholder.svg?height=24&width=24" },
//     { id: "shops", name: "Shops", icon: "/placeholder.svg?height=24&width=24" },
//     { id: "vacancies", name: "Vacancies", icon: "/placeholder.svg?height=24&width=24" },
//     { id: "companies", name: "Companies", icon: "/placeholder.svg?height=24&width=24" }
//   ]

//   const products = [
//     {
//       id: 1,
//       name: "Dell Laptop",
//       price: "₦500K",
//       condition: "Clean Used",
//       rating: 4,
//       image: "/placeholder.svg?height=300&width=300",
//       feedbackCount: 0
//     },
//     {
//       id: 2,
//       name: "Solar Panels",
//       price: "₦1.5M - ₦3.3M",
//       condition: "New",
//       rating: 5,
//       image: "/placeholder.svg?height=300&width=300",
//       feedbackCount: 0
//     },
//     {
//       id: 3,
//       name: "Projectors",
//       price: "₦1k Per Hour",
//       condition: "Fairly Used",
//       rating: 4,
//       image: "/placeholder.svg?height=300&width=300",
//       feedbackCount: 0
//     },
//     {
//       id: 4,
//       name: "Camera",
//       price: "₦1.5k Per Hour",
//       condition: "Very Used",
//       rating: 3,
//       image: "/placeholder.svg?height=300&width=300",
//       feedbackCount: 0
//     }
//   ]

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFilters(prev => ({ ...prev, [name]: value }))
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-white bg-opacity-95 backdrop-blur">
//         <div className="container mx-auto flex h-16 items-center justify-between px-4">
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-green-500">ILUD</span>
//           </Link>
//           <nav className="flex items-center space-x-4">
//             <Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
//             <Link href="/login" className="text-gray-600 hover:text-gray-900">Log In</Link>
//             <Link 
//               href="/register" 
//               className="rounded-full bg-green-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
//             >
//               Register
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-white py-20">
//         <div className="container mx-auto px-4">
//           <div className="relative z-10 mx-auto max-w-4xl text-center">
//             <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//               CONNECTIONS
//               <span className="mt-2 block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
//                 MADE EASY
//               </span>
//             </h1>
//             <p className="mb-8 text-lg text-gray-600">
//               A Simplified Business Network with an Amplified Reach.
//             </p>
//             <Link
//               href="/register"
//               className="inline-flex items-center rounded-full bg-green-500 px-8 py-3 text-base font-medium text-white transition-all hover:bg-green-600 hover:shadow-lg"
//             >
//               REGISTER NOW!
//             </Link>
//           </div>
//           <div className="absolute right-0 top-1/2 -translate-y-1/2">
//             <div className="h-96 w-96 rounded-full bg-green-500/20" />
//           </div>
//           <div className="absolute -left-24 top-1/4 h-48 w-48 rounded-full bg-green-500/10" />
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="border-y bg-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`flex flex-col items-center rounded-lg p-4 transition-all hover:bg-gray-50 ${
//                   selectedCategory === category.id ? "bg-green-50 ring-2 ring-green-500" : ""
//                 }`}
//               >
//                 <div className="mb-2 h-8 w-8">
//                   <Image
//                     src={category.icon || "/placeholder.svg"}
//                     alt={category.name}
//                     width={32}
//                     height={32}
//                     className="text-gray-600"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">{category.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="bg-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="rounded-xl bg-gray-50 p-6">
//             <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
//               <select
//                 name="state"
//                 value={filters.state}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               >
//                 <option value="">Select State</option>
//                 <option value="lagos">Lagos</option>
//                 <option value="abuja">Abuja</option>
//               </select>
//               <select
//                 name="area"
//                 value={filters.area}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               >
//                 <option value="">Select Area</option>
//                 <option value="ikeja">Ikeja</option>
//                 <option value="lekki">Lekki</option>
//               </select>
//               <select
//                 name="tag"
//                 value={filters.tag}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               >
//                 <option value="">Select Tag</option>
//                 <option value="electronics">Electronics</option>
//                 <option value="furniture">Furniture</option>
//               </select>
//               <select
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               >
//                 <option value="">Select Status</option>
//                 <option value="available">Available</option>
//                 <option value="sold">Sold</option>
//               </select>
//               <select
//                 name="condition"
//                 value={filters.condition}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               >
//                 <option value="">Select Condition</option>
//                 <option value="new">New</option>
//                 <option value="used">Used</option>
//               </select>
//             </div>
//             <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               <input
//                 type="text"
//                 name="searchAddress"
//                 value={filters.searchAddress}
//                 onChange={handleFilterChange}
//                 placeholder="Search Item Address"
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               />
//               <input
//                 type="text"
//                 name="searchName"
//                 value={filters.searchName}
//                 onChange={handleFilterChange}
//                 placeholder="Name of Items"
//                 className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//               />
//               <button className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition-colors hover:bg-green-600">
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products */}
//       <section className="bg-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg"
//               >
//                 <div className="relative aspect-square overflow-hidden">
//                   <Image
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.name}
//                     fill
//                     className="object-cover transition-transform group-hover:scale-105"
//                   />
//                   <div className="absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-md">
//                     {product.condition}
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.name}</h3>
//                   <div className="mb-4 flex items-center justify-between">
//                     <span className="text-lg font-bold text-green-600">{product.price}</span>
//                     <div className="flex items-center">
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <svg
//                             key={i}
//                             className={`h-4 w-4 ${
//                               i < product.rating ? "text-yellow-400" : "text-gray-300"
//                             }`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <span className="ml-2 text-sm text-gray-600">
//                         ({product.feedbackCount} reviews)
//                       </span>
//                     </div>
//                   </div>
//                   <button className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200">
//                     More Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pagination */}
//       <section className="bg-white py-8">
//         <div className="container mx-auto flex items-center justify-center px-4">
//           <nav className="flex space-x-2" aria-label="Pagination">
//             <button className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white">
//               1
//             </button>
//             <button className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
//               2
//             </button>
//             <button className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
//               Next
//             </button>
//           </nav>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t bg-white py-8">
//         <div className="container mx-auto text-center text-sm text-gray-600">
//           © 2024 ILUD. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   )
// }
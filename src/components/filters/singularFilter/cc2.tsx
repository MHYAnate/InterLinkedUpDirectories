// "use client"

// import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Car, Grid3X3, HardHat, Search, Settings, ShoppingBag, Star, User, Wrench } from 'lucide-react'

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function Component() {
//   const categories = [
//     { name: "Automotive", icon: Car },
//     { name: "Maintenance", icon: Wrench },
//     { name: "Items", icon: ShoppingBag },
//     { name: "Shops", icon: Grid3X3 },
//     { name: "Vacancies", icon: User },
//     { name: "Companies", icon: Settings },
//   ]

//   const products = [
//     {
//       id: 1,
//       name: "Dell Laptop",
//       price: "₦500K",
//       status: "Clean Used",
//       rating: 4.5,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       feedbackCount: 12
//     },
//     {
//       id: 2,
//       name: "Solar Panels",
//       price: "₦1.5M - ₦3.3M",
//       status: "New",
//       rating: 5,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       feedbackCount: 8
//     },
//     {
//       id: 3,
//       name: "Projectors",
//       price: "₦1k Per Hour",
//       status: "Fairly Used",
//       rating: 4.2,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       feedbackCount: 15
//     },
//     {
//       id: 4,
//       name: "Camera",
//       price: "₦1.5k Per Hour",
//       status: "Very Used",
//       rating: 4.8,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       feedbackCount: 20
//     }
//   ]

//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-green-500">ILUD</span>
//           </Link>
//           <nav className="flex items-center space-x-4">
//             <Button variant="ghost">About Us</Button>
//             <Button variant="ghost">Log In</Button>
//             <Button variant="default" className="bg-green-500 hover:bg-green-600">Register</Button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-green-50 py-20">
//         <div className="container relative z-10">
//           <div className="mx-auto max-w-2xl text-center">
//             <h1 className="mb-4 text-4xl font-bold tracking-tight text-green-800 sm:text-6xl">
//               CONNECTIONS
//               <span className="block text-3xl font-medium text-green-600 sm:text-4xl">MADE EASY</span>
//             </h1>
//             <p className="mb-8 text-lg text-gray-600">
//               A Simplified Business Network with an Amplified Reach.
//             </p>
//             <Button size="lg" className="bg-green-500 hover:bg-green-600">
//               REGISTER NOW!
//             </Button>
//           </div>
//         </div>
//         <div className="absolute right-0 top-1/2 -translate-y-1/2">
//           <div className="h-96 w-96 rounded-full bg-green-400/20" />
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="flex-1 py-8">
//         <div className="container">
//           {/* Categories */}
//           <Tabs defaultValue="items" className="mb-8">
//             <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
//               {categories.map((category) => (
//                 <TabsTrigger key={category.name} value={category.name.toLowerCase()} className="flex items-center space-x-2">
//                   <category.icon className="h-4 w-4" />
//                   <span>{category.name}</span>
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </Tabs>

//           {/* Filters */}
//           <div className="mb-8 grid gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-5">
//             <Select placeholder="Select State" />
//             <Select placeholder="Select Area" />
//             <Select placeholder="Select Tag" />
//             <Select placeholder="Select Status" />
//             <Select placeholder="Select Condition" />
//             <Input placeholder="Search Item Address" className="md:col-span-2" />
//             <Input placeholder="Name of Items" className="md:col-span-2" />
//             <Button className="bg-green-500 hover:bg-green-600 md:col-span-1">
//               <Search className="mr-2 h-4 w-4" />
//               Search
//             </Button>
//           </div>

//           {/* Products Grid */}
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             {products.map((product) => (
//               <Card key={product.id} className="overflow-hidden">
//                 <CardHeader className="p-0">
//                   <div className="relative aspect-square">
//                     <Image
//                       src="/placeholder.svg?height=400&width=400"
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                     <Badge
//                       className="absolute right-2 top-2"
//                       variant={
//                         product.status === "New"
//                           ? "default"
//                           : product.status === "Clean Used"
//                           ? "secondary"
//                           : "destructive"
//                       }
//                     >
//                       {product.status}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
//                   <div className="flex items-center justify-between">
//                     <span className="font-semibold text-green-600">{product.price}</span>
//                     <div className="flex items-center space-x-1">
//                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm text-gray-600">
//                         {product.rating} ({product.feedbackCount})
//                       </span>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-0">
//                   <Button className="w-full bg-green-500 hover:bg-green-600">More Details</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t bg-gray-50 py-8">
//         <div className="container text-center text-sm text-gray-600">
//           © 2024 ILUD. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   )
// }
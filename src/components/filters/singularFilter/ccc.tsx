// "use client"

// import * as React from "react"
// import { Moon, Sun, Search, ChevronDown, Star, Info } from 'lucide-react'
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export default function Component() {
//   const [isDarkMode, setIsDarkMode] = React.useState(false)
//   const [activeCategory, setActiveCategory] = React.useState("items")

//   const categories = [
//     { id: "automotive", label: "Automotive", icon: "🚗" },
//     { id: "maintenance", label: "Maintenance", icon: "🔧" },
//     { id: "items", label: "Items", icon: "📦" },
//     { id: "shops", label: "Shops", icon: "🏪" },
//     { id: "vacancies", label: "Vacancies", icon: "💼" },
//     { id: "companies", label: "Companies", icon: "🏢" },
//   ]

//   const items = [
//     {
//       id: 1,
//       title: "Dell Laptop",
//       price: "N500K",
//       condition: "Clean Used",
//       rating: 4.5,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       isNew: false
//     },
//     {
//       id: 2,
//       title: "Solar Panels",
//       price: "N1.5M - N3.3M",
//       condition: "New",
//       rating: 5,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       isNew: true
//     },
//     {
//       id: 3,
//       title: "Projectors",
//       price: "N1k Per Hour",
//       condition: "Fairly Used",
//       rating: 4,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       isNew: false
//     },
//     {
//       id: 4,
//       title: "Camera",
//       price: "N1.5k Per Hour",
//       condition: "Very Used",
//       rating: 4.8,
//       image: "https://sjc.microlink.io/kVcF9Yy-htXKpS3wzILQttiLUy_PbWtexEcUhNXrXAC3VxI5fDT8ydf4ZM5oVhb7ictVaOTYc9yKUID8OhPnsQ.jpeg",
//       isNew: false
//     }
//   ]

//   return (
//     <div className={cn("min-h-screen bg-background", isDarkMode && "dark")}>
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-6">
//             <a href="/" className="flex items-center space-x-2">
//               <span className="text-2xl font-bold text-primary">ILUD</span>
//             </a>
//           </div>

//           <nav className="flex items-center gap-6">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className="h-9 w-9"
//             >
//               {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//             <Button variant="ghost">About Us</Button>
//             <Button variant="ghost">Log In</Button>
//             <Button>Register</Button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-background py-24">
//         <div className="container relative z-10">
//           <div className="mx-auto max-w-2xl text-center">
//             <h1 className="text-5xl font-bold tracking-tight">
//               Connections
//               <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"> Made Easy</span>
//             </h1>
//             <p className="mt-6 text-lg text-muted-foreground">
//               A Simplified Business Network with an Amplified Reach.
//             </p>
//             <div className="mt-10">
//               <Button size="lg" className="rounded-full">
//                 Register Now!
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4">
//           <div className="h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="container py-12">
//         {/* Categories */}
//         <Tabs defaultValue={activeCategory} className="mb-8" onValueChange={setActiveCategory}>
//           <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
//             {categories.map((category) => (
//               <TabsTrigger key={category.id} value={category.id} className="gap-2">
//                 <span>{category.icon}</span>
//                 <span className="hidden sm:inline">{category.label}</span>
//               </TabsTrigger>
//             ))}
//           </TabsList>
//         </Tabs>

//         {/* Filters */}
//         <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <Select>
//             <SelectTrigger>
//               <SelectValue placeholder="Select State" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="lagos">Lagos</SelectItem>
//               <SelectItem value="abuja">Abuja</SelectItem>
//               <SelectItem value="kano">Kano</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Area" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="ikeja">Ikeja</SelectItem>
//               <SelectItem value="lekki">Lekki</SelectItem>
//               <SelectItem value="victoria-island">Victoria Island</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Tag" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="electronics">Electronics</SelectItem>
//               <SelectItem value="furniture">Furniture</SelectItem>
//               <SelectItem value="vehicles">Vehicles</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="available">Available</SelectItem>
//               <SelectItem value="sold">Sold</SelectItem>
//               <SelectItem value="reserved">Reserved</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="mb-8 grid gap-4 md:grid-cols-2">
//           <Input placeholder="Search Item Address" />
//           <Input placeholder="Name of Items" />
//         </div>

//         {/* Items Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {items.map((item) => (
//             <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
//               <CardHeader className="relative p-0">
//                 <img
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.title}
//                   className="h-48 w-full object-cover"
//                 />
//                 {item.isNew && (
//                   <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
//                     New
//                   </span>
//                 )}
//                 <span className="absolute right-2 top-2 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold backdrop-blur">
//                   {item.condition}
//                 </span>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold">{item.title}</h3>
//                 <p className="text-lg font-bold text-primary">{item.price}</p>
//               </CardContent>
//               <CardFooter className="flex items-center justify-between border-t p-4">
//                 <div className="flex items-center gap-1">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                   <span className="text-sm">{item.rating}</span>
//                 </div>
//                 <Button size="sm" variant="secondary">
//                   More Details
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t py-8">
//         <div className="container text-center text-sm text-muted-foreground">
//           © 2024 ILUD. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   )
// }
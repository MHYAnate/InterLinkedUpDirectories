// "use client";
// import React, { useState, useEffect, Suspense } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useAppDispatch, useAppSelector } from "@/lib/store/store";
// import {
// 	fetchProfiles,
// 	type ProfileValues,
// } from "@/lib/store/features/profileSlice";
// import { fetchFavourites } from "@/lib/store/features/favoriteVendorsSlice";
// import { fetchRatings, type RateValue } from "@/lib/store/features/ratingSlice";
// import Firebase from "@/firebase/firebase";
// import ClientRating from "./clientRating";
// import ClientFeedBack from "./clientFeedBack";
// import ClientRateTime from "./clientRateTime";
// import UpDateAvailability from "@/components/setting/upDateAvailability";
// import UpDateLocation from "@/components/setting/upDateLocation";
// import UpDateSpecialty from "@/components/setting/upDateSpecialty";
// import LoadingSvg from "@/components/loading/loadingSvg";

// const { auth } = Firebase;

// export default function Dashboard() {
// 	const dispatch = useAppDispatch();
// 	const [user] = useAuthState(auth);

// 	const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(
// 		null
// 	);

// 	useEffect(() => {
// 		dispatch(fetchProfiles());
// 	}, [dispatch]);

// 	useEffect(() => {
// 		dispatch(fetchFavourites());
// 	}, [dispatch]);
// 	const vendorId = profileDetails?.docid ? profileDetails?.docid : "";
// 	const [loader, setLoader] = useState(false);

// 	const [quick, setQuick] = useState("");

// 	useEffect(() => {
// 		dispatch(fetchRatings(vendorId));
// 	}, [dispatch, vendorId]);

// 	const { profiles } = useAppSelector((state) => state.profile);

// 	const { favoriteVendors } = useAppSelector((state) => state.favoriteVendor);

// 	useEffect(() => {
// 		if (user && profiles.length > 0) {
// 			const vendorDetail = profiles.find(
// 				(profile) => profile.email.toLowerCase() === user.email?.toLowerCase()
// 			);
// 			setProfileDetails(vendorDetail || null);
// 			console.log(profileDetails?.name, "name");
// 		}
// 	}, [user, profiles, profileDetails?.name]);

// 	const filteredCustomers =
// 		favoriteVendors?.filter((customer) =>
// 			vendorId
// 				? customer.vendorId.toLowerCase() === vendorId.toLowerCase()
// 				: false
// 		) ?? [];

// 	const filteredStaffs =
// 		profiles?.length > 0
// 			? profiles.filter((eachItem) => {
// 					const text = eachItem.isEmployedId.toLowerCase();
// 					return vendorId !== null && vendorId !== undefined && vendorId !== ""
// 						? text.includes(vendorId.toLowerCase())
// 						: text;
// 			  })
// 			: [];

// 	const cardRatings = useAppSelector(
// 		(state) =>
// 			state.rating.ratingsByCard[vendorId] || {
// 				ratings: [] as RateValue[],
// 				totalRate: 0,
// 				loading: false,
// 				error: null,
// 			}
// 	);

// 	const { ratings, totalRate, loading, error } = cardRatings;

// 	const finalRate = Math.round(ratings.length ? totalRate / ratings.length : 0);

// 	return (
// 		<Suspense fallback={<LoadingSvg />}>
// 			{loader ? (
// 				<LoadingSvg />
// 			) : (
// 				<main className="flex-grow container mx-auto px-4 py-8">
// 					<h1 className="text-3xl font-bold mb-8">Dashboard</h1>
// 					<div className="grid grid-cols-1 mb-8 md:grid-cols-2 gap-6">
// 						<div className="bg-white rounded-lg shadow-md p-6">
// 							<h2 className="text-xl font-bold text-gray-800 mb-4">
// 								{loading
// 									? "Updating..."
// 									: error
// 									? "error Updating try Again"
// 									: "Quick Actions"}
// 							</h2>
// 							<div className="space-y-4">
// 								<button
// 									onClick={() =>
// 										quick !== "Availability"
// 											? setQuick("Availability")
// 											: setQuick("")
// 									}
// 									className="w-full py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-900 transition-colors"
// 								>
// 									Update Availability
// 								</button>
// 								{quick === "Availability" && (
// 									<UpDateAvailability
// 										setLoader={setLoader}
// 										setQuick={setQuick}
// 										docId={vendorId}
// 									/>
// 								)}

// 								<button
// 									onClick={() =>
// 										quick !== "Location" ? setQuick("Location") : setQuick("")
// 									}
// 									className="w-full py-2 px-4 bg-green-700 text-white rounded hover:bg-green-900 transition-colors"
// 								>
// 									Update Location
// 								</button>
// 								{quick === "Location" && (
// 									<UpDateLocation
// 										setLoader={setLoader}
// 										setQuick={setQuick}
// 										docId={vendorId}
// 									/>
// 								)}

// 								<button
// 									onClick={() =>
// 										quick !== "Speciality"
// 											? setQuick("Speciality")
// 											: setQuick("")
// 									}
// 									className="w-full py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-900 transition-colors"
// 								>
// 									Update Speciality
// 								</button>
// 								{quick === "Speciality" && (
// 									<UpDateSpecialty
// 										setLoader={setLoader}
// 										setQuick={setQuick}
// 										docId={vendorId}
// 									/>
// 								)}
// 							</div>
// 						</div>
// 						<div className="bg-gray-100 rounded-lg p-6">
// 							<h2 className="text-2xl font-bold mb-4">Status</h2>
// 							<ul className="space-y-4">
// 								<li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
// 									<span className="font-medium">Availability</span>
// 									<span className="text-sm text-gray-600">
// 										{profileDetails?.availability}
// 									</span>
// 								</li>
// 								<li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
// 									<span className="font-medium">Current location</span>
// 									<span className="text-sm text-gray-600">{`${profileDetails?.area} ${profileDetails?.state} ${profileDetails?.country} `}</span>
// 								</li>
// 								<li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
// 									<span className="font-medium">Specialty</span>
// 									<span className="text-sm text-gray-600">
// 										{profileDetails?.specialty}
// 									</span>
// 								</li>
// 							</ul>
// 						</div>
// 					</div>

// 					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// 						<div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
// 							<h2 className="text-lg font-semibold text-gray-600 mb-2">
// 								Total Staffs
// 							</h2>
// 							<p className="text-3xl font-bold">{filteredStaffs.length}</p>
// 						</div>
// 						<div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
// 							<h2 className="text-lg font-semibold text-gray-600 mb-2">
// 								Total Customers
// 							</h2>
// 							<p className="text-3xl font-bold">{filteredCustomers.length}</p>
// 						</div>
// 						<div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
// 							<h2 className="text-lg font-semibold text-gray-600 mb-2">
// 								Total Reviews
// 							</h2>
// 							<p className="text-3xl font-bold">{ratings.length}</p>
// 						</div>
// 						<div className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
// 							<h2 className="text-lg font-semibold text-gray-600 mb-2">
// 								Avg. Rating
// 							</h2>
// 							<p className="text-3xl font-bold">{finalRate}</p>
// 						</div>
// 					</div>

// 					<div className="bg-gray-100 rounded-lg p-6 mb-12">
// 						<h2 className="text-2xl font-bold mb-4">Customers Feed Backs</h2>
// 						<div className="overflow-x-auto">
// 							<table className="w-full">
// 								<thead>
// 									<tr className="border-b border-gray-200">
// 										<th className="text-left p-2 font-semibold">Customer</th>
// 										<th className="text-left p-2 font-semibold">Review</th>
// 										<th className="text-left p-2 font-semibold">Rating</th>
// 										<th className="text-left p-2 font-semibold">Date</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									{filteredCustomers.map((customer) => (
// 										<tr
// 											key={customer.clientId}
// 											className="border-b border-gray-200 last:border-b-0"
// 										>
// 											<td className="p-2">{customer.clientName}</td>
// 											<td className="p-2">
// 												<ClientFeedBack
// 													clientId={customer.clientId}
// 													ratings={ratings}
// 												/>
// 											</td>
// 											<td className="p-2">
// 												<ClientRating
// 													clientId={customer.clientId}
// 													ratings={ratings}
// 												/>
// 											</td>
// 											<td className="p-2">
// 												<ClientRateTime
// 													clientId={customer.clientId}
// 													ratings={ratings}
// 												/>
// 											</td>
// 										</tr>
// 									))}
// 								</tbody>
// 							</table>
// 						</div>
// 					</div>
// 				</main>
// 			)}
// 		</Suspense>
// 	);
// }

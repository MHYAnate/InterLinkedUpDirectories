"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchProfiles,
	type ProfileValues,
} from "@/lib/store/features/profileSlice";
import {
	fetchRatings,
	resetCardRating,
	type RateValue,
} from "@/lib/store/features/ratingSlice";
import Firebase from "@/firebase/firebase";
import VendorStaffsComponent from "../workShop/staff";
import { collection, getDocs } from "firebase/firestore";
import firebase from "@/firebase/firebase";

const { auth } = Firebase;
export default function Profile() {
	const [user] = useAuthState(auth);
	const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(
		null
	);
	const [rating, setRatings] = useState<RateValue[]>([]);

	const [activeTab, setActiveTab] = useState("about");

	const dispatch = useAppDispatch();
	const { profiles } = useAppSelector((state) => state.profile);
	const cardRatings = useAppSelector(
		(state) =>
			state.rating.ratingsByCard[profileDetails?.docid ?? ""] || {
				ratings: [] as RateValue[],
				totalRate: 0,
				loading: false,
				error: null,
			}
	);

	const { ratings, totalRate } = cardRatings;


	const finalRate = totalRate / ratings.length

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			const vendorDetail = profiles.find(
				(profile) => profile.email.toLowerCase() === user.email?.toLowerCase()
			);
			setProfileDetails(vendorDetail ? vendorDetail : null);
		}
	}, [user, profiles]);

	useEffect(() => {
		if (profileDetails?.docid) {
			dispatch(fetchRatings(profileDetails.docid));
			return () => {
				dispatch(resetCardRating(profileDetails.docid));
			};
		}
	}, [dispatch, profileDetails?.docid]);

	const { database } = firebase;

	const profileDetailRef = collection(database, "rateUs");

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				const querySnapshot = await getDocs(profileDetailRef);

				if (querySnapshot.empty) {
					console.log("No profile details found");
					return;
				}

				const retrievedData: RateValue[] = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data() as RateValue;
					retrievedData.push(data);
				});

				setRatings(retrievedData);
			} catch (error) {
				console.error("Error getting profile detail:", error);
				setRatings([]);
			}
		};

		fetchProfileDetails();
	}, [database, profileDetailRef]); 

	const tabContent = {
		about: (
			<p className="text-gray-700 leading-relaxed">{profileDetails?.about}</p>
		),
		services: (
			<div className="space-y-4">
				{[1, 2, 3, 4, 5].map((num) => (
					<div
						key={num}
						className="flex justify-between items-center border-b border-gray-200 pb-2"
					>
						<span className="text-gray-700">
							{profileDetails?.[`service${num}` as keyof ProfileValues]}
						</span>
						<span className="font-semibold text-gray-900">
							{profileDetails?.[`s${num}Price` as keyof ProfileValues]}
						</span>
					</div>
				))}
			</div>
		),
		contact: (
			<div className="space-y-2">
				{[
					{ label: "Phone", value: profileDetails?.number },
					{ label: "Email", value: profileDetails?.email },
					{ label: "Address", value: profileDetails?.address },
					{ label: "Availability", value: profileDetails?.availability },
				].map(({ label, value }) => (
					<p key={label} className="text-gray-700">
						<strong>{label}:</strong> {value}
					</p>
				))}
			</div>
		),

		staffs: (
			<div className="space-y-2">
				<VendorStaffsComponent id={`${profileDetails?.docid}`} rating={rating} />
			</div>
		),
	};

	return (
		<div className="min-h-fit bg-white text-black flex flex-col">
			<main className="flex-grow container mx-auto px-4 py-8">
				<div className="bg-white rounded-lg shadow-xl overflow-hidden">
					<div className="md:flex">
						<div className="md:flex-shrink-0">
							{profileDetails?.src === "" ? (
								<Image
									src={"/service/u1.jpg"}
									alt={profileDetails?.name ?? "Mechanic"}
									width={300}
									height={300}
									className="h-48 w-full object-cover md:h-full md:w-48"
								/>
							) : (
								<Image
									src={profileDetails?.src ?? "/service/u1.jpg"}
									alt={profileDetails?.name ?? "Mechanic"}
									width={300}
									height={300}
									className="h-48 w-full object-cover md:h-full md:w-48"
								/>
							)}
						</div>
						<div className="p-8">
							<div className="uppercase tracking-wide text-sm text-gray-500 font-semibold">
								Expert {profileDetails?.service}
							</div>
							<h1 className="mt-2 text-3xl font-bold">
								{profileDetails?.name}
							</h1>
							<div className="mt-2 flex items-center">
								<span className="ml-1 text-gray-600">
									{Math.round(finalRate) ? 0 :Math.round(finalRate)} ({ratings.length} reviews)
								</span>
								<span className="text-yellow-400">★</span>
							</div>
							<p className="mt-2 text-gray-500">
								{profileDetails?.yearsOfExperience} years of experience
							</p>
						</div>
					</div>

					<div className="border-t border-gray-200">
						<nav className="flex">
							{Object.keys(tabContent).map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`flex-1 py-4 px-6 text-center font-medium ${
										activeTab === tab
											? "border-b-2 border-black text-black"
											: "text-gray-500 hover:text-black"
									} transition-colors`}
								>
									{tab.charAt(0).toUpperCase() + tab.slice(1)}
								</button>
							))}
						</nav>
					</div>

					<div className="p-8">
						{tabContent[activeTab as keyof typeof tabContent]}
					</div>

					{activeTab === "about" && (
						<div className="px-8 pb-8">
							<h2 className="text-xl font-bold mb-4">Specializations</h2>
							<div className="flex flex-wrap gap-2">
								<span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
									{profileDetails?.specialty}
								</span>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

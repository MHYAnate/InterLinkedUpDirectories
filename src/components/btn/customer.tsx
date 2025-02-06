// "use client";
// import { useForm } from "react-hook-form";
// import Firebase from "@/firebase/firebase";
// import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
// import { Services } from "@/database/data";
// import { StateData } from "@/database/stateData";
// import { useSearchParams } from "next/navigation";

// import { useAppSelector } from "@/lib/store/store";

// import React, { useState, useEffect } from "react";

// import favoriteVendorsSlice, {type FavoriteVendorValues} from "@/lib/store/features/favoriteVendorsSlice";
// import Loading from "../loading/loading";
// import { type ProfileValues } from '@/lib/store/features/profileSlice';

// interface Props{
// 	vendorData:ProfileValues
// 	clientId:string
// }

// const CustomerBtn: React.FC<Props>= (vendorData, clientId) => {

// 	const { favoriteVendors } = useAppSelector((state) => state.favoriteVendor);

// 	const { database } = Firebase;

// 	const [loader, setLoader] = useState(false);

// 	const [isDelete,setIsDelete] = useState(false)

// 	const [customerId ,setCustomerId ] = useState("")

// 	const [profileDetails, setProfileDetails] = useState<FavoriteVendorValues | null>(null);

// 	const {
// 		register,
// 		handleSubmit,
// 		watch
// 	} = useForm<FavoriteVendorValues>({
// 		defaultValues: {
// 			vendorName:"",
// 			vendorImg:"",
// 			vendorId:"",
// 			vendorCategory:"",
// 			vendorService:"",
// 			clientId:"",
// 			id:"",
// 			docId:"",
// 		},
// 		shouldUseNativeValidation: true,
// 		mode: "onChange",
// 	});

// 	const handleAddCustomer = async () => {
// 		try {
// 			const profileDetailRef = collection(database, `profile`);

// 			const docRef = await addDoc(profileDetailRef, {
// 				vendorName:vendorData.vendorData.name,
// 				vendorImg:vendorData.vendorData.src,
// 				vendorId:vendorData.vendorData.docid,
// 				vendorCategory:vendorData.vendorData.category,
// 				vendorService:vendorData.vendorData.service,
// 				clientId:clientId,
// 				id:"",
// 				docId:"",
// 			});
// 			const docId = docRef.id;
// 			setCustomerId(docId)
// 			setLoader(true);

// 			const setProfileDetailRef = collection(database, `profile`);

// 			await setDoc(
// 				doc(setProfileDetailRef, docId),
// 				{
// 					docId: docId,
// 				},
// 				{ merge: true }
// 			);

// 			setIsDelete(false);

// 			console.log("Profile detail added successfully");
// 		} catch (error) {
// 			console.error("Error adding profile detail:", error);
// 		}
// 	};

	
// 	useEffect(() => {
//     // Handle auth state changes
//     const vendorDetail = favoriteVendors.find(
//       (profile) => profile.vendorId.toLowerCase() === vendorData.vendorData.docid.toLowerCase()
//     );
//     setProfileDetails(vendorDetail ? vendorDetail : null);
    
//   }, [favoriteVendors, customerId]);

// 	const VendorsClientRef = collection(database, 'vendorsClient');

// 	const handleRemoveCustomer = async () => {
// 		try {
// 			await deleteDoc(doc(VendorsClientRef, profileDetails?.docId)).then(() => {
// 				setIsDelete(false);
				
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	const onCustomer = () => {
// 		handleAddCustomer();
// 	};

// 	const unCustomer = () => {
// 		handleRemoveCustomer();
// 	};


// 	return (
// 		<form onSubmit={handleSubmit(profileDetails?.docId !== null && profileDetails?.docId !== undefined && profileDetails?.docId !== "" ?onCustomer : unCustomer)} className="space-y-6">
// 			{!isDelete && <div className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
// 				{profileDetails?.docId !== null && profileDetails?.docId !== undefined && profileDetails?.docId !== "" ?"Add Customer":"Remove Customer"}
// 			</div> }
			
// 			{isDelete && <button
// 				type="submit"
// 				className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font- ${profileDetails?.docId !== null && profileDetails?.docId !== undefined && profileDetails?.docId !== "" ?"text-green-700":"text-red-700"}  bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
// 			>
				
// 				{profileDetails?.docId !== null && profileDetails?.docId !== undefined && profileDetails?.docId !== "" ?"Add Customer":"Remove Customer"}
				
// 			</button>}
			
// 		</form>
		
// 	);
// };

// CustomerBtn.displayName = "CustomerBtn";
// export default CustomerBtn;
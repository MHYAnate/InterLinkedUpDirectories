// Perform simple and compound queries in Cloud Firestore

// bookmark_border
// Cloud Firestore provides powerful query functionality for specifying which documents you want to retrieve from a collection or collection group. These queries can also be used with either get() or addSnapshotListener(), as described in Get Data and Get Realtime Updates.

// Example data
// To get started, write some data about cities so we can look at different ways to read it back:

"use client";
import {
	collection,
	collectionGroup,
	doc,
	setDoc,
	addDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

const citiesRef = collection(database, "cities");

export default function LogIn() {
	async function Update() {
		let error: any = null;

		try {
			await setDoc(doc(citiesRef, "SF"), {
				name: "San Francisco",
				state: "CA",
				country: "USA",
				capital: false,
				population: 860000,
				regions: ["west_coast", "norcal"],
			});
			await setDoc(doc(citiesRef, "LA"), {
				name: "Los Angeles",
				state: "CA",
				country: "USA",
				capital: false,
				population: 3900000,
				regions: ["west_coast", "socal"],
			});
			await setDoc(doc(citiesRef, "DC"), {
				name: "Washington, D.C.",
				state: null,
				country: "USA",
				capital: true,
				population: 680000,
				regions: ["east_coast"],
			});
			await setDoc(doc(citiesRef, "TOK"), {
				name: "Tokyo",
				state: null,
				country: "Japan",
				capital: true,
				population: 9000000,
				regions: ["kanto", "honshu"],
			});
			await setDoc(doc(citiesRef, "BJ"), {
				name: "Beijing",
				state: null,
				country: "China",
				capital: true,
				population: 21500000,
				regions: ["jingjinji", "hebei"],
			});
		} catch (e: any) {
			error = e;
		}
	}

	//     Simple queries
	// The following query returns all cities with state CA:

	// Create a reference to the cities collection

	const citiesRef = collection(database, "cities");

	// Create a query against the collection.
	const q = query(citiesRef, where("state", "==", "CA"));

	// The following query returns all the capital cities:

	const a = query(citiesRef, where("capital", "==", true));

	// Execute a query
	// After creating a query object, use the get() function to retrieve the results:

	const citiesWithCapital = query(
		collection(database, "cities"),
		where("capital", "==", true)
	);

	async function Initialized() {
		let error: any = null;

		try {
			const querySnapshot = await getDocs(citiesWithCapital);
			querySnapshot.forEach((doc: any) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		} catch (e: any) {
			error = e;
		}
	}

	//     Query operators
	// The where() method takes three parameters: a field to filter on, a comparison operator, and a value. Cloud Firestore supports the following comparison operators:

	{
		/* < less than
       <= less than or equal to
        == equal to
        > greater than
        >= greater than or equal to
        != not equal to
        array-contains
        array-contains-any
        in
        not-in */
	}

	// For example:

	const stateQuery = query(citiesRef, where("state", "==", "CA"));
	const populationQuery = query(citiesRef, where("population", "<", 100000));
	const nameQuery = query(citiesRef, where("name", ">=", "San Francisco"));

	// This query returns every city document where the capital field exists with a value other than false or null. This includes city documents where the capital field value equals true or any non-boolean value besides null.

	// This query does not return city documents where the capital field does not exist. Not-equal (!=) and not-in queries exclude documents where the given field does not exist.

	// A field exists when it's set to any value, including an empty string (""), null, and NaN (not a number). Note that null field values do not match != clauses, because x != null evaluates to undefined.

	// Warning: A != query clause might match many documents in a collection. To control the number of results returned, use a limit clause or paginate your query.

	//     Limitations
	//     Note the following limitations for != queries:

	//     Only documents where the given field exists can match the query.
	//     You can't combine not-in and != in a compound query.
	//      In a compound query, range (<, <=, >, >=) and not equals (!=, not-in) comparisons must all filter on the same field.

	// Array membership
	// You can use the array-contains operator to filter based on array values. For example:

	const westcoast = query(
		citiesRef,
		where("regions", "array-contains", "west_coast")
	);

	// This query returns every city document where the regions field is an array that contains west_coast. If the array has multiple instances of the value you query on, the document is included in the results only once.

	// You can use at most one array-contains clause per disjunction (or group). You can't combine array-contains with array-contains-any in the same disjunction.

	// in, not-in, and array-contains-any
	// Use the in operator to combine up to 30 equality (==) clauses on the same field with a logical OR. An in query returns documents where the given field matches any of the comparison values. For example:

	const usaJapan = query(citiesRef, where("country", "in", ["USA", "Japan"]));

	// This query returns every city document where the country field is set to USA or Japan. From the example data, this includes the SF, LA, DC, and TOK documents.

	//     not-in
	// Use the not-in operator to combine up to 10 not equal (!=) clauses on the same field with a logical AND. A not-in query returns documents where the given field exists, is not null, and does not match any of the comparison values. For example:

	const notInUsaJapan = query(
		citiesRef,
		where("country", "not-in", ["USA", "Japan"])
	);

	// This query returns every city document where the country field exists and is not set to USA, Japan, or null. From the example data, this includes the London and Hong Kong documents.

	// not-in queries exclude documents where the given field does not exist. A field exists when it's set to any value, including an empty string (""), null, and NaN (not a number). Note that x != null evaluates to undefined. A not-in query with null as one of the comparison values does not match any documents.

	// Warning: A not-in query clause might match many documents in a collection. To control the number of results returned, use a limit clause or paginate your query.

	// array-contains-any
	// Use the array-contains-any operator to combine up to 30 array-contains clauses on the same field with a logical OR. An array-contains-any query returns documents where the given field is an array that contains one or more of the comparison values:

	const coast = query(
		citiesRef,
		where("regions", "array-contains-any", ["west_coast", "east_coast"])
	);

	//   This query returns every city document where the regions field is an array that contains west_coast or east_coast. From the example data, this includes the SF, LA, and DC documents.

	// Results from array-contains-any are de-duped. Even if a document's array field matches more than one of the comparison values, the result set includes that document only once.

	// array-contains-any always filters by the array data type. For example, the query above would not return a city document where instead of an array, the regions field is the string west_coast.

	// You can use an array value as a comparison value for in, but unlike array-contains-any, the clause matches for an exact match of array length, order, and values. For example:

	const region = query(
		citiesRef,
		where("regions", "in", [["west_coast"], ["east_coast"]])
	);

	// This query returns every city document where the regions field is an array that contains exactly one element of either west_coast or east_coast. From the example data, only the DC document qualifies with its regions field of ["east_coast"]. The SF document, however, does not match because its regions field is ["west_coast", "norcal"].

	// Limitations
	// Note the following limitations for in, not-in, and array-contains-any:

	// Cloud Firestore provides support for logical OR queries through the or, in, and array-contains-any operators. These queries are limited to 30 disjunctions based on the query's disjunctive normal form.
	// You can use at most one array-contains clause per disjunction (or group). You can't combine array-contains with array-contains-any in the same disjunction.
	// You can't combine not-in with not equals !=.
	// not-in supports up to 10 comparison values.

	//     Compound (AND) queries
	// You can combine constraints with a logical AND by chaining multiple equality operators (== or array-contains). However, you must create a composite index to combine equality operators with the inequality operators, <, <=, >, and !=.

	const q1 = query(
		citiesRef,
		where("state", "==", "CO"),
		where("name", "==", "Denver")
	);
	const q2 = query(
		citiesRef,
		where("state", "==", "CA"),
		where("population", "<", 1000000)
	);

	// You can perform range (<, <=, >, >=) or not equals (!=) comparisons only on a single field, and you can include at most one array-contains or array-contains-any clause in a compound query:

	// Valid: Range filters on only one field

	const q3 = query(
		citiesRef,
		where("state", ">=", "CA"),
		where("state", "<=", "IN")
	);
	const q4 = query(
		citiesRef,
		where("state", "==", "CA"),
		where("population", ">", 1000000)
	);

	// Invalid: Range filters on different fields

	const q5 = query(
		citiesRef,
		where("state", ">=", "CA"),
		where("population", ">", 100000)
	);

	// Collection group queries
	// A collection group consists of all collections with the same ID. By default, queries retrieve results from a single collection in your database. Use a collection group query to retrieve documents from a collection group instead of from a single collection.

	// For example, you can create a landmarks collection group by adding a landmarks subcollection to each city:

	async function Another() {
		let error: any = null;

		try {
			await Promise.all([
				addDoc(collection(citiesRef, "SF", "landmarks"), {
					name: "Golden Gate Bridge",
					type: "bridge",
				}),
				addDoc(collection(citiesRef, "SF", "landmarks"), {
					name: "Legion of Honor",
					type: "museum",
				}),
				addDoc(collection(citiesRef, "LA", "landmarks"), {
					name: "Griffith Park",
					type: "park",
				}),
				addDoc(collection(citiesRef, "LA", "landmarks"), {
					name: "The Getty",
					type: "museum",
				}),
				addDoc(collection(citiesRef, "DC", "landmarks"), {
					name: "Lincoln Memorial",
					type: "memorial",
				}),
				addDoc(collection(citiesRef, "DC", "landmarks"), {
					name: "National Air and Space Museum",
					type: "museum",
				}),
				addDoc(collection(citiesRef, "TOK", "landmarks"), {
					name: "Ueno Park",
					type: "park",
				}),
				addDoc(collection(citiesRef, "TOK", "landmarks"), {
					name: "National Museum of Nature and Science",
					type: "museum",
				}),
				addDoc(collection(citiesRef, "BJ", "landmarks"), {
					name: "Jingshan Park",
					type: "park",
				}),
				addDoc(collection(citiesRef, "BJ", "landmarks"), {
					name: "Beijing Ancient Observatory",
					type: "museum",
				}),
			]);
		} catch (e: any) {
			error = e;
		}
	}

	// We can use the simple and compound query described earlier to query a single city's landmarks subcollection, but you might also want to retrieve results from every city's landmarks subcollection at once.

	// The landmarks collection group consists of all collections with the ID landmarks, and you can query it using a collection group query. For example, this collection group query retrieves all museum landmarks across all cities:

	const museums = query(
		collectionGroup(database, "landmarks"),
		where("type", "==", "museum")
	);

	async function museum() {
		let error: any = null;

		try {
			const querySnapshot = await getDocs(museums);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			});
		} catch (e: any) {
			error = e;
		}
	}

	//     Before using a collection group query, you must create an index that supports your collection group query. You can create an index through an error message, the console, or the Firebase CLI.

	// For the web and mobile SDKs, you must also create rules that allow your collection group queries.

	// Query limitations
	// The following list summarizes Cloud Firestore query limitations:

	// Cloud Firestore provides support for logical OR queries through the or, in, and array-contains-any operators. These queries are limited to 30 disjunctions based on the query's disjunctive normal form.
	// In a compound query, range (<, <=, >, >=) and not equals (!=, not-in) comparisons must all filter on the same field.
	// You can use at most one array-contains clause per disjunction (or group). You can't combine array-contains with array-contains-any in the same disjunction.
	// You can't combine not-in with in, array-contains-any, or or in the same query.
	// Only a single not-in or !=` is allowed per query.
	// not-in supports up to 10 comparison values.
	// The sum of filters, sort orders, and parent document path (1 for a subcollection, 0 for a root collection) in a query cannot exceed 100. This is calculated based on the disjunctive normal form of the query.
	// A query with an inequality filter on a field implies ordering by that field and filters for existence of that field.
	// Limits on OR queries
	// To prevent a query from becoming too computationally expensive, Cloud Firestore limits how many AND and OR clauses you can combine. To apply this limit, Cloud Firestore converts queries that perform logical OR operations (or, in, and array-contains-any) to disjunctive normal form (also known as an OR of ANDs). Cloud Firestore limits a query to a maximum of 30 disjunctions in disjunctive normal form.

	//     Disjunctive normal form
	// Cloud Firestore converts queries to disjunctive normal form by applying two rules:

	// Flatten

	// Given conditions A, B, and C:

	// A and (B and C) => A and B and C

	// Distributive Law

	// Given conditions A, B, C, and D:

	// A and (B or C) => (A and B) or (A and C)
	// (A or B) and (C or D) => (A and C) or (A and D) or (B and C) or (B and D)
	// When applying these rules to in and array-contains-any queries, remember that these operators are shorthands for OR. For example, a in [1,2] is shorthand for a = 1 OR a = 2.

	// Warning: Due to the multiplicative nature of conversions to disjunctive normal form, you are more likely to reach the limit when performing an AND of multiple OR groups.

	// The following examples show the number of disjunctions for different queries:

	// Query	Number of disjunctions
	// query(collectionRef, where("a", "==", 1))

	// 1
	// query(collectionRef, or( where("a", "==", 1), where("b", "==", 2) ))

	// 2
	// query(collectionRef,
	//         or( and( where("a", "==", 1), where("c", "==", 3) ),
	//             and( where("a", "==", 1), where("d", "==", 4) ),
	//             and( where("b", "==", 2), where("c", "==", 3) ),
	//             and( where("b", "==", 2), where("d", "==", 4) )
	//         )
	//       )

	// 4
	// query(collectionRef,
	//         and( or( where("a", "==", 1), where("b", "==", 2) ),
	//              or( where("c", "==", 3), where("d", "==", 4) )
	//         )
	//       )

	// 4

	// The disjunctive normal form of this query is equal to the query above.

	// query(collectionRef, where("a", "in", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) )

	// 10
	// query(collectionRef,
	//         and( where("a", "in", [1, 2, 3, 4, 5]),
	//              where("b", "in", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	//         )
	//       )

	// 50

	// This query returns an error, because it surpasses the limit of 30 disjunctions.

	// query(collectionRef,
	//         or( where("a", "in", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
	//             where("b", "in", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	//         )
	//       )

	// 20
	// query(collectionRef,
	//         and( where("a", "in", [1, 2, 3, 4, 5]),
	//              or( where("b", "==", 2),
	//                  where("c", "==", 3)
	//              )
	//         )
	//       )

	// 10

	// orderBy and existence
	// When you order a query by a given field, the query can return only the documents where the order-by field exists.

	// For example, the following query would not return any documents where the population field is not set, even if they otherwise meet the query filters.

	// database.collection("cities").whereEqualTo("country", “USA”).orderBy(“population”);

	// A related effect applies to inequalities. A query with an inequality filter on a field also implies ordering by that field. The following query does not return documents without a population field even if country = USA in that document . As a workaround, you can execute separate queries for each ordering or you can assign a value for all fields that you order by.

	// Java

	// db.collection(“cities”).where(or(“country”, USA”), greaterThan(“population”, 250000));
	// The query above includes an implied order-by on the inequality and is equivalent to the following:

	// Java

	// db.collection(“cities”).where(or(“country”, USA”), greaterThan(“population”, 250000)).orderBy(“population”);



// 	const retrievedData: FormValue[] = []; // Array to store retrieved data

// for (const doc of querySnapshot.docs) {
//   const documentData = doc.data() as FormValue;
//   retrievedData.push(documentData);
// }

// setProfileDetails(retrievedData); // Update state with array of data

// const handleUpload = async (data: FormValue) => {
//   try {
//     const fileInput = fileInputRef.current;
//     if (fileInput && fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];

//       // Reference to the root of the default Firebase Storage bucket
//       const imageRef = ref(storage, `image/${data.email}`);

//       // Upload the file and get the download URL
//       const uploadTask = uploadBytes(imageRef, file);
//       const snapshot = await uploadTask;
//       const downloadURL = await getDownloadURL(snapshot.ref);

//       // Use the downloadURL to populate your TSX
//       console.log("Image uploaded successfully:", downloadURL);
//       // Update state or perform actions with the image URL
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };



	return <div>query</div>;
}

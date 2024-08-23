// Paginate data with query cursors 

// bookmark_border

// With query cursors in Cloud Firestore, you can split data returned by a query into batches according to the parameters you define in your query.

// Query cursors define the start and end points for a query, allowing you to:

// Return a subset of the data.
// Paginate query results.
// However, to define a specific range for a query, you should use the where() method described in Simple Queries.

// Add a simple cursor to a query
// Use the startAt() or startAfter() methods to define the start point for a query. The startAt() method includes the start point, while the startAfter() method excludes it.

// For example, if you use startAt(A) in a query, it returns the entire alphabet. If you use startAfter(A) instead, it returns B-Z.

// Web
// Web
// Swift
// Objective-C
// Kotlin+KTX
// Java
// Dart
// Python
// More
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { query, orderBy, startAt } from "firebase/firestore";  

// const q = query(citiesRef, orderBy("population"), startAt(1000000));
// Similarly, use the endAt() or endBefore() methods to define an end point for your query results.

// Web
// Web
// Swift
// Objective-C
// Kotlin+KTX
// Java
// Dart
// Java
// Go
// More
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { query, orderBy, endAt } from "firebase/firestore";  

// const q = query(citiesRef, orderBy("population"), endAt(1000000));
// Use a document snapshot to define the query cursor
// You can also pass a document snapshot to the cursor clause as the start or end point of the query cursor. The values in the document snapshot serve as the values in the query cursor.

// For example, take a snapshot of a "San Francisco" document in your data set of cities and populations. Then, use that document snapshot as the start point for your population query cursor. Your query will return all the cities with a population larger than or equal to San Francisco's, as defined in the document snapshot.

// Web
// Web
// Swift
// Objective-C
// Kotlin+KTX
// Java
// Dart
// Java
// Go
// More
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { collection, doc, getDoc, query, orderBy, startAt } from "firebase/firestore";  
// const citiesRef = collection(db, "cities");

// const docSnap = await getDoc(doc(citiesRef, "SF"));

// // Get all cities with a population bigger than San Francisco
// const biggerThanSf = query(citiesRef, orderBy("population"), startAt(docSnap));
// // ...
// Paginate a query
// Paginate queries by combining query cursors with the limit() method. For example, use the last document in a batch as the start of a cursor for the next batch.

// Web
// Web
// Swift
// Objective-C
// Kotlin+KTX
// Java
// Dart
// Java
// Go
// More
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  

// // Query the first page of docs
// const first = query(collection(db, "cities"), orderBy("population"), limit(25));
// const documentSnapshots = await getDocs(first);

// // Get the last visible document
// const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
// console.log("last", lastVisible);

// // Construct a new query starting at this document,
// // get the next 25 cities.
// const next = query(collection(db, "cities"),
//     orderBy("population"),
//     startAfter(lastVisible),
//     limit(25));
// Set cursor based on multiple fields
// When using a cursor based on a field value (not a DocumentSnapshot), you can make the cursor position more precise by adding additional fields. This is particularly useful if your data set includes multiple documents that all have the same value for your cursor field, making the cursor's position ambiguous. You can add additional field values to your cursor to further specify the start or end point and reduce ambiguity.

// For example, in a data set containing all the cities named "Springfield" in the United States, there would be multiple start points for a query set to start at "Springfield":

// Cities
// Name	State
// Springfield	Massachusetts
// Springfield	Missouri
// Springfield	Wisconsin
// To start at a specific Springfield, you could add the state as a secondary condition in your cursor clause.

// Web
// Web
// Swift
// Objective-C
// Kotlin+KTX
// Java
// Dart
// Java
// Go
// More
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// // Will return all Springfields
// import { collection, query, orderBy, startAt } from "firebase/firestore";  
// const q1 = query(collection(db, "cities"),
//    orderBy("name"),
//    orderBy("state"),
//    startAt("Springfield"));

// // Will return "Springfield, Missouri" and "Springfield, Wisconsin"
// const q2 = query(collection(db, "cities"),
//    orderBy("name"),
//    orderBy("state"),
//    startAt("Springfield", "Missouri"));
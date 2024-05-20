// The following examples demonstrate how to delete documents, fields, and collections.

// Delete documents
// To delete a document, use the following language-specific delete() methods:






// import { doc, deleteDoc } from "firebase/firestore";

// await deleteDoc(doc(db, "cities", "DC"));






// Warning: Deleting a document does not delete its subcollections!
// When you delete a document, Cloud Firestore does not automatically delete the documents within its subcollections. You can still access the subcollection documents by reference. For example, you can access the document at path /mycoll/mydoc/mysubcoll/mysubdoc even if you delete the ancestor document at /mycoll/mydoc.

// Non-existent ancestor documents appear in the console, but they do not appear in query results and snapshots.

// If you want to delete a document and all the documents within its subcollections, you must do so manually. For more information, see Delete Collections.

// Delete fields
// To delete specific fields from a document, use the following language-specific FieldValue.delete() methods when you update a document:




// import { doc, updateDoc, deleteField } from "firebase/firestore";

// const cityRef = doc(db, 'cities', 'BJ');

// // Remove the 'capital' field from the document
// await updateDoc(cityRef, {
//     capital: deleteField()
// });




// Delete collections
// To delete an entire collection or subcollection in Cloud Firestore, retrieve (read) all the documents within the collection or subcollection and delete them. This process incurs both read and delete costs. If you have larger collections, you may want to delete the documents in smaller batches to avoid out-of-memory errors. Repeat the process until you've deleted the entire collection or subcollection.

// Deleting a collection requires coordinating an unbounded number of individual delete requests. If you need to delete entire collections, do so only from a trusted server environment. While it is possible to delete a collection from a mobile/web client, doing so has negative security and performance implications.

// The snippets below are somewhat simplified and do not deal with error handling, security, deleting subcollections, or maximizing performance. To learn more about one recommended approach to deleting collections in production, see Deleting Collections and Subcollections.

// Delete files with Cloud Storage on Web 

// bookmark_border
// After uploading files to Cloud Storage, you can also delete them.

// Note: By default, a Cloud Storage bucket requires Firebase Authentication to perform any action on the bucket's data or files. You can change your Firebase Security Rules for Cloud Storage to allow unauthenticated access. Since Firebase and your project's default App Engine app share this bucket, configuring public access may make newly uploaded App Engine files publicly accessible, as well. Be sure to restrict access to your Cloud Storage bucket again when you set up Authentication.
// Delete a File
// To delete a file, first create a reference to that file. Then call the delete() method on that reference, which returns a Promise that resolves, or an error if the Promise rejects.

import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, 'images/desert.jpg');

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
});


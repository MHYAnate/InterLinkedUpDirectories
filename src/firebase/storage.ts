// Upload Files
// To upload a file to Cloud Storage, you first create a reference to the full path of the file, including the file name.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref } from "firebase/storage";

// // Create a root reference
// const storage = getStorage();

// // Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, 'mountains.jpg');

// // Create a reference to 'images/mountains.jpg'
// const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
// Upload from a Blob or File
// Once you've created an appropriate reference, you then call the uploadBytes() method. uploadBytes() takes files via the JavaScript File and Blob APIs and uploads them to Cloud Storage.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });
// Upload from a Byte Array
// In addition to the File and Blob types, uploadBytes() can also upload a Uint8Array to Cloud Storage.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
// uploadBytes(storageRef, bytes).then((snapshot) => {
//   console.log('Uploaded an array!');
// });
// Upload from a String
// If a Blob, File, or Uint8Array isn't available, you can use the uploadString() method to upload a raw, base64, base64url, or data_url encoded string to Cloud Storage.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadString } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// // Raw string is the default if no format is provided
// const message = 'This is my message.';
// uploadString(storageRef, message).then((snapshot) => {
//   console.log('Uploaded a raw string!');
// });

// // Base64 formatted string
// const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
// uploadString(storageRef, message2, 'base64').then((snapshot) => {
//   console.log('Uploaded a base64 string!');
// });

// // Base64url formatted string
// const message3 = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
// uploadString(storageRef, message3, 'base64url').then((snapshot) => {
//   console.log('Uploaded a base64url string!');
// });

// // Data URL string
// const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
// uploadString(storageRef, message4, 'data_url').then((snapshot) => {
//   console.log('Uploaded a data_url string!');
// });
// Since the reference defines the full path to the file, make sure that you are uploading to a non-empty path.

// Add File Metadata
// When uploading a file, you can also specify metadata for that file. This metadata contains typical file metadata properties such as name, size, and contentType (commonly referred to as MIME type). Cloud Storage automatically infers the content type from the file extension where the file is stored on disk, but if you specify a contentType in the metadata it will override the auto-detected type. If no contentType metadata is specified and the file doesn't have a file extension, Cloud Storage defaults to the type application/octet-stream. More information on file metadata can be found in the Use File Metadata section.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'images/mountains.jpg');

// // Create file metadata including the content type
// /** @type {any} */
// const metadata = {
//   contentType: 'image/jpeg',
// };

// // Upload the file and metadata
// const uploadTask = uploadBytes(storageRef, file, metadata);
// Manage Uploads
// In addition to starting uploads, you can pause, resume, and cancel uploads using the pause(), resume(), and cancel() methods. Calling pause() or resume() will raise pause or running state changes. Calling the cancel() method results in the upload failing and returning an error indicating that the upload was canceled.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'images/mountains.jpg');

// // Upload the file and metadata
// const uploadTask = uploadBytesResumable(storageRef, file);

// // Pause the upload
// uploadTask.pause();

// // Resume the upload
// uploadTask.resume();

// // Cancel the upload
// uploadTask.cancel();
// Monitor Upload Progress
// While uploading, the upload task may raise progress events in the state_changed observer, such as:

// Event Type	Typical Usage
// running	This event fires when the task starts or resumes uploading, and is often used in conjunction with the pause event. For larger uploads this event may fire multiple times as a progress update.
// pause	This event fires any time the upload is paused, and is often used in conjunction with the running event.
// When an event occurs, a TaskSnapshot object is passed back. This snapshot is an immutable view of the task at the time the event occurred. This object contains the following properties:

// Property	Type	Description
// bytesTransferred	Number	The total number of bytes that have been transferred when this snapshot was taken.
// totalBytes	Number	The total number of bytes expected to be uploaded.
// state	firebase.storage.TaskState	Current state of the upload.
// metadata	firebaseStorage.Metadata	Before upload completes, the metadata sent to the server. After upload completes, the metadata the server sent back.
// task	firebaseStorage.UploadTask	The task this is a snapshot of, which can be used to `pause`, `resume`, or `cancel` the task.
// ref	firebaseStorage.Reference	The reference this task came from.
// These changes in state, combined with the properties of the TaskSnapshot provide a simple yet powerful way to monitor upload events.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'images/rivers.jpg');

// const uploadTask = uploadBytesResumable(storageRef, file);

// // Register three observers:
// // 1. 'state_changed' observer, called any time the state changes
// // 2. Error observer, called on failure
// // 3. Completion observer, called on successful completion
// uploadTask.on('state_changed', 
//   (snapshot) => {
//     // Observe state change events such as progress, pause, and resume
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// );
// Error Handling
// There are a number of reasons why errors may occur on upload, including the local file not existing, or the user not having permission to upload the desired file. More information on errors can be found in the Handle Errors section of the docs.

// Full Example
// A full example of an upload with progress monitoring and error handling is shown below:

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const storage = getStorage();

// // Create the file metadata
// /** @type {any} */
// const metadata = {
//   contentType: 'image/jpeg'
// };

// // Upload file and metadata to the object 'images/mountains.jpg'
// const storageRef = ref(storage, 'images/' + file.name);
// const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on('state_changed',
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//     }
//   }, 
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// );



















// Download files with Cloud Storage on Web 

// bookmark_border
// Cloud Storage for Firebase allows you to quickly and easily download files from a Cloud Storage bucket provided and managed by Firebase.

// Note: By default, a Cloud Storage bucket requires Firebase Authentication to perform any action on the bucket's data or files. You can change your Firebase Security Rules for Cloud Storage to allow unauthenticated access. Since Firebase and your project's default App Engine app share this bucket, configuring public access may make newly uploaded App Engine files publicly accessible, as well. Be sure to restrict access to your Cloud Storage bucket again when you set up Authentication.
// Create a Reference
// To download a file, first create a Cloud Storage reference to the file you want to download.

// You can create a reference by appending child paths to the root of your Cloud Storage bucket, or you can create a reference from an existing gs:// or https:// URL referencing an object in Cloud Storage.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref } from "firebase/storage";

// // Create a reference with an initial file path and name
// const storage = getStorage();
// const pathReference = ref(storage, 'images/stars.jpg');

// // Create a reference from a Google Cloud Storage URI
// const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');

// // Create a reference from an HTTPS URL
// // Note that in the URL, characters are URL escaped!
// const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  
// Download Data via URL
// You can get the download URL for a file by calling the getDownloadURL() method on a Cloud Storage reference.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// const storage = getStorage();
// getDownloadURL(ref(storage, 'images/stars.jpg'))
//   .then((url) => {
//     // `url` is the download URL for 'images/stars.jpg'

//     // This can be downloaded directly:
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//       const blob = xhr.response;
//     };
//     xhr.open('GET', url);
//     xhr.send();

//     // Or inserted into an <img> element
//     const img = document.getElementById('myimg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     // Handle any errors
//   });
// Download Data Directly from the SDK
// From version 9.5 and higher, the SDK provides these functions for direct download:

// getBlob()
// getBytes()
// getStream()
// Using these functions, you can bypass downloading from a URL, and instead return data in your code. This allows for finer-grained access control via Firebase Security Rules.

// Note: getStream() is available only for Node.js, and getBlob() is available only for browser-like environments.
// CORS Configuration
// To download data directly in the browser, you must configure your Cloud Storage bucket for cross-origin access (CORS). This can be done with the gsutil command line tool, which you can install from here.

// If you don't want any domain-based restrictions (the most common scenario), copy this JSON to a file named cors.json:


// [
//   {
//     "origin": ["*"],
//     "method": ["GET"],
//     "maxAgeSeconds": 3600
//   }
// ]
// Run gsutil cors set cors.json gs://<your-cloud-storage-bucket> to deploy these restrictions.

// For more information, refer to the Google Cloud Storage documentation.

// Handle Errors
// There are a number of reasons why errors may occur on download, including the file not existing, or the user not having permission to access the desired file. More information on errors can be found in the Handle Errors section of the docs.

// Full Example
// A full example of a download with error handling is shown below:

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// // Create a reference to the file we want to download
// const storage = getStorage();
// const starsRef = ref(storage, 'images/stars.jpg');

// // Get the download URL
// getDownloadURL(starsRef)
//   .then((url) => {
//     // Insert url into an <img> tag to "download"
//   })
//   .catch((error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/object-not-found':
//         // File doesn't exist
//         break;
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect the server response
//         break;
//     }
//   });

















// Delete a File
// To delete a file, first create a reference to that file. Then call the delete() method on that reference, which returns a Promise that resolves, or an error if the Promise rejects.

// Web modular API
// Web namespaced API
// Learn more about the tree-shakeable modular Web API and upgrade from the namespaced API.

// import { getStorage, ref, deleteObject } from "firebase/storage";

// const storage = getStorage();

// // Create a reference to the file to delete
// const desertRef = ref(storage, 'images/desert.jpg');

// // Delete the file
// deleteObject(desertRef).then(() => {
//   // File deleted successfully
// }).catch((error) => {
//   // Uh-oh, an error occurred!
// });
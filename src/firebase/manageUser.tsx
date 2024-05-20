import { getAuth, onAuthStateChanged, updateProfile, updateEmail , sendEmailVerification , updatePassword , sendPasswordResetEmail , deleteUser, reauthenticateWithCredential,  AuthCredential } from "firebase/auth"; 

export default function LogIn() {
	// Get the currently signed-in user
	// The recommended way to get the current user is by setting an observer on the Auth object:

	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			// ...
		} else {
			// User is signed out
			// ...
		}
	});

	//   By using an observer, you ensure that the Auth object isn't in an intermediate state—such as initialization—when you get the current user. When you use signInWithRedirect, the onAuthStateChanged observer waits until getRedirectResult resolves before triggering.

	// You can also get the currently signed-in user by using the currentUser property. If a user isn't signed in, currentUser is null:

  // Note: currentUser might also be null because the auth object has not finished initializing. If you use an observer to keep track of the user's sign-in status, you don't need to handle this case

	const user = auth.currentUser;

	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		// ...
	} else {
		// No user is signed in.
	}


//   Get a user's profile
// To get a user's profile information, use the properties of an instance of User. For example:

// Important: Be careful when setting (and later displaying) potentially user-facing UI values like displayName and photoURL. The API does not filter the values to prevent potential XSS-type attacks.
;

 if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}

// Get a user's provider-specific profile information
// To get the profile information retrieved from the sign-in providers linked to a user, use the providerData property. For example:
 


if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}

// Update a user's profile
// You can update a user's basic profile information—the user's display name and profile photo URL—with the updateProfile method. For example:

if (user !== null) {
updateProfile(user , {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
}


// Set a user's email address
// You can set a user's email address with the updateEmail method. For example:

if (user) {
updateEmail(user , "user@example.com").then(() => {
  // Email updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
}

// Send a user a verification email
// You can send an address verification email to a user with the sendEmailVerification method. For example:

if (user !== null) {

sendEmailVerification(user)
  .then(() => {
    // Email verification sent!
    // ...
  });
}

// Set a user's password
// You can set a user's password with the updatePassword method. For example:


const newPassword = "password";
if (user !== null) {
updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});
}

// Send a password reset email
// You can send a password reset email to a user with the sendPasswordResetEmail method. For example:


sendPasswordResetEmail(auth, "email@gmail.com")
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

//   Delete a user
// You can delete a user account with the delete method. For example:


if (user !== null) {
deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
}

// Re-authenticate a user
// Some security-sensitive actions—such as deleting an account, setting a primary email address, and changing a password—require that the user has recently signed in. If you perform one of these actions, and the user signed in too long ago, the action fails with an error. When this happens, re-authenticate the user by getting new sign-in credentials from the user and passing the credentials to reauthenticateWithCredential. For example:





// TODO(you): prompt the user to re-provide their sign-in credentials
const credential: AuthCredential = {
  providerId: 'providerIdHere',
  signInMethod: 'signInMethodHere',
  toJSON: function (): object {
    throw new Error("Function not implemented.");
  }
};

if (user !== null) {
reauthenticateWithCredential(user, credential).then(() => {
  // User re-authenticated.
}).catch((error) => {
  // An error ocurred
  // ...
});
}










	// // async function SignUp(data: FormValue) {
	// // 	let result: any = null;
	// // 	let error: any = null;

	// // 	try {
	// // 		result = await createUserWithEmailAndPassword(
	// // 			auth,
	// // 			data.email,
	// // 			data.passCode0
	// // 		);
	// // 		const user = result.user;

	// // 		await updateProfile(user, {
	// // 			displayName: `${data.name}`,
	// // 			photoURL: `image/${data.email}`,
	// // 		});

	// // 		await updateEmail(user, `${data.email}`);

	// // 		await sendEmailVerification(user);

	// // 		router.push(`/profile/${data.email}`);
	// // 	} catch (e: any) {
	// // 		error = e;
	// // 	}

	// // 	return { result, error };
	// // }

	// // // const fileInputRef = useRef<HTMLInputElement>(null); // Ref for accessing the file input element

	// const handleUpload = (data: FormValue) => {
	// 	const fileInput = fileInputRef.current;
	// 	if (fileInput && fileInput.files && fileInput.files.length > 0) {
	// 		const file = fileInput.files[0]; // Get the first selected file

	// 		// Reference to the root of the default Firebase Storage bucket
	// 		const imageRef = ref(storage, `image/${data.email}`);

	// 		// Upload the file
	// 		uploadBytes(imageRef, file)
	// 			.then((snapshot) => {})
	// 			.catch((error) => {
	// 				console.error(error); // Handle any errors
	// 			});

	// 		getDownloadURL(imageRef).then((url) => {
	// 			setImageUrl(url);
	// 		});
	// 	}
	// };




	return <div>test</div>;
}



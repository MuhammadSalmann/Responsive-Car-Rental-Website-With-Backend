// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcYB25IWFqY0_1x-jVu04Pl3WB_bitUD4",
  authDomain: "dbproject-acc9f.firebaseapp.com",
  databaseURL: "https://dbproject-acc9f-default-rtdb.firebaseio.com",
  projectId: "dbproject-acc9f",
  storageBucket: "dbproject-acc9f.appspot.com",
  messagingSenderId: "1086936574072",
  appId: "1:1086936574072:web:23dc76c407c90b090f258d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
// Setting date in our format
const currentDateTime = new Date();
const formattedDateTime = currentDateTime.toLocaleString(); // Format based on user's locale

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  password2 = document.getElementById('password2').value
  telephone = document.getElementById('telephone').value
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false || validate_field(password2) == false) {
    alert('Email or Password is missing')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('Name Field is missing')
    return
  }
  if (validate_field(telephone) == false) {
    alert('Contact Field is missing')
    return
  }
  if (password !== password2) {
    alert('Both Passwords Do not Match')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      Contact_Number : telephone,
      last_login : formattedDateTime
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)
    // We cant redirect directly so using then fuction
    .then(function() {
      // Data saved successfully, proceed with redirection
      alert('Account Successfully Created!!')
      window.location.href = "signin.html"
    })
    .catch(function(error) {
      // Handle error while saving data to Firebase Database
      alert("Error saving data: " + error.message)
    })
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is missing')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : formattedDateTime
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // Retrieve user's data from Firebase Database
    database_ref.child('users/' + user.uid).once('value')
    .then(function(snapshot) {
        var userData = snapshot.val()
        var userName = userData.full_name
        // DOne
        alert('Welcome back ' + userName)
        localStorage.setItem('isLoggedIn', true);
        // to show msg on main screen that user logged in
        var encodedUserName = encodeURIComponent(userName);
        // sending additonal data like username and alert msg
        window.location.href = "../index.html?userName=" + encodedUserName;
        console.log("Redirecting to Main Page");
    })
    .catch(function(error) {
    console.log("Error retrieving user data:", error)
    })
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
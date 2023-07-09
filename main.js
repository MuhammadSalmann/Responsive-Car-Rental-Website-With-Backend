// Giving Navbar button Functionality
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// For Scroll Reveal Animation
const sr = ScrollReveal ({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal('.text', {delay: 100, origin: 'top'})
sr.reveal('.form-container form', {delay: 100, origin: 'left'})
sr.reveal('.heading', {delay: 100, origin: 'top'})
sr.reveal('.ride-container .box', {delay: 100, origin: 'top'})
sr.reveal('.services-container .box', {delay: 100, origin: 'top'})
sr.reveal('.about-container .box', {delay: 100, origin: 'top'})
sr.reveal('.reviews-container', {delay: 100, origin: 'top'})
sr.reveal('.feedback .box', {delay: 100, origin: 'bottom'})
//*************************ANIMATIONS COMPLETE**************************************

// Changing Sign in to Sign out
// Retrieve the login status from local storage
//var carName;
const isLoggedIn = localStorage.getItem('isLoggedIn');

// Getting buttons from index.html
const signInButton = document.querySelector('.sign-in');
const signOutButton = document.querySelector('.sign-out');
const SubmitButton = document.querySelector('.Submitbtn');
const FeedbackButton = document.querySelector('.Submitbtn2');

//Getting Car buttons
car1 = document.querySelector('#c1');
car2 = document.querySelector('#c2');
car3 = document.querySelector('#c3');
car4 = document.querySelector('#c4');
car5 = document.querySelector('#c5');
car6 = document.querySelector('#c6');

// Check the login status and update the buttons
if (isLoggedIn) {
  // User is logged in, show the sign-out button and hide the sign-in button
  signInButton.style.display = 'none';
  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Check if the userName parameter exists in the URL
  if (urlParams.has("userName")) {
    // Retrieve the value of the userName parameter
    const encodedUserName = urlParams.get("userName");
  
    // Decode the userName value
    userName = decodeURIComponent(encodedUserName);

    // Save the userName in local storage(Alternate to uri storing)
    localStorage.setItem('userName', userName);   // so that userName is not lost after reloading the page
  
    // Now you can use the userName variable in your code
    alert("Welcome, " + userName + "!");
  } 
} else {
  // User is not logged in, show the sign-in button and hide the sign-out button
  signOutButton.style.display = 'none';
  }

// Add event listener to the sign-out button
signOutButton.addEventListener('click', function() {
  // Perform sign-out functionality here

  // Update the login status in the local storage
  localStorage.removeItem('isLoggedIn');

  // Redirect the user to the main website
  window.location.href = "index.html?Note= Logged Out ";
});

// Getting Cars Data
c1.addEventListener('click', function() {
  if(isLoggedIn) {
    carName = '2020 Honda BR-V'
    var encodedcarName = encodeURIComponent(carName);
    // sending additonal data like carName and alert msg
    window.location.href = "../index.html?carName=" + encodedcarName;
  } else {
    alert("You are not Logged In");
  }
})
c2.addEventListener('click', function() {
  if(isLoggedIn) {
    carName = '2019 Honda Civic TypeR'
    var encodedcarName = encodeURIComponent(carName);
    // sending additonal data like carName and alert msg
    window.location.href = "../index.html?carName=" + encodedcarName;
  } else {
    alert("You are not Logged In");
  }
})
c3.addEventListener('click', function() {
  if(isLoggedIn) {
    carName = '2020 Honda Civic'
    var encodedcarName = encodeURIComponent(carName);
    // sending additonal data like carName and alert msg
    window.location.href = "../index.html?carName=" + encodedcarName;
  } else {
    alert("You are not Logged In");
  }
})
c4.addEventListener('click', function() {
  if(isLoggedIn) {
    carName = '2018 Honda Civic'
    var encodedcarName = encodeURIComponent(carName);
    // sending additonal data like carName and alert msg
    window.location.href = "../index.html?carName=" + encodedcarName;
  } else {
    alert("You are not Logged In");
  }
})
c5.addEventListener('click', function() {
  if(isLoggedIn) {
    carName = '2020 Honda Accord'
    var encodedcarName = encodeURIComponent(carName);
    // sending additonal data like carName and alert msg
    window.location.href = "../index.html?carName=" + encodedcarName;
  } else {
    alert("You are not Logged In");
  }
})
c6.addEventListener('click', function() {
  if(isLoggedIn) {
    carName = '2021 Porsche CaymanS'
    var encodedcarName = encodeURIComponent(carName);
    // sending additonal data like carName and alert msg
    window.location.href = "../index.html?carName=" + encodedcarName;
  } else {
    alert("You are not Logged In");
  }
})

// Main Submission
SubmitButton.addEventListener('click', function() {
   // Retrieve the userName from local storage
   userName = localStorage.getItem('userName');
  if(isLoggedIn) {
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has("carName")) {

    // Retrieve the value of the carName parameter
    const encodedcarName = urlParams.get("carName");
    
    // Decode the carName value
    carName = decodeURIComponent(encodedcarName);

    //getting Submission data
    address = document.getElementById('address').value
    pickupdate = document.getElementById('pickupdate').value
    returndate = document.getElementById('returndate').value

    //Validating
    if (address == '' || pickupdate == '' || returndate == '') {
      alert("Please fill in all the fields.");
      return; 
    }
    // Call the function
    StoringInMongoDB();
  } else {
      alert("You have'nt Selected any car");
    }
  } else {
    alert("You are not Logged In");
  }  
});


// Define a function
function StoringInMongoDB() {
  const data = {
    Car_Name: carName,
    Client_Name: userName,
    Address: address,
    Pick_Up_Date: pickupdate,
    Return_Date: returndate,
  };
  fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.message);
      // Handle the response as needed
    })
    .catch((error) => {
      console.log("Error storing data", error);
      // Handle the error as needed
    });

    alert("Thank You "+userName+"!!! for Choosing our Services!!\nYour Booking is Confirmed!!!\nWe will soon reach for further Verifications!!");
}

FeedbackButton.addEventListener('click', function() {
  // Getting submission data
  const full_name = document.getElementById('feed-name').value;
  const Contact = document.getElementById('feed-tel').value;
  const email = document.getElementById('feed-email').value;
  const feedback = document.getElementById('feedb').value;
  
  // Validating
  if (full_name === '' || Contact === '' || email === '' || feedback === '') {
    alert("Please fill in all the fields.");
    return; 
  }

  // Create an object with the data
  const data = {
    name: full_name,
    contact: Contact,
    email: email,
    feedback: feedback
  };

  // Send the HTTP POST request to the server-side script
  fetch("http://localhost:5000/submit-feedback", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log("Data inserted successfully!");
    } else {
      console.log("Error:", response.status);
    }
  })
  .catch(error => {
    console.log("Error:", error);
  });
  alert("Your Feedback was Submitted!!!");
});

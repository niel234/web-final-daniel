document.getElementById("registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  
    if (name === "" || phone === "" || email === "" || !passwordPattern.test(password)) {
      alert("Please ensure all fields are filled correctly.");
      return;
    }
  
    alert("Registration Successful");
  });
  
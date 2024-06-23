/* eslint-disable no-alert */
document.addEventListener("DOMContentLoaded", () => {
  // Handle Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      try {
        const response = await fetch("https://farmfresh-backend.vercel.app/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          alert("Login berhasil!");
          localStorage.setItem("accessToken", responseData.accessToken);
          window.location.href = "./index.html";
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Terjadi kesalahan, silakan coba lagi.");
      }
    });
  }

  // Function to toggle password visibility
  const togglePassword = () => {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    }
  };

  // Event listener for Show/Hide password toggle
  const toggleIcon = document.querySelector(".toggle-password");
  if (toggleIcon) {
    toggleIcon.addEventListener("click", togglePassword);
  }

  // Handle Registration
  // Handle Registration
  const registrasiForm = document.getElementById("registrasiForm");
  if (registrasiForm) {
    registrasiForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      // Password validation using regex
      const password = formData.get("password");
      if (!isValidPassword(password)) {
        alert(
          "Password harus terdiri dari minimal 8 karakter, setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus."
        );
        return;
      }

      try {
        const response = await fetch("https://farmfresh-backend.vercel.app/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Registrasi berhasil!");
          window.location.href = "./login.html";
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Terjadi kesalahan, silakan coba lagi.");
      }
    });
  }

  // Password validation function with regex
  function isValidPassword(password) {
    // Regex pattern: minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }
  // Handle Profile
  const profileSection = document.querySelector(".profile");

  if (profileSection) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "./login.html";
    } else {
      fetch("https://farmfresh-backend.vercel.app/api/profiles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            document.querySelector(".profileImage").src =
              user.image || "https://via.placeholder.com/100";
            document.querySelector(".name").textContent =
              user.name || "Name not available";
            document.querySelector(".job").textContent =
              user.job || "Job not available";
            const tbody = document.querySelector("tbody");
            tbody.innerHTML = "";
            tbody.innerHTML = `
              <tr><td>Name</td><td>:</td><td>${user.name || ""}</td></tr>
              <tr><td>Username</td><td>:</td><td>${
                user.username || ""
              }</td></tr>
              <tr><td>Email</td><td>:</td><td>${user.email || ""}</td></tr>
              <tr><td>Address</td><td>:</td><td>${user.address || ""}</td></tr>
              <tr><td>Hobbies</td><td>:</td><td>${user.hobbies || ""}</td></tr>
              <tr><td>Job</td><td>:</td><td>${user.job || ""}</td></tr>
              <tr><td>Vegetables</td><td>:</td><td>${
                user.vegetables || ""
              }</td></tr>
            `;
          } else {
            alert("Gagal memuat data profil, silakan coba lagi.");
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          alert("Gagal memuat data profil, silakan coba lagi.");
        });
    }
  }

  const editProfileButton = document.getElementById("editProfileButton");
  const editModal = document.getElementById("editModal");
  const editProfileForm = document.getElementById("editProfileForm");

  if (editProfileButton && editModal && editProfileForm) {
    editProfileButton.addEventListener("click", () => {
      editModal.style.display = "block";
    });

    const closeButton = document.querySelector(".close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        editModal.style.display = "none";
      });
    }

    editProfileForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Anda harus login untuk mengubah profil");
        return;
      }

      try {
        const response = await fetch("https://farmfresh-backend.vercel.app/api/profiles", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          alert("Profil berhasil diperbarui!");
          window.location.reload();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Terjadi kesalahan, silakan coba lagi.");
      }
    });
  }

  // Handle Logout
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("accessToken");
      window.location.href = "./login.html";
    });
  }
});

const toggleDarkMode = () => {
	const themeSwitcherText = document.querySelector("#themeSwitcherText");
	const themeSwitcher = document.querySelector("#themeSwitcher");
	const theme = window.localStorage.getItem("theme");


	// Check if the theme stored in localStorage is dark, if yes, apply the dark theme to the body

	if (theme === "dark") {
		document.body.classList.add("dark");
	}

	// toggling between dark and light themes
	themeSwitcher.addEventListener("click", () => {
		document.body.classList.toggle("dark");
		if (theme === "dark") {
			window.localStorage.setItem("theme", "light");
			console.log("toggled");
		} else {
			window.localStorage.setItem("theme", "dark");
		}
	});


};

toggleDarkMode();
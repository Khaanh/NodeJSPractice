const http = require("http");
const fs = require("fs");
const url = require("url");

// Read templates
const navLinks = fs.readFileSync(
	`${__dirname}/templates/navigation.html`,
	"utf-8"
);
const indexPage = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");

// Process JSON
const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemp = (temp, el) => {
	const output = temp.replace(/{%NAVIGATION%}/g, el);

	return output;
};

const replacePlaceholder = (temp, data) => {
	let liItems = data
		.map((el) => temp.replace(/{%NAV_LINK%}/g, el.navLink))
		.join("");

	return liItems;
};

const replacedLiItems = replacePlaceholder(navLinks, dataObj);
const navigation = replaceTemp(indexPage, replacedLiItems);

const app = http.createServer((req, res) => {
	const { pathname } = url.parse(req.url, true);

	if (pathname.toLowerCase() === "/" || pathname.toLowerCase() === "/home") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});

		res.end(`${navigation}`);
	} else if (pathname.toLowerCase() === "/about") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		res.end("<h1>About</h1>");
	} else if (pathname.toLowerCase() === "/history") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		res.end("<h1>History</h1>");
	} else if (pathname.toLowerCase() === "/register") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		res.end("<h1>Register</h1>");
	} else {
		res.writeHead(404, {
			"Content-type": "text/html",
		});
		res.end("<h1>PAGE NOT FOUND</h1>");
	}
});

app.listen(8800, () => {
	console.log("Server running on PORT: 8800");
});

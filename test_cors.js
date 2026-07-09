const url = "https://sss-production-2b09.up.railway.app/api/v1/admin/auth/login";
fetch(url, {
  method: "OPTIONS",
  headers: {
    "Origin": "http://localhost:54023",
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "Content-Type"
  }
})
.then(res => {
  console.log("Status:", res.status);
  console.log("Headers:");
  res.headers.forEach((value, name) => console.log(name, ":", value));
})
.catch(console.error);

const url = "https://sss-production-2b09.up.railway.app/api/v1/admin/auth/login";
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "admin@divado.com", password: "12345678" })
})
.then(res => res.text().then(text => console.log(res.status, text)))
.catch(console.error);

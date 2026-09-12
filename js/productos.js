currentDate = new Intl.DateTimeFormat("es-CL", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date());

document.getElementById("id-date").textContent = currentDate;

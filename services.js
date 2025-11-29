
  const select = document.querySelector("select[name='sort']");
  const serviceContainer = document.querySelector(".service-container");

  select.addEventListener("change", () => {
    let services = Array.from(serviceContainer.children);
    let selected = select.value;

    if (selected === "A to Z") {
      services.sort((a, b) =>
        a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent)
      );
    }

    else if (selected === "Z to A") {
      services.sort((a, b) =>
        b.querySelector("h3").textContent.localeCompare(a.querySelector("h3").textContent)
      );
    }

    else if (selected === "Low to High") {
      services.sort((a, b) => {
        let priceA = parseInt(a.querySelector(".price-tag").textContent);
        let priceB = parseInt(b.querySelector(".price-tag").textContent);
        return priceA - priceB;
      });
    }

    else if (selected === "High to Low") {
      services.sort((a, b) => {
        let priceA = parseInt(a.querySelector(".price-tag").textContent);
        let priceB = parseInt(b.querySelector(".price-tag").textContent);
        return priceB - priceA;
      });
    }

    // Re-append sorted elements
    services.forEach(service => serviceContainer.appendChild(service));
  });
;

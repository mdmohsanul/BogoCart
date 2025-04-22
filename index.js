const productOptions = [
  {
    id: 1,
    units: "1 Unit",
    discount: "10% Off",
    price: "$10.00 USD",
    originaPrice: "$24.00 USD",
  },
  {
    id: 2,
    units: "2 Unit",
    discount: "20% Off",
    price: "$18.00 USD",
    originaPrice: "$24.00 USD",
  },
  {
    id: 3,
    units: "3 Unit",
    discount: "30% Off",
    price: "$20.00 USD",
    originaPrice: "$24.00 USD",
  },
];
const sizeOptions = ["S", "M", "L", "XL"];
const colorOptions = ["Black", "Green", "Yellow", "White"];
const options = document.getElementById("options");
const allRadios = document.querySelectorAll('input[type="radio"]');

const selectOptions = (id, name, index, optionsArray, label) => {
  const options = optionsArray
    .map(
      (val) =>
        `<option value="${val}">${
          val.charAt(0).toUpperCase() + val.slice(1)
        }</option>`
    )
    .join("");

  return `
        <div class="variant-select">
          <label for="${name}-${id}-${index}">${label}</label>
          <select id="${name}-${id}-${index}" name="${name}">
            ${options}
          </select>
        </div>
      `;
};

const optionsRow = (id, rowNum) => {
  return `
      <div class="variant-row">
        <div class="variant-label">#${rowNum}</div>
        ${selectOptions(id, rowNum, "size", sizeOptions, "Size")}
        ${selectOptions(id, rowNum, "color", colorOptions, "Colour")}
      </div>
    `;
};

productOptions.forEach((option) => {
  const html = `
      <div class="option" data-value="${option.id}" >
      ${
        option.id === 2 ? `<span class="most-popular ">MOST POPULAR</span>` : ""
      }
        <div class="option-header">
          <div class="option-header-details">
            <input type="radio" name="product" id="radio-${option.id}" value="${
    option.id
  }" />
            <label for="radio-${option.id}">
              <p class="product-details">
                <span class="product-unit">${option.units}</span>
                <span class="discount-badge">${option.discount}</span>
              </p>
              <p class="product-price-type">Standard Price</p>
            </label>
          </div>
          <div class="pricing">
            <p class="price">${option.price}</p>
            <p class="original-price">${option.originaPrice}</p>
          </div>
        </div>
  
      
        <div class="size-color" id="option-${option.id}">
        ${optionsRow(option.id, 1)}
        ${optionsRow(option.id, 2)}

      </div>
         
        </div>
      </div>

    `;

  options.insertAdjacentHTML("beforeend", html);
});

// selecting all radio buttons
document.addEventListener("change", (e) => {
  if (e.target.name === "product") {
    const selectedValue = e.target.value;

    // Hide all .size-color elements first
    document.querySelectorAll(".size-color").forEach((el) => {
      el.classList.remove("show-size-color");
      el.classList.add("hide-size-color");
    });

    // Show the one that was selected
    const selectedSection = document.getElementById(`option-${selectedValue}`);
    if (selectedSection) {
      selectedSection.classList.remove("hide-size-color");
      selectedSection.classList.add("show-size-color");
    }
  }
});

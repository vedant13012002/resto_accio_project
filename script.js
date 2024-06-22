// Function to fetch menu from JSON
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
}

// Function to simulate taking order
function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const burgers = menu.filter(item => item.name.includes('Burger'));
            const selectedBurgers = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }
            resolve(selectedBurgers);
        }, 2500);
    });
}

// Function to simulate order preparation
function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function to simulate payment
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function to show thank you message
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

// Main function to orchestrate the order process
async function startOrder() {
    try {
        // Step 1: Get Menu
        const menu = await getMenu();
        console.log('Menu:', menu);

        // Step 2: Take Order
        const order = await takeOrder();
        console.log('Order taken:', order);

        // Step 3: Order Preparation
        const prepStatus = await orderPrep();
        console.log('Order prepared:', prepStatus);

        // Step 4: Pay Order
        const paymentStatus = await payOrder();
        console.log('Payment status:', paymentStatus);

        // Step 5: Display Thank You Message
        thankyouFnc();
    } catch (error) {
        console.error('Error in order process:', error);
        alert('Sorry, something went wrong. Please try again later.');
    }
}

// Function to search menu (placeholder for actual search functionality)
function searchMenu() {
    alert('Search functionality is under construction.');
}

// Initialize the menu on page load
getMenu().then(menu => {
    const menuItemsDiv = document.getElementById('menuItems');
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
        `;
        menuItemsDiv.appendChild(menuItem);
    });
});

function goToPage2() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    page1.classList.remove('active');
    page2.classList.add('active');
}

function goToPage3() {
    const form = document.getElementById('rsvpForm');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    // Basic validation
    if (!firstName || !lastName || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Store form data (you can send this to your server)
    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        timestamp: new Date().toISOString()
    };
    
    console.log('RSVP Data:', formData);
    
    // Transition to page 3
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    page2.classList.remove('active');
    page3.classList.add('active');
    
    // Trigger wax seal animation after a short delay
    setTimeout(() => {
        const waxSeal = document.getElementById('waxSeal');
        waxSeal.classList.add('animate');
    }, 500);
}

// Add enter key support for form
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                goToPage3();
            }
        });
    });
});
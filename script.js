function goToPage2() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    page1.classList.remove('active');
    page2.classList.add('active');
}

function goToPage3() {
    console.log('goToPage3 function called');
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    console.log('Form data:', { firstName, lastName, email });
    
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
    
    // Create hidden iframe for silent submission
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'hidden_iframe';
    document.body.appendChild(iframe);
    
    // Send to Google Sheets using form submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://script.google.com/macros/s/AKfycbzXqVoT34gcccE1qOMUdHZ--c-IySsbQTFt4kQx6gZcJaPuDuq0vgdIWgKdTvxr-O2D/exec';
    form.target = 'hidden_iframe';
    form.style.display = 'none';
    
    // Add form fields
    const fields = { firstName, lastName, email };
    Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    
    // Clean up after submission
    setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
    }, 1000);
    
    console.log('Form submitted to Google Sheets');
    
    // Transition to page 3
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    page2.classList.remove('active');
    page3.classList.add('active');
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

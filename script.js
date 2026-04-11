const hamburger = document.querySelector('#hamburger');
const navlinks = document.querySelector('#nav-links');

hamburger.onclick = () => {
    navlinks.classList.toggle('active');
}
const counters = document.querySelectorAll('.counter');

const ruCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let count = 0;

        const update = () => {
            count += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(update, 20);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
};

const aboutSection = document.querySelector('#about');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        ruCounter();
        observer.disconnect(aboutSection);
    }
});

observer.observe(aboutSection);

function validateForm() {
    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    //Clear previous error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    if (name === '') {
        document.getElementById('name-error').textContent = 'Name is required.';
        valid = false;
    }

    if (email === '' || !email.includes('@')) {
        document.getElementById('email-error').textContent = 'Valid email is required.';
        valid = false;
    }

    if (message === '') {
        document.getElementById('message-error').textContent = 'Message cannot be empty.';
        valid = false;
    }

    if (valid) {
        emailjs.sendForm(
            'service_t8eql4j',
            'template_opk7atv',
            document.querySelector('form'),
            'CqZOjoTB78vWzsxg3'
        ).then(() => {
        alert('Message sent successfully!');
        }).catch((error) => {
        alert('Failed to send message. Please try again later.');
        console.error('EmailJS error:', error);
        });
    }
}

const themeBtn = document.getElementById('theme-btn');
const body = document.body;
//Lod saved theme on page load
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.onclick = () => {
    body.classList.toggle('light');

    if (body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'dark');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
};
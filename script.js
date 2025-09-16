// JavaScript for Ajay Krishnan A.P Portfolio

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
  const form = document.getElementById("contactForm");
  const result = document.getElementById("form-result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          result.innerHTML = `<div class="alert alert-success">Message sent successfully!</div>`;
          form.reset();
        } else {
          result.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<div class="alert alert-danger">Something went wrong!</div>`;
      });
  });



    // Navbar active link update
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    });

    progressBars.forEach(bar => observer.observe(bar));

    // Load sample projects
    loadSampleProjects();

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
});

// Projects Management
let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];

function loadSampleProjects() {
    if (projects.length === 0) {
        projects = [
            {
                id: 1,
                title: 'BOOKBITE',
                description: 'BiteBook is a modern and responsive canteen management system designed to streamline food ordering and menu management. Built with HTML, CSS, JavaScript, and Bootstrap.',
                technologies: ['HTML','CSS','JavaScript','React', 'Node.js', 'MongoDB', 'Bootstap'],
                github: 'https://github.com/AjayExplorer/Bookbite',
                demo: 'https://bitebookcanteenmanagment.netlify.app'
            },
            {
                id: 2,
                title: 'BILLING SYSTEM',
                description: 'This is a simple yet efficient Billing System built entirely using Core Java without any external databases. It is a console-based or GUI-based desktop application designed to manage item billing for small shops, mini-canteens, or academic projects. The system allows users to enter products, calculate totals, and generate a basic bill summary.',
                technologies: ['Java'],
                github: 'https://github.com/AjayExplorer/Shopbillingsystem',
                demo: 'https://ajay-taskmanager.herokuapp.com'
            },
            {
                id: 3,
                title: 'MEDICARD',
                description: 'Medicard is a smart health card that securely stores patient details. It provides ADR (Adverse Drug Reaction) protection by preventing dangerous drug interactions and ensuring safe treatment. The card contains important medical information that can only be accessed by authorized hospitals, keeping patient data private and secure.',
                technologies: ['HTML,CSS,JAVASCRIPT,BOOTSTRAP,NODE JS,MONGODB,'],
                github: 'https://github.com/AjayExplorer/MediCard',
                demo: 'https://youtu.be/V-sIHSW7QAU'
            },
            {
                id: 4,
                title: 'DHRUVA CEK',
                description: 'This is a fully responsive and interactive music band website developed as a practice project using HTML, CSS, JavaScript, and Bootstrap. The project was built to explore and improve front-end development skills, including layout design, responsive components, and dynamic interactivity.',
                technologies: ['JavaScript', 'HTML', 'Bootstrap', 'CSS3'],
                github: 'https://github.com/AjayExplorer/music-band-',
                demo: 'https://dhruvacek.netlify.app/'
            }
        ];
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    }
    displayProjects();
}

function displayProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    col.innerHTML = `
        <div class="project-card">
            <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="mb-0">${project.title}</h5>
               
                    
                </button>
            </div>
            <p class="text-secondary mb-3">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-outline-light btn-sm">
                    <i class="bi bi-github"></i> Code
                </a>` : ''}
                ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-primary btn-sm">
                    <i class="bi bi-eye"></i> Demo
                </a>` : ''}
            </div>
        </div>
    `;
    
    return col;
}

function addProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const technologies = document.getElementById('projectTech').value.trim();
    const github = document.getElementById('projectGithub').value.trim();
    const demo = document.getElementById('projectDemo').value.trim();

    if (!title || !description) {
        alert('Please fill in the required fields (Title and Description)');
        return;
    }

    const newProject = {
        id: Date.now(),
        title: title,
        description: description,
        technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
        github: github || null,
        demo: demo || null
    };

    projects.push(newProject);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    
    // Reset form
    document.getElementById('projectForm').reset();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
    modal.hide();
    
    // Refresh projects display
    displayProjects();
    
    // Show success message
    showNotification('Project added successfully!', 'success');
}



// Resume Functions
function viewResume() {
    // In a real application, this would open a PDF viewer or new tab
    showNotification('Resume viewing functionality would be implemented here', 'info');
     window.open('https://drive.google.com/file/d/1ItNHToQBg331wFs9SVRRiDjPi4SIaAng/view?usp=sharing', '_blank');
}

function downloadResume() {
    // In a real application, this would trigger a download
    showNotification('If you want to Download the Resume Contact me', 'info');
     const link = document.createElement('https://drive.google.com/file/d/1ItNHToQBg331wFs9SVRRiDjPi4SIaAng/view?usp=sharing');
     link.href = 'https://drive.google.com/file/d/1ItNHToQBg331wFs9SVRRiDjPi4SIaAng/view?usp=sharing';
     link.download = 'Ajay_Krishnan_AP_Resume.pdf';
     link.click();
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // In a real application, you would send this data to a server
    console.log('Contact Form Submission:', {
        name, email, subject, message
    });

    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    }, 1000);

    showNotification('Sending message...', 'info');
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Typing Animation Enhancement
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation on page load
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typeWriter(typingElement, originalText, 80);
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations to various elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about-card, .project-card, .certificate-card, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
});

// Dark mode toggle (optional enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'false') {
        document.body.classList.add('light-mode');
    }
});
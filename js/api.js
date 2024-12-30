//feth data from api system tasheer agency

const url = 'https://tasheeragency.com/api';


async function getServices() {
    let cardService = document.querySelector('.card-service');
    
    cardService.innerHTML = `
        <div class="container mt-5 text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>جاري تحميل البيانات...</p>
        </div>
    `;

    try {
        const response = await fetch(`${url}/service/index`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const services = await response.json();
        let html = '';

        if (services.length > 0) {
            services.forEach(service => {
                const { type, description } = service;
                let typeService = '';
                let image;
                let classList = '';

                switch (type) {
                    case 'Education':
                        typeService = 'خدمات التعليم';
                        image = 'image/edu.jpg';
                        classList = 'fas fa-book fa-2x';
                        break;
                    case 'Travel':
                        typeService = 'خدمات السفر والسياحة';
                        image = 'image/travel.jpg';
                        classList = 'fas fa-plane fa-2x';
                        break;
                    case 'Hajj':
                        typeService = 'خدمات الحج والعمرة';
                        image = 'image/hajj.png';
                        classList = 'fas fa-mosque fa-2x';
                        break;
                    default:
                        typeService = type;
                        image = 'image/default.png';
                }

                html += `
                    <div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
                        <div class="service-item">
                            <div class="service-img">
                                <img src="${image}" class="img-fluid rounded-top w-100" alt="${typeService}">
                                <div class="service-icon p-3">
                                    <i class="${classList}"></i>
                                </div>
                            </div>
                            <div dir="rtl" class="service-content p-4">
                                <div class="service-content-inner">
                                    <a href="#" class="d-inline-block h4 mb-4">${typeService}</a>
                                    <p class="mb-4">${description || 'لا يوجد وصف متاح'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            html += `
                <div class="container mt-5">
                    <div class="alert alert-warning text-center" role="alert">
                        لا توجد بيانات!
                    </div>
                </div>
            `;
        }
        cardService.innerHTML = html;
    } catch (error) {
        console.error('Error fetching services:', error);
        cardService.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-danger text-center" role="alert">
                    حدث خطأ أثناء تحميل البيانات!
                </div>
            </div>
        `;
    }
}

async function getTeam() {
    let cardTeam = document.querySelector('.card-team');
    console.log(cardTeam)
    cardTeam.innerHTML = `
        <div class="container mt-5 text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>جاري تحميل البيانات...</p>
        </div>
    `;

    try {
        const response = await fetch(`${url}/news/getRole`);
        
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const team = await response.json();
        let html = '';
        let typeService = '';

        if (team.length > 0) {
            for (let i = 0; i < team.length; i++) {
                let role = team[i].role;

                switch (role) {
                    case 'Executive':
                        typeService = 'المدير التنفيذي';
                        break;
                    case 'Relations':
                        typeService = 'العلاقات العامة';
                        break;
                    case 'Consultant':
                        typeService = 'المستشار التعليمي';
                        break;
                    case 'Customer':
                        typeService = 'خدمة العملاء';
                        break;
                    default:
                        typeService = role;
                }
          
                html += `
                    <div dir="rtl" class="container-fluid team pb-5">
                        <div class="container pb-5">
                            <div class="row g-4">
                                <div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                                    <div class="team-item">
                                        <div class="team-img">
                                            <img src="data:image/png;base64,${team[i].image}" class="img-fluid rounded-top w-100" alt="">
                                            <div class="team-icon">
                                                    <a class="btn btn-primary btn-sm-square rounded-pill mb-2" href="https://www.facebook.com/share/MtH2uE8LvsKK845h/?mibextid=LQQJ4d" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                                    <a class="btn btn-primary btn-sm-square rounded-pill mb-2" href="https://wa.me/60136969570" target="_blank"><i class="fab fa-whatsapp"></i></a>
                                                    <a class="btn btn-primary btn-sm-square rounded-pill mb-2" href=""><i class="fab fa-linkedin-in"></i></a>
                                                    <a class="btn btn-primary btn-sm-square rounded-pill mb-0" href="https://www.instagram.com/tasheer_edu?igsh=MWVmMzUwNHh6eml6aA=="target="_blank"><i class="fab fa-instagram"></i></a>
                                                </div>
                                        </div>
                                        <div dir="rtl" class="team-title p-4">
                                            <h4 class="mb-0">${team[i].username}</h4>
                                            <p class="mb-0">${typeService}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="container mt-5">
                    <div class="alert alert-warning text-center" role="alert">
                        لا توجد بيانات!
                    </div>
                </div>
            `;
        }

        cardTeam.innerHTML = html;
    } catch (error) {
        console.error('Error fetching team:', error);
        cardTeam.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-danger text-center" role="alert">
                    حدث خطأ أثناء تحميل البيانات!
                </div>
            </div>
        `;
    }
}

async function getNews() {
    const newsContainer = document.querySelector('.news-container');
    
    newsContainer.innerHTML = `
        <div class="container mt-5 text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>جاري تحميل البيانات...</p>
        </div>
    `;

    try {
        const response = await fetch(`${url}/news/index`);
        
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const news = await response.json();
        let html = '';

        if (news.length > 0) {
            for (let i = 0; i < news.length; i++) {
                html += `
                    <div class="card-news m-4">
                        
                        <div dir="rtl" class="news-content p-4">
                            <h4 class="news-title">${news[i].title}</h4>
                            <p class="news-date">التاريخ : ${new Date(news[i].createdAt).toLocaleDateString('ar-EG')}</p>
                            <p class="news-description short-description">${news[i].content}</p>
                        </div>
                        <hr>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="container mt-5">
                    <div class="alert alert-warning text-center" role="alert">
                        لا توجد بيانات!
                    </div>
                </div>
            `;
        }

        newsContainer.innerHTML = html;
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `
            <div class="container mt-5">
                <h1 class="text-center">اخبار الوكالة</h1>
                <div class="alert alert-danger text-center" role="alert">
                    حدث خطأ أثناء تحميل البيانات!
                </div>
            </div>
        `;
    }
}

async function getEducation() {
    let cardEducation = document.querySelector('.service-edu');

    
    cardEducation.innerHTML = `
        <div class="container mt-5 text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>جاري تحميل البيانات...</p>
        </div>
    `;

    try {
        const response = await fetch(`${url}/education/index`);

        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const services = await response.json();
        let html = '';

        if (services.length > 0) {
            for (let i = 0; i < services.length; i++) {
                html += `
                    <div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                        <div class="service-item">
                            <div class="service-content p-4">
                                <div class="service-content-inner">
                                    <a href="#" class="d-inline-block h4 mb-4">${services[i].name}</a>
                                    <p class="mb-4"> التاريخ : ${new Date(services[i].createdAt).toLocaleDateString('ar-EG')}</p>  
                                    <p class="mb-4">مقدم المنحة :  ${services[i].provider}</p>
                                    <p class="mb-4">المؤهلات :  ${services[i].eligibilityCriteria}</p>
                                    <p class="mb-4">سعر المنحة :  ${services[i].price}</p>
                                    <p class="mb-4"> التفاصيل : ${services[i].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="container mt-5">
                    <div class="alert alert-warning text-center" role="alert">
                        لا توجد بيانات!
                    </div>
                </div>
            `;
        }

        cardEducation.innerHTML = html;
    } catch (error) {
        console.error('Error fetching education data:', error);
        cardEducation.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-danger text-center" role="alert">
                    حدث خطأ أثناء تحميل البيانات!
                </div>
            </div>
        `;
    }
}

async function getTravel() {
    let cardTravel = document.querySelector('.service-travel');

    
    cardTravel.innerHTML = `
        <div class="container mt-5 text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>جاري تحميل البيانات...</p>
        </div>
    `;

    try {
        const response = await fetch(`${url}/travel/index`);

        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const services = await response.json();
        let html = '';

        if (services.length > 0) {
            for (let i = 0; i < services.length; i++) {
                html += `
                    <div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
                        <div class="service-item">
                            <div class="service-content p-4">
                                <div class="service-content-inner">
                                    <a href="#" class="d-inline-block h4 mb-4">${services[i].name}</a>
                                    <p class="mb-4"> فترة الخدمة : ${services[i].availableDates}</p>
                                    <p class="mb-4"> التاريخ : ${new Date(services[i].createdAt).toLocaleDateString('ar-EG')}</p>
                                    <p class="mb-4"> سعر الخدمة : ${services[i].price}</p>
                                    <p class="mb-4"> تفاصيل الخدمة : ${services[i].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="container mt-5">
                    <div class="alert alert-warning text-center" role="alert">
                        لا توجد بيانات!
                    </div>
                </div>
            `;
        }

        cardTravel.innerHTML = html;
    } catch (error) {
        console.error('Error fetching travel data:', error);
        cardTravel.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-danger text-center" role="alert">
                    حدث خطأ أثناء تحميل البيانات!
                </div>
            </div>
        `;
    }
}

async function getHajj() {
    let cardHajj = document.querySelector('.card-hajj');

    
    cardHajj.innerHTML = `
        <div class="container mt-5 text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>جاري تحميل البيانات...</p>
        </div>
    `;

    try {
        const response = await fetch(`${url}/hajj/index`);

        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const services = await response.json();
        let html = '';

        if (services.length > 0) {
            for (let i = 0; i < services.length; i++) {
                html += `
                    <div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
                        <div class="service-item">
                            <div class="service-content p-4">
                                <div class="service-content-inner">
                                    <a href="#" class="d-inline-block h4 mb-4">${services[i].packageName}</a>
                                    <p class="mb-4"> الاستثناءات : ${services[i].exclusions}</p>
                                    <p class="mb-4"> التاريخ : ${new Date(services[i].createdAt).toLocaleDateString('ar-EG')}</p>
                                    <p class="mb-4"> سعر الخدمة : ${services[i].price}</p>
                                    <p class="mb-4"> تفاصيل الخدمة : ${services[i].inclusions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="container mt-5">
                    <div class="alert alert-warning text-center" role="alert">
                        لا توجد بيانات!
                    </div>
                </div>
            `;
        }

        cardHajj.innerHTML = html;
    } catch (error) {
        console.error('Error fetching Hajj data:', error);
        cardHajj.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-danger text-center" role="alert">
                    حدث خطأ أثناء تحميل البيانات!
                </div>
            </div>
        `;
    }
}

let testimonials = [];
let currentIndex = 0; 
const limit = 3; 

fetch(`${url}/review/index`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        testimonials = data;
        console.log(data)
        displayTestimonials(); 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function displayTestimonials() {
    const testimonialList = document.getElementById("testimonial-list");
    
    const endIndex = Math.min(currentIndex + limit, testimonials.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const testimonial = testimonials[i];
        const col = document.createElement('div');
        col.className = 'col-md-4';

        let stars = '';
        for (let j = 0; j < 5; j++) {
            if (j < testimonial.rating) {
                stars += '<i class="fas fa-star text-primary"></i>'; 
            } else {
                stars += '<i class="fas fa-star text-body"></i>';
            }
        }
        col.innerHTML = `
            <div dir="ltr" class="testimonial-item bg-light rounded p-4 mb-4">
                <div class="d-flex flex-column text-start">
                    <h4 class="text-dark mb-1">${testimonial.username}</h4>
                    <p class="mb-0">${testimonial.comment}</p>
                    <div class="d-flex text-primary mb-3">
                        ${stars}
                    </div>
                </div>
            </div>
        `;
        testimonialList.appendChild(col);
    }

    currentIndex = endIndex;
    
    if (currentIndex >= testimonials.length) {
        document.getElementById("load-more").style.display = 'none';
    }
}

document.getElementById("testimonial-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const username = event.target.elements[0].value;
    const comment = event.target.elements[1].value;
    const rating = event.target.elements.rating.value;

    const testimonialData = {
        username: username,
        comment: comment,
        rating: parseInt(rating)
    };


    try {
        const response = await fetch(`${url}/review/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData),
        });

        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }

        const data = await response.json(); 

        const successAlert = document.getElementById("success-alert");
        successAlert.classList.remove("d-none");
        

        event.target.reset();
    } catch (error) {
        alert('شكرا لك , لقد تم ارسال تعليقك')
        successAlert.classList.remove("d-none");
    }
});


document.getElementById("load-more").addEventListener("click", displayTestimonials);


document.addEventListener('DOMContentLoaded', () => {
    getServices()
    getTeam()
    getNews()
    getTravel()
    getHajj()
    getEducation() 
});
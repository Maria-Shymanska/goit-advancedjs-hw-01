// Оголошення об'єкта formData з порожніми значеннями
let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// Перевірка локального сховища при завантаженні сторінки
window.addEventListener('load', () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    try {
      formData = JSON.parse(savedData); 
      form.elements.email.value = formData.email || '';
      form.elements.message.value = formData.message || '';
    } catch (error) {
      console.error('Error parsing saved data:', error);
    }
  }
});

// Функція збереження formData у локальне сховище
const saveLocalStorage = () => {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

// Делегування події 'input' для відстеження змін у полях форми
form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value; 
  saveLocalStorage(); 
});

// Обробка події 'submit'
form.addEventListener('submit', e => {
  e.preventDefault();

  // Валідація електронної пошти та повідомлення
  if (!validator.isEmail(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (validator.isEmpty(formData.message)) {
    alert('Please enter a message');
    return;
  }


  console.log(formData);

  // Очищення локального сховища та formData після відправлення форми
  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };

  // Скидання форми
  form.reset();
});

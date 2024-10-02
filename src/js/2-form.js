// Оголошення об'єкта formData з порожніми значеннями

let formData = {
    email: "",
    message: ""
};

const form = document.querySelector('.feedback-form');

// перевірка локального сховища при завантаженні сторінки
window.addEventListener('load', () => {
    const saveData = localStorage.getItem('feedback-form-state');
    if (saveData) {
        formData.JSON.parse(saveData);
        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
    }
});

// Зберігання formData у локальне сховище
 
const saveLocalStorage = () => {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

// Делегування події 'input' для відстеження змін у полях форми

form.addEventListener('input', (e) => {
    formData[e.target.name] = e.target.value
    saveLocalStorage();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validator.isEmail(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (validator.isEmpty(formData.message)) {
    alert('Please enter a message');
    return;
  }

  console.log(formData);

  try {
    // Очищення форми, об'єкта formData і локального сховища
    localStorage.removeItem('feedback-form-state');
  } catch (error) {
    console.error('LocalStorage is not available:', error);
  }

  // Очищення об'єкта formData
  formData = { email: '', message: '' };

  // Скидання форми
  form.reset();
});


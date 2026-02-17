document.addEventListener('DOMContentLoaded', function() {
  console.log('Кинологический клуб — современная версия');
  
  // Мобильное меню
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav__links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('nav__links--active');
      this.innerHTML = navLinks.classList.contains('nav__links--active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Переключение тарифов на странице регистрации
  const planTabs = document.querySelectorAll('.plan-selector__tab');
  const plans = {
    free: document.getElementById('freePlan'),
    premium: document.getElementById('premiumPlan'),
    breeder: document.getElementById('breederPlan')
  };
  
  if (planTabs.length > 0) {
    planTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Убираем активный класс у всех табов
        planTabs.forEach(t => t.classList.remove('plan-selector__tab--active'));
        this.classList.add('plan-selector__tab--active');
        
        // Скрываем все планы
        Object.values(plans).forEach(plan => {
          if (plan) plan.classList.remove('benefits-plan--active');
        });
        
        // Показываем выбранный
        const planName = this.dataset.plan;
        if (plans[planName]) {
          plans[planName].classList.add('benefits-plan--active');
        }
      });
    });
  }
  
  // Обработка формы регистрации
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Простая валидация
      const inputs = this.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#dc3545';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        showNotification('Демо-режим: аккаунт успешно создан!');
      } else {
        showNotification('Пожалуйста, заполните все поля', 'error');
      }
    });
  }
  
  // Функция показа уведомлений
  function showNotification(message, type = 'success') {
    let notification = document.querySelector('.notification');
    
    if (notification) {
      notification.remove();
    }
    
    notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: ${type === 'success' ? '#1A2E35' : '#dc3545'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideIn 0.3s;
      font-family: 'Inter', sans-serif;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Добавляем стили для анимаций
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .nav__links--active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      background: white;
      padding: 20px;
      border-bottom: 1px solid var(--color-gray-200);
      box-shadow: var(--shadow-md);
    }
  `;
  document.head.appendChild(style);
});
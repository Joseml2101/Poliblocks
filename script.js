document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú desplegable hamburguesa en móviles
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Modal Portapapeles (Presupuesto y Orden)
  const budgetModal = document.getElementById('budgetModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const footerOpenModal = document.getElementById('footerOpenModal');

  function toggleModal(show) {
    if (budgetModal) {
      if (show) {
        budgetModal.classList.add('active');
      } else {
        budgetModal.classList.remove('active');
      }
    }
  }

  if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
  if (footerOpenModal) footerOpenModal.addEventListener('click', (e) => { e.preventDefault(); toggleModal(true); });
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));
  
  if (budgetModal) {
    budgetModal.addEventListener('click', (e) => {
      if (e.target === budgetModal) toggleModal(false);
    });
  }

  // 3. Calculadora de presupuesto basada en: 60 bloques = 55$
  const modalArea = document.getElementById('modalArea');
  const modalOrg = document.getElementById('modalOrg');
  const modalBlocksCount = document.getElementById('modalBlocksCount');
  const modalTotalPrice = document.getElementById('modalTotalPrice');
  const modalBudgetForm = document.getElementById('modalBudgetForm');
  const modalFeedback = document.getElementById('modalFeedback');

  function calculateModalBudget() {
    if (!modalArea) return;
    const m2 = Math.max(1, parseFloat(modalArea.value) || 0);
    const isOng = modalOrg.value === 'ong';

    // 12.5 bloques por m2 aprox
    const totalBlocks = Math.ceil(m2 * 12.5);
    
    // Tarifa: 60 bloques valen 55$ -> Precio por bloque = 55 / 60 = 0.91666$
    let totalPrice = (totalBlocks / 60) * 55;

    if (isOng) {
      totalPrice *= 0.85; // 15% de descuento para instituciones benéficas
    }

    if (modalBlocksCount) modalBlocksCount.textContent = `${totalBlocks.toLocaleString()} unidades`;
    if (modalTotalPrice) modalTotalPrice.textContent = `$${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  }

  if (modalArea) {
    modalArea.addEventListener('input', calculateModalBudget);
    modalOrg.addEventListener('change', calculateModalBudget);
    calculateModalBudget();
  }

  if (modalBudgetForm) {
    modalBudgetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (modalFeedback) {
        modalFeedback.style.display = 'block';
        setTimeout(() => {
          toggleModal(false);
          modalFeedback.style.display = 'none';
        }, 2200);
      }
    });
  }
});
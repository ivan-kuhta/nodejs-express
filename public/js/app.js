document.querySelectorAll('.price').forEach(item => {
    item.textContent = new Intl.NumberFormat('ru-RU', {
        currency: 'UAH',
        style: 'currency'
    }).format(item.textContent)
})
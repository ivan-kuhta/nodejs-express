const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'UAH',
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('ua-UA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(item => {
    item.textContent = toCurrency(item.textContent)
})

const $card = document.querySelector('#card');

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})

if($card){
    $card.addEventListener('click', event => {
        if(event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id;
            const csrf = event.target.dataset.csrf;
            // console.log(id);

            fetch('/card/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json()).then(card => {
                // console.log(card)
                if(card.courses.length) {
                    const html = card.courses.map(c => {
                        return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id=${c.id}>Видалити</button>
                            </td>
                        </tr>
                        `
                    }).join('')
                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').textContent = toCurrency(card.price)
                    
                } else {
                    $card.innerHTML = '<p>Корзина пуста</p>'
                }
            })
        }
    })
}

M.Tabs.init(document.querySelectorAll('.tabs'));
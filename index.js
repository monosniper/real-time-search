class RLSearch {
    constructor(options) {
        const default_options = {
            input_selector: '#faq-search-input',
            item_selector: '.faq-item',
            item_title_selector: '.faq-item-header',
            item_title_el_selector: 'h4',
            hide_class: 'item--hide',
        };

        this.options = extend(options, default_options);
        this.input = document.querySelector(this.options.input_selector);

        this.init();
    }

    init() {
        this.input.addEventListener('input', function() {

            let input_value = this.input.value.trim().toLowerCase();

            if (input_value !== '') {
                let items = document.querySelectorAll(this.options.item_selector);

                items.forEach((item) => {
                    let title = item.querySelector(this.options.item_title_selector);
                    let title_text = title.innerText.trim();
                    let title_el = title.querySelector(this.options.item_title_el_selector);

                    if (title_text.toLowerCase().search(input_value) !== -1) {
                        let pos = title_text.toLowerCase().search(input_value);
                        let len = input_value.length;

                        title_el.innerHTML = this.markResult(title_text, pos, len);

                        this.showItem(item);
                    } else {
                        title_el.innerHTML = title.innerText;

                        this.hideItem(item);
                    }
                });
            } else {
                document.querySelectorAll(this.options.item_selector).forEach((item) => {
                    let title = item.querySelector(this.options.item_title_selector);
                    let title_el = title.querySelector(this.options.item_title_el_selector);

                    title_el.innerHTML = title.innerText;

                    this.showItem(item);
                });
            }

        });
    }

    hideItem(item) {
        item.classList.add(this.options.hide_class);
    }

    showItem(item) {
        item.classList.remove(this.options.hide_class);
    }

    markResult(string, pos, len) {
        return string.slice(0,pos)+'<mark>'+string.slice(pos, pos+len)+'</mark>'+string.slice(pos+len);
    }
}

function extend(a, b) {
    for(let key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

module.exports = { RLSearch };
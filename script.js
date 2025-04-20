document.addEventListener('DOMContentLoaded', () => {
    const categoryInput = document.getElementById('category');
    const keywordInput = document.getElementById('keyword');
    const responseInput = document.getElementById('response');
    const addBtn = document.getElementById('addBtn');
    const responsesContainer = document.getElementById('responsesContainer');
    const filterInput = document.getElementById('filter');

    let responses = loadResponses();
    renderResponses(responses); // Renderiza todas as respostas inicialmente

    addBtn.addEventListener('click', () => {
        const category = categoryInput.value.trim();
        const keyword = keywordInput.value.trim();
        const responseText = responseInput.value.trim();

        if (responseText) {
            responses.push({ category, keyword, text: responseText });
            saveResponses();
            renderResponses(responses); // Re-renderiza com a nova resposta
            clearInputFields();
        } else {
            alert('Por favor, digite a resposta rápida.');
        }
    });

    filterInput.addEventListener('input', () => {
        const searchTerm = filterInput.value.toLowerCase();
        const filteredResponses = responses.filter(response => {
            return (response.text && response.text.toLowerCase().includes(searchTerm)) ||
                   (response.category && response.category.toLowerCase().includes(searchTerm)) ||
                   (response.keyword && response.keyword.toLowerCase().includes(searchTerm));
        });
        renderResponses(filteredResponses); // Renderiza apenas as respostas filtradas
    });

    function renderResponses(responseList) {
        responsesContainer.innerHTML = '';
        if (responseList.length === 0) {
            responsesContainer.innerHTML = '<p>Nenhuma resposta encontrada.</p>';
            return;
        }
        responseList.forEach((response, index) => {
            const responseDiv = document.createElement('div');
            responseDiv.classList.add('response-item');

            const textParagraph = document.createElement('p');
            textParagraph.textContent = response.text;

            const categoryKeywordDiv = document.createElement('div');
            categoryKeywordDiv.classList.add('category-keyword');
            if (response.category) {
                categoryKeywordDiv.textContent += `Categoria: ${response.category} `;
            }
            if (response.keyword) {
                categoryKeywordDiv.textContent += `| Palavra-chave: ${response.keyword}`;
            }

            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copiar';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(response.text)
                    .then(() => {
                        alert('Resposta copiada para a área de transferência!');
                    })
                    .catch(err => {
                        console.error('Erro ao copiar texto: ', err);
                    });
            });

            responseDiv.appendChild(categoryKeywordDiv);
            responseDiv.appendChild(textParagraph);
            responseDiv.appendChild(copyButton);
            responsesContainer.appendChild(responseDiv);
        });
    }

    function saveResponses() {
        localStorage.setItem('whatsappQuickResponses', JSON.stringify(responses));
    }

    function loadResponses() {
        const storedResponses = localStorage.getItem('whatsappQuickResponses');
        return storedResponses ? JSON.parse(storedResponses) : [];
    }

    function clearInputFields() {
        categoryInput.value = '';
        keywordInput.value = '';
        responseInput.value = '';
    }
});
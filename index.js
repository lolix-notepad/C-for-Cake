// small-temporal patch for github links
let basePath = '';

if (/github/.test(window.location))
    basePath = '/C-for-Cake';

// navbar-logo patch
const navbarLogo = document.getElementById('patch-logo');
if (navbarLogo)
    navbarLogo.href = basePath + '/index.html';

// bar searcher
const topicSearcher = document.getElementById('search-topic');
const listTopicResults = document.getElementById('list-topic-results');

const indexToLink = {
    'installation': '/views/installation.html',
    'introduction': '/views/intro.html',
    'hello world program': '/views/hello-world.html',
};

const indexes = Object.keys(indexToLink);

let term;

const filterByProximatedTerm = (term, indexes) => {
    let regex = RegExp(`.*${term.split('').join('.*')}.*`)

    return indexes.filter(index => regex.test(index))
}

const renderResults = () => {
    listTopicResults.style.display = 'block';

    let indexesToRender = term ?
        filterByProximatedTerm(term, indexes) :
        indexes;

    if (!indexesToRender.length)
        return;

    if (indexesToRender.length > 5)
        indexesToRender = indexesToRender.slice(0, 5);

    listTopicResults.innerHTML = '';

    for (const index of indexesToRender) {
        const p = document.createElement('p');
        p.textContent = index;
        p.onclick = () => window.location.replace(basePath + indexToLink[index])
        listTopicResults.appendChild(p);
    }
}

topicSearcher.onclick = renderResults;

topicSearcher.oninput = (e) => {
    term = e.target.value.toLowerCase();
    renderResults();
}

// show/hide bar searcher (mobile view)
const btnSearchTopic = document.getElementById('btn-search-topic');
const barSeacherContainer = document.querySelector('.searcher');

btnSearchTopic.onclick = () => {
    barSeacherContainer.style.display = 'block';
    topicSearcher.value = '';
    topicSearcher.focus();
    renderResults();
}

barSeacherContainer.onclick = () => {
    barSeacherContainer.style.display = "none";
    term = '';
}

// dynamic contents
const contentTable = document.getElementById('content-table');

if (contentTable) {
    for (const index of indexes) {
        const a = document.createElement('a');
        a.textContent = index;
        a.href = indexToLink[index];

        contentTable.appendChild(a);
    }
}

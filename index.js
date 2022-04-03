// base path in url
const getMainPath = () => {
    const path = window.location.pathname.split('/').splice(1);
    let mainPath = '';

    for (const fragment of path) {
        if (/.*html/.test(fragment)) {
            mainPath += fragment;
        } else {
            break;
        }
    }

    return mainPath;
}

const MAIN_PATH = getMainPath();

// bar searcher
const topicSearcher = document.getElementById('search-topic');
const listTopicResults = document.getElementById('list-topic-results');

const indexToLink = {
    'installation': `${MAIN_PATH}/views/installation.html`,
    'introduction': `${MAIN_PATH}/views/intro.html`,
    'hello world program': `${MAIN_PATH}/views/hello-world.html`,
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
        p.onclick = () => {
            window.location.replace(indexToLink[index])
        };
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

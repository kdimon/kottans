/**
 * Data request
 *
 * @param url
 * @returns {Promise}
 */
function getHttp(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if(this.status == 200) {
                resolve(this.response);
            }else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
}

/**
 * Clear outputted data before new request
 */
function clearOutputtedData() {
    let repoSections = [...document.getElementsByClassName('repos')];

    if(repoSections.length) {
        for(let i = 0; i < repoSections.length; i++) {
            repoSections[i].remove();
        }
    }
}

let submit = document.getElementById('submit');

submit.addEventListener('click', function() {
    clearOutputtedData();

    let username = document.getElementById('username').value;

    if(!username.length) {
        alert('Please, enter user/organization name!');
        return;
    }

    let url = `https://api.github.com/users/${username}/repos`;

    getHttp(url)
        .then(
            response => {
                console.clear();
                console.log(response);
                let repo = JSON.parse(response);
                return repo;
            },
            error => console.log(`Rejected: ${error}`)
        )
        .then(
            repo => {
                console.log(repo);
                let mainSection = document.getElementById('mainContent');

                let dateOptions = {
                    month: 'short',
                    day: 'numeric'
                };

                repo.forEach(function(item) {
                    let _description = (item.description == null) ? 'No description' : item.description,
                        _language = (item.language == null) ? '' : item.language,
                        _fork = (item.fork == true) ? 'A fork' : 'No a fork',
                        date = new Date(item.updated_at),
                        _updatedDate = date.toLocaleString('en-US', dateOptions);

                    let markup = `<section class="repos mdl-card mdl-shadow--2dp through mdl-shadow--16dp">
                                      <div class="mdl-card__title name">
                                          <a href="${item.html_url}" class="mdl-card__title-text mdl-button--accent">${item.name}</a>
                                      </div>
                                      <div class="mdl-card__supporting-text">
                                          ${_description}
                                      </div>
                                      <div class="mdl-card__supporting-text">
                                          <span><i class="material-icons md-14">star_rate</i> <span class="stars">${item.stargazers_count}</span></span>
                                          <span class="updated-date">Updated on ${_updatedDate}</span>
                                          <span>${_language}</span>
                                          <span>${_fork}</span>
                                      </div>
                                  </section>`;

                    mainSection.insertAdjacentHTML('beforeEnd', markup);
                });
            }
        );
});

/**
 * Compare data for correct sorting
 *
 * @param val1
 * @param val2
 * @returns {number}
 */
function compareData(val1, val2) {
    return val1 - val2;
}


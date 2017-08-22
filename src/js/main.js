let submit = document.getElementById('submit');

submit.addEventListener('click', function() {
	let username = document.getElementById('username').value;

	if(!username.length) {
	    return alert('Please, enter user/organization name!');
    }

    let body = document.body;
    let repoSections = document.getElementsByClassName('repos');

    // @todo Remove existing markup of section
	if(repoSections.length) {
        repoSections.remove();
    }

    let url = `https://api.github.com/users/${username}/repos`;

    getHttp(url)
        .then(
            response => {
                console.log(response);
                let repo = JSON.parse(response);
                return repo;
            },
            error => console.log(`Rejected: ${error}`)
        )
        .then(
            repo => {
                console.log(repo);
                repo.forEach(function(item) {
                    // @todo Add 'forked from'
                    let markup = `<section class="repos">
                                      <div>${item.name}</div>
                                      <div>${item.description}</div>
                                      <div>${item.stargazers_count}</div>
                                      <div>${item.updated_at}</div>
                                      <div>${item.language}</div>
                                  </section>`;
                    body.insertAdjacentHTML('beforeEnd', markup);

                });
            }
        );
});

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
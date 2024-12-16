document.addEventListener("DOMContentLoaded", function() {
    const submit = document.querySelector('input[type="submit"]')
    
    submit.addEventListener("click", function(e) {
        e.preventDefault();
        
        const input = document.querySelector("#search").value;
        
        fetch(`https://api.github.com/search/users?q=${input}`)
        .then(response => response.json())
        .then(data => {
            const list = document.querySelector("#user-list")
            const repos = document.querySelector("#repos-list")
            list.innerHTML = "";
            repos.innerHTML = "";
            data.items.forEach(item => {
                const listItem = document.createElement("li");
                const login = item.login;
                listItem.innerHTML = `
                <div>
                    <p>${login}<p>
                    <img src="${item.avatar_url}" alt="${item.login}">
                    <a href="${item.html_url}" target="_blank">Link to Profile</a>
                </div>
                `
                
                list.appendChild(listItem);

                listItem.addEventListener("click", function() {
                    list.innerHTML = "";
                    fetch(`https://api.github.com/users/${login}/repos`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(repo => {
                            const reposList = document.createElement("li")
                            reposList.innerHTML = `
                            <div>
                                <p>${repo.name}<p>
                                <p>${repo.description}
                                <a href="${repo.html_url}" target="_blank">Link to Repo</a>
                            </div>
                            `
                        repos.appendChild(reposList);
                        });
                        

                    })
                });
            });
        });
    });
    
    
});
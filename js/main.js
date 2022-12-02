let btn = document.querySelector(".btn");
let container = document.querySelector(".container");
let title = document.querySelector("#film");
let type = document.querySelector("#type");
let films = [];
let page = 1;

btn.addEventListener("click", function() {
    getFilm(title, type, null);
    
});
//по нажтию на кнопку детaли, выводим еще один блок с конкретным 
//фильмом и более детальным описанием
async function getFilmById(id){
    const queryParams = {
        apiKey: "f8219ff2",
        i: id,
    };

    let url = "http://www.omdbapi.com/?" + new URLSearchParams(queryParams)
    let response = await fetch(url);
    films = await response.json();
    console.log(films);

    let blockImform = document.createElement("div");
    blockImform.className = "blockImform";
    let textInfo = document.createElement("h3");
    textInfo.innerHTML = "Film info:"
    let contInfo = document.createElement("div");
    contInfo.className = "contInfo";
    let filmImg = document.createElement("div");
    filmImg.className = "img";
    let imgPost = document.createElement("img");
    imgPost.src = films.Poster;
    let infoFilm = document.createElement("div");
    infoFilm.className = "infoFilm";
    let table = document.createElement("table");
    table.className = "table"
    

    const infoView = {
        Title: films.Title,
        Released: films.Released,
        Genre: films.Genre,
        Country: films.Country,
        Director: films.Director,
        Writer: films.Writer,
        Actors: films.Actors,
        Awards: films.Awards,
    };

for(let key in infoView){
let tr = document.createElement("tr");
let tdKey = document.createElement("td");
let tdValue = document.createElement("td");
tdKey.innerHTML = key;
tdValue.innerHTML = infoView[key];
tr.append(tdKey,tdValue);
table.append(tr);
infoFilm.append(table);

    blockImform.append(textInfo,contInfo);
    filmImg.append(imgPost);
    contInfo.append(filmImg, infoFilm);
    container.append(blockImform);
    console.log(infoView)
}
}

async function getFilm(title, type, page){

    //убираем дублирование блоков
    if(document.querySelector('.block')){
        document.querySelector('.block').remove();
    }
    if(document.querySelector('.text')){
        document.querySelector('.text').remove();
    }
    
    const queryParams = {
        apiKey: "f8219ff2",
        s: title.value,
        type: type.value,
        page: page,
    };

    let url = "http://www.omdbapi.com/?" + new URLSearchParams(queryParams)
    let response = await fetch(url);
     films = await response.json();
    console.log(films);
    //добавляем блок для фильмов
    let block = document.createElement('div');
        block.className = 'block';
        let text = document.createElement('h3');
        let pagination = document.createElement("div");
        text.className = 'text';
        text.innerHTML = 'Films:'
        pagination.className = "pagination"
        container.append(text, block, pagination);
        

    //Выводим информацию о фильме: картинка и описание
    for(let film of films.Search){
        let filmBlock = document.createElement("div");
        let filmInfo = document.createElement("div");
        let typeFilm = document.createElement("p");
        let nameFilm = document.createElement("p");
        let yearFilm = document.createElement("p");
        let btnDetels = document.createElement("button");
        let post = document.createElement("img")
        filmInfo.className = "filmInfo"//изменить класс
        btnDetels.innerHTML = "Details";
        btnDetels.className = "btnDetels"

        
        let img = document.createElement('div');
        filmBlock.className = "filmBlock";
        img.className = "img";
        post.src = film.Poster;
        typeFilm.innerHTML = film.Type;
        nameFilm.innerHTML = film.Title;
        yearFilm.innerHTML = film.Year;
        img.append(post);
        filmInfo.append(typeFilm, nameFilm, yearFilm, btnDetels) ;
        filmBlock.append(img, filmInfo);
        block.append(filmBlock);

        
        btnDetels.addEventListener("click", function(){
            let filmId = film.imdbID;
           getFilmById(filmId)
        })

    }

    //Пагинация
    let notesOnPage = 10;
   
        let countOfItems = Math.ceil(films.totalResults 
            / notesOnPage); 
        for(let i = 1; i <= countOfItems; i++){
            let button = document.createElement("button");
            button.innerHTML = i;
            pagination.append(button);
    
            for (let elem of document.querySelectorAll('button')){
                if(+page === +elem.innerHTML){
                    elem.classList.add('active');
                } else elem.classList.remove('active');
            }
   
      button.addEventListener("click", function(){
            if(document.querySelector('.pagination')){
                document.querySelector('.pagination').remove();
            }
            let page = this.innerHTML;
            getFilm(title, type, page);
        })
    }
    
    
    }
    

    

    


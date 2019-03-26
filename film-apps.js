var vue = new Vue({
    el: "#vue",
    data: {
        searchquery: "",

        movies: [],
        isSuccess: false,
        moviesCount: 0,
        error:"Movii tyookookokokook"

    },
    methods: {
        search() {
            fetch("http://www.omdbapi.com/?apikey=df357c6e&s=" + this.searchquery)
                .then((res) => { return res.json(); })
                .then((res) => {
                    if (res.Response == "True") {
                        this.isSuccess = true;
                        this.movies = res.Search;
                        this.moviesCount = res.totalResults;
                
                    } else {
                        this.isSuccess = false;
                this.error=res.Error;    
                    }

                });

        },
        open(ID) {
            window.location.href = "https://www.imdb.com/title/" + ID;
        }
    }
})
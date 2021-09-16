const filterProducts = {
    data() {
        return {
            userSearch: '',
            searchShow: false
        }
    },
    template: `<div class="search">
                <button class="search__icon" @click="searchShow=!searchShow"></button>
                <form action="#" class="search-form" v-show="searchShow">
                    <input class="search__input" type="text" v-model="userSearch" @input="$parent.$refs.products.filterProd(userSearch)">
                </form>
            </div>`
}
Vue.component('filter-products', {
    template: `<form action="#" class="search-form" @submit.prevent="$root.filterProducts">
                    <input type="text" v-model="$root.searchValue">
                    <button type="submit">Search</button>
                </form>`
});
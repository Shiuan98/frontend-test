<template>
  <div class="homeContent">
  <div class="container">
        <div class="row">
            <div class="categoryList" v-for="category in filteredCategories" :key="category.id" @click="openCategory(category)">
                <i class="fas" :class="'fa-' + category.icon"></i>
                <h3 class="text-center categoryTitle">{{ category.title }}</h3>
                <p class="text-center articles">{{ category.totalArticle }} articles</p>
                <p class="text-center update">Last update {{ formatTimeAgo(category.updatedOn) }}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    fetchCategories() {
      axios.get('/api/categories')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
        });
    },
    openCategory(category) {
      this.$router.push({ name: 'Category' })
      sessionStorage.setItem('category', JSON.stringify(category));
    },
    formatTimeAgo(updatedOn) {
      return dayjs(updatedOn).fromNow();
    },
  },
  mounted() {
    this.fetchCategories();
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category => category.enabled == true);
    }
  },
};
</script>

<style lang="scss" scoped>
.homeContent{margin:74px auto 0;background:#FAFAFA;}
.homeContent .row{padding:60px 0 60px;gap:20px;display:grid;grid-template-columns: repeat(3,1fr);justify-items:center;}
.homeContent .row .categoryList{border: 1px solid #EEEEEE;border-radius: 0;background-color: #FFFFFF;cursor: pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px;box-sizing:border-box;}
.homeContent .row .categoryList i {font-size: 50px;color:#03A84E;margin-bottom: 20px;}
.homeContent .row .categoryList .categoryTitle {font-size:20px;color:#373737;line-height:24px;}
.homeContent .row .categoryList .articles {margin-top:20px;font-size:13px;line-height:15.6px;color:#03A84E;}
.homeContent .row .categoryList .update {font-size:11px;line-height:13.2px;color:#9C9AA6;}

@media (max-width: 767px){
  .homeContent .row{grid-template-columns: repeat(1,1fr);padding:30px 20px;}
}

</style>
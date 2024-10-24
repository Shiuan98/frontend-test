<template>
  <div class="categoryContent">
        <div class="container">
            <div class="breadcrumb"><span class="allCategory"  @click="$router.push({ name: 'Home' })">All categories</span> <i class="fas fa-chevron-right"></i> <span class="categoryName">{{ this.category.title }}</span> <i v-if="selectedArticle != ''" class="fas fa-chevron-right"></i> <span class="articleName">{{ selectedArticle }}</span></div>
            <div class="row">
              <div class="selectedCategory">
                <i class="fas" :class="'fa-' + category.icon"></i>
                <h3 class="text-center categoryTitle">{{ category.title }}</h3>
                <p class="text-center update">Updated {{ formatTimeAgo(category.updatedOn) }}</p>
                <hr />
                <div class="selectedDescription">
                  <i class="fas fa-info-circle info"></i>
                  <p class="description">{{ category.description }}</p>
                </div>
              </div>
              <div class="articlesList">
              <div class="article" v-for="article in filteredArticles" :key="article.id" @click="toggleAuthor(article.authorId, article.id, article.title)">
                <div class="articleWrap">
                    <div>
                        <i class="fas" :class="'fa-' + article.icon"></i>
                    </div>
                    <div class="titleContent">
                        <h3>{{ article.title }}</h3>
                        <p class="update">Updated {{formatDate(article.updatedOn)}}</p>
                    </div>
                    <div class="arrow-right">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  <div v-if="selectedArticleId === article.id" class="author-name">
                    Author: {{ authors[article.id] }}
                  </div>
              </div>
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
      category:[],
      articles:[],
      authors: {},
      selectedArticleId: null,
      selectedArticle:"",
    };
  },
  methods: {
    fetchCategoryData(categoryId) {
      axios.get(`/api/category/${categoryId}`)
        .then(response => {
          this.articles = response.data; 
        })
        .catch(error => {
          console.error("Error fetching category data:", error);
        });
    },
    formatTimeAgo(updatedOn) {
      return dayjs(updatedOn).fromNow();
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',   
        day: '2-digit',   
        year: 'numeric',  
      });
    },
    toggleAuthor(authorId, articleId, articleTitle) {
      this.selectedArticle = articleTitle;
      if (this.selectedArticleId === articleId) {
        this.selectedArticleId = null;
        this.selectedArticle = null;
      } else {
        this.selectedArticleId = articleId;

        if (!this.authors[articleId]) {
          axios
            .get(`/api/author/${authorId}`)
            .then((response) => {
              const authorName = response.data.name;
              this.$set(this.authors, articleId, authorName);
            })
            .catch((error) => {
              console.error('Error fetching author data:', error);
            });
        }
      }
    },
  },
  mounted() {
    const storedCategory = sessionStorage.getItem('category');
    this.category = JSON.parse(storedCategory);
    this.fetchCategoryData(this.category.id);
  },
  computed: {
    filteredArticles() {
      return this.articles.filter(article => article.status == 'published');
    }
  },
};
</script>

<style lang="scss" scoped>
.categoryContent{margin:74px auto 0;background:#FAFAFA;padding-bottom:60px;}
.categoryContent .breadcrumb{padding-top:21px;padding-bottom:22px;margin-bottom:0;}
.categoryContent .breadcrumb .allCategory {font-size:13px;line-height:22px;color:#03A84E;cursor:pointer;}
.categoryContent .breadcrumb i {font-size:10px;color:#D3D3D3;line-height:22px;margin:0 10px;}
.categoryContent .breadcrumb .categoryName, .categoryContent .breadcrumb .articleName  {font-size:13px;line-height:22px;color:#9C9AA6;}

.categoryContent .selectedCategory{border: 1px solid #EEEEEE;border-radius: 0;background-color: #FFFFFF;cursor: pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 0;box-sizing:border-box;width:280px;height:345px;margin-right:60px;}
.categoryContent .selectedCategory i {font-size: 50px;color:#03A84E;margin-bottom: 20px;}
.categoryContent .selectedCategory .categoryTitle {font-size:23px;color:#373737;line-height:27.6px;}
.categoryContent .selectedCategory .update {font-size:11px;line-height:22px;color:#9C9AA6;margin-bottom:5px;}
.categoryContent .selectedCategory hr{width:100%;background:#EEEEEE;}
.categoryContent .selectedCategory .selectedDescription{display:flex;flex-direction:column;align-items:center;}
.categoryContent .selectedCategory .selectedDescription i{font-size:20px;margin-bottom:10px;}
.categoryContent .selectedCategory .selectedDescription .description{font-size:13px;line-height:18px;color:#9C9AA6;text-align:center;}

.categoryContent .articlesList{width:calc(100% - 340px);row-gap:17.52px;display:flex;flex-direction:column;padding:0;}
.categoryContent .articlesList .article .articleWrap{width:100%;background:#ffffff;border:1px solid #EEEEEE;border-radius:4px;height:91.54px;display:flex;align-items:center;padding:0 40px;cursor:pointer;}
.categoryContent .articlesList .article i {font-size:20px;color:#03A84E;}
.categoryContent .articlesList .article .arrow-right{margin-left:auto;}
.categoryContent .articlesList .article .titleContent{margin-left:40px;}
.categoryContent .articlesList .article .titleContent h3{margin-bottom:0;font-size:20px;line-height:24px;color:#373737;}
.categoryContent .articlesList .article .titleContent p{font-size:11px;line-height:22px;color:#9C9AA6;margin-bottom:0;}

@media (max-width: 767px){
  .categoryContent .selectedCategory{width:100%;margin-right:0;}
  .categoryContent .articlesList{width:100%;margin-top:20px;}
}
</style>
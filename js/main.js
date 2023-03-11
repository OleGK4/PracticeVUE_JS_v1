let product = "Socks";
let eventBus = new Vue()


Vue.component('product', {

    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
        eventBus.$on('comment-submitted', comment => {
            this.comments.push(comment)
        })
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
    <div class="product-image">
            <img alt="#" :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
        <div class="product-title">
            <h1 style="margin-top: 10px">{{ title }}</h1>
            <span style="color: #ff8200; padding-left: 20px; font-size: 180%">{{ sale }}</span>
        </div>            
            <a :href="link">More products like this</a>
            <p class="product-info" v-if="inStock === false" :class="{ productInfoOutOfStock: !inStock }">Out of stock!</p>
            <p class="product-info" v-else-if="inventory > 10">In stock</p>
            <p class="product-info" v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p class="product-info" v-else :class="{ productInfoOutOfStock: !inStock }">Out of stock</p>

            <div
                 class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)"
            >            
            </div>
            <div>
                <div
                  class="drop-zone"
                  @drop="onDrop($event, 1)"
                  @dragover.prevent
                  @dragenter.prevent
                  >
                  <div 
                   v-for="item in listOne"
                   :key="item.variantId"
                   class="drag-el">
                    {{ item.variantId }}
                  </div>
                </div>
                <div         
                  class="drop-zone"
                  @drop="onDrop($event, 1)"
                  @dragover.prevent
                  @dragenter.prevent
                  >
                  <div
                   class="drag-el"
                   :key="item.variantId"
                   v-for="item in listTwo"
                   draggable
                   @dragstart="startDrag($event, item)"
                   > 
                    {{ item.variantId }}
                  </div>
                </div>               
            </div>
            <h4>Sizes:</h4>
            <ul> 
                <li v-for="sizes in sizes">{{ sizes }}</li>
            </ul>
            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>
            <button class="button-delete" v-on:click="delFromCart">Del from cart</button>
        </div>
   
    
   <product-tabs :comments="comments" :reviews="reviews" ></product-tabs>
   

   </div>
 `,
    data() {
        return {
            product: "НАСКИ",
            brand: 'Вуе Ауе',
            selectedVariant: 0,
            altText: "ПАРА НАСКОВ",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            reviews: [],
            comments: [],


            variants: [
                {
                    variantId: 2234,
                    variantList: 1,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: true,
                },
                {
                    variantId: 2235,
                    variantList: 2,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: false,
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        delFromCart() {
            this.$emit('del-from-cart', this.variants[this.selectedVariant].variantId);
        },
        startDrag(evt, item) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('productID', item.variantId)
        },
        onDrop(evt, list) {
            const productID = evt.dataTransfer.getData('productID')
            const item = this.variants.find((item) => item.variantId == productID)
            item.variantList = list
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
    },
    computed: {
        listOne() {
          return this.variants.filter((item) => item.variantList === 1)
        },
        listTwo() {
            return this.variants.filter((item) => item.variantList === 2)
        },
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.variants[this.selectedVariant].variantOnSale === true) {
                return ' ON SALE!'
            } else {
                return '';
            }
        },
    }
})





Vue.component('product-review', {

    template: `
    <form class="review-form" @submit.prevent="onSubmit">
     <p>
       <label for="name">Name:</label>
       <input required id="name" v-model="name" placeholder="name">
     </p>
    
     <p>
       <label for="review">Review:</label>
       <textarea id="review" v-model="review"></textarea>
     </p>
    
     <p>
       <label for="rating">Rating:</label>
       <select id="rating" v-model.number="rating">
         <option>5</option>
         <option>4</option>
         <option>3</option>
         <option>2</option>
         <option>1</option>
       </select>
     </p>
    <p v-if="errors.length">
     <b>Please correct the following error(s):</b>
     <ul>
       <li v-for="error in errors">{{ error }}</li>
     </ul>
    </p>
     
    <fieldset>
        <legend>Would you recommend this product?</legend>
        <div class="radio-block">
          <label for="yes">Yes</label>
            <input type="radio" id="yes" name="choice" v-model="choice" value="Yes" />
          <label for="no">No</label>
            <input type="radio" id="no" name="choice" v-model="choice" value="No" />
        </div>
    </fieldset>
     <p>
       <input type="submit" value="Submit">
     </p>
    
    </form>
 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            choice: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating && this.choice) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    choice: this.choice,

                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.choice = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.choice) this.errors.push("Choice required.")
            }
        },
    }
})

Vue.component('review-comment', {
    template: `
    <form class="review-form" @submit.prevent="toSubmit">
    <p>Your comment down below</p>
     <p>
       <label for="name">Name:</label>
       <input required id="name" v-model="name" placeholder="name">
     </p>
    
     <p>
       <label for="comment">Comment:</label>
       <textarea id="comment" v-model="comment"></textarea>
     </p>
     
      <p>
       <input type="submit" value="Submit"> 
     </p>
    
    </form>
    `,
    data() {
        return {
            name: null,
            comment: null,
            errors: [],
        }
    },
    methods: {
        toSubmit() {
            if(this.name && this.comment) {
                let comment = {
                    name: this.name,
                    comment: this.comment,
                }
                eventBus.$emit('comment-submitted', comment)
                this.name = null
                this.review = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.comment) this.errors.push("Comment required.")
            }
        },
    },
})





Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        },
        comments: {
            type: Array,
            required: false
        },
    },
    template: `
     <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Reviews'">
         <p v-if="!reviews.length">There are no reviews yet.</p>
         <p v-if="!comments.length">If there is a review, you can comment it!</p>
         <ul> 
           <li v-for="review in reviews">
              <p>Name: {{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>Review: {{ review.review }}</p>
              <p>Choice: {{ review.choice }}</p>
               
         <ul>
             <li v-for="comment in comments">
                 <p>Name: {{ comment.name }}</p>
                 <p>Comment: {{ comment.comment }}</p>
             </li>
         </ul>   
           <div v-if="!comments.length<=5 && reviews.length">
                <review-comment></review-comment>
            </div>
           </li>      
         </ul>
        
       </div>
       <div v-show="selectedTab === 'Make a Review'">
         <product-review></product-review>
       </div>
       <div v-show="selectedTab === 'Shipping'">
                <product-shipping></product-shipping>
        </div>
        <div v-show="selectedTab === 'Details'">
            <h4>Characteristics:</h4>
            <product-detail></product-detail>
        </div>
     </div>

`,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'  // устанавливается с помощью @click
        }
    }
})


Vue.component('product-shipping', {
    template: `
     <p>Shipping: {{ shipping }}</p>
    `,
    computed: {
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
    }
})

Vue.component('product-detail', {
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    },
    template: `
    <ul> 
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,
})


let app = new Vue({

    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        deleteFromCart(id) {
            this.cart.shift(id);
        }

    }

})





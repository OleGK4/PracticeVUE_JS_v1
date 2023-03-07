let product = "Socks";


Vue.component('product', {
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
            <h1>{{ title }}</h1>
            <p class="product-info" v-if="inStock === false" :class="{ productInfoOutOfStock: !inStock }">Out of stock!</p>
            <p class="product-info" v-else-if="inventory > 10">In stock</p>
            <p class="product-info" v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p class="product-info" v-else :class="{ productInfoOutOfStock: !inStock }">Out of stock</p>
            <product-detail></product-detail>
            <p>Shipping: {{ shipping }}</p>

            <div
                 class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)"
            >
            </div>

            <ul>
                <li v-for="sizes in sizes">{{ sizes }}</li>
            </ul>

            <h2>{{ sale }}</h2>


            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>
            <button class="button-delete" v-on:click="delFromCart">Del from cart</button>

         



        </div>
   </div>
 `,
    data() {
        return {
            product: "НАСКИ",
            brand: 'Вуе Ауе',
            selectedVariant: 0,
            altText: "ПАРА НАСКОВ",
            // inStock: false,
            inventory: 100,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: true,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: false,
                }
            ],


            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        delFromCart() {
            this.$emit('del-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

    },
    computed: {
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
        cart: []
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





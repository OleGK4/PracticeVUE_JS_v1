let product = "Socks";

let app = new Vue({

    el: '#app',
    data: {
        product: "НАСКИ",
        brand: 'Вуе Ауе',
        selectedVariant: 0,
        altText: "ПАРА НАСКОВ",
        // inStock: false,
        inventory: 100,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
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
                variantQuantity: 0,
                variantOnSale: false,
            }
        ],


        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        delFromCart() {
            this.cart -= 1
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
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.variants[this.selectedVariant].variantOnSale === true){
                return ' ON SALE!'
            }else {
                return '';
            }
        }

    }
})

Vue.component('product', {
    template: `
   <div class="product">

   </div>
 `,
    data() {
        return {
            // тут будут данные
        }
    },
    methods: {
        // тут будут методы
    },
    computed: {
        // тут будут вычисляемые свойства
    }
})




// let app2 = new Vue({
//
//     el: '#app2',
//     data: {
//         product: "НАСКИ ЗЕЛЕНЬ",
//         image: "./assets/vmSocks-green-onWhite.jpg",
//         altText: "ПАРА НАСКОВ",
//         inStock: true,
//         inventory: 10,
//         details: ['80% cotton', '20% polyester', 'Gender-neutral']
//     }
// })


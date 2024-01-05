productSales = new Vue({
    el : '#productSales',
    data : {
        modalHeight: true,
        variant : 0,
        scrollPosition: 0,
        modalDisplay: false,
        index: 0,
        size: 0,
        qty: 1,
        reqSize: "",
        packaging: "-",
        navMobile : false, 
        informasi: [
            "Hatarika",
            "Jl. Sudirman No.xx",
            "hatarika@mail.com",
            "(021) 2552-xxx",
        ],
        products: [
            {
                Id: 1,
                no: 0,
                imgSrc: "image/black-canvas.jpg",
                name: "Black Canvas",
                altText: "black canvas",
                price: 900000,
                discount: true,
                discPrice: 500000,
            },
            {
                Id: 2,
                no: 1,
                imgSrc: "image/sneakers.jpeg",
                altText: "black sneakers",
                name: "Black Sneakers",
                price: 2000000,
                discount: true,
                discPrice: 1500000,
            },
            {
                Id: 3,
                no: 2,
                imgSrc: "image/red-canvas.jpeg",
                altText: "red canvas",
                name: "Red Canvas",
                price: 1300000,
                discount: true,
                discPrice: 1750000,
            },
            {
                Id: 4,
                no: 3,
                imgSrc: "image/running-shoes.jpeg",
                altText: "running shoes",
                name: "Running Shoes",
                price: 3000000,
                discount: true,
                discPrice: 2500000,
            },
            {
                Id: 5,
                no: 4,
                imgSrc: "image/boots.jpeg",
                altText: "black boots",
                name: "Black Boots",
                price: 1200000,
                discount: true,
                discPrice: 600000,
            },
        ],
        cartItems : [
        ],
    },
    methods: {
        modalOpen(id, variant) {
            scrollPosition = window.scrollY;
            window.scrollTo(0, 0);
            this.modalDisplay = true;
            if (variant === 1) {
                this.variant = variant;
                this.index = id;
                console.log(id); 
            } else if (variant === 2) {
                this.variant = variant;
                this.modalHeight = false;            
            } else if (variant === 3) {
                this.variant = variant;
                this.navMobile = true;
                this.modalHeight = false;
            }
        },
        
        modalClose() {
            window.scrollTo(0, scrollPosition);
            this.modalDisplay = false;
            this.modalHeight = true;
            this.index = 0;
            this.size = 0;
            this.qty = 1;
            this.reqSize = "";
            this.packaging = "-";
            this.navMobile = false;
        },

        qtyPlus() {
           this.qty = parseInt(this.qty) + 1;
        },

        qtyMinus() {
            if (this.qty > 0) {
                this.qty -= 1;
            }
        },

        qtyFill() {
            if (this.qty === 0) {
                this.qty = null;
            }
        },

        qtyUnFill() {
            if (this.qty === null || this.qty === "") {
                this.qty = 0;
            } 
        },

        buy(buy) {
            if (buy === "buyCart") {
                url = "https://wa.me/6281529371587?text=" + encodeURIComponent("Hallo, Saya ingin memesan\n\n");
                for (let i = 0; i < this.cartItems.length; i++) {
                url += encodeURIComponent(
                    "Produk: " + this.cartItems[i].name + "\n" +
                    "Ukuran: " + this.cartItems[i].size + "\n" +
                    "Jumlah: " + this.cartItems[i].qty + "\n" +
                    "Request Size: " + this.cartItems[i].reqSize + "\n" +
                    "Packaging: " + this.cartItems[i].packaging + "\n\n" );
                }
                url += encodeURIComponent("Terimakasih")
            } else if(buy === "buy") {
                url = "https://wa.me/6281529371587?text=" +
                encodeURIComponent(
                    "Hallo, Saya ingin memesan\n" +
                    "Produk: " + this.products[this.index].name + "\n" +
                    "Ukuran: " + this.size + "\n" +
                    "Jumlah: " + this.qty + "\n" +
                    "Request Size: " + (this.reqSize ? this.reqSize : "-") + "\n" +
                    "Packaging: " + this.packaging + "\n\nTerimakasih"
                    );
                }
            window.location.href = url;
        },
        randomAddCart() {

        },
        addToCart() {
            let addCart = {
                imgSrc: this.products[this.index].imgSrc,
                altText: this.products[this.index].altText,
                name: this.products[this.index].name,
                price: this.products[this.index].discount ? this.products[this.index].discPrice : this.products[this.index].price,
                size: this.size,
                qty: this.qty,
                packaging: this.packaging,
                reqSize: this.reqSize? this.reqSize : "-",
            };
            addCart.total = this.qty * addCart.price;

            this.cartItems.push(addCart);
            this.cartItems = this.cartItems.map((item, index) => {
                return { ...item, index: index };
              });
        },
        deleteCartItem(id) {
            this.cartItems.splice(id, 1);
            this.cartItems = this.cartItems.map((item, index) => {
                return { ...item, index: index };
              });
        },
        displayedPrice(number) {
            const formattedString = number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
            return formattedString
        },
        totalAll() {
            return this.cartItems.reduce((total, item) => total + item.total, 0);
        }
    },
    computed : {

    },
});
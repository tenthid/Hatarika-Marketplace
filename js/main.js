productSales = new Vue({
    el : '#productSales',
    data : {
        modalHeight: true,
        variant : "",
        scrollPosition: 0,
        modalDisplay: false,
        index: 0,
        size: 0,
        qty: 1,
        reqSize: "",
        packaging: "-",
        navMobile : false,
        waNum: "6281529371587", 
        waUrl: "",
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
        // modalOpen(id, variant) {
        //     scrollPosition = window.scrollY;
        //     window.scrollTo(0, 0);
        //     this.modalDisplay = true;
        //     if (variant === 1) {
        //         this.variant = variant;
        //         this.index = id;
        //     } else if (variant === 2) {
        //         this.variant = variant;
        //         this.modalHeight = false;            
        //     } else if (variant === 3) {
        //         this.variant = variant;
        //         this.navMobile = true;
        //         this.modalHeight = false;
        //     }
        // },

        // -- modal open --
        modalDetailOpen(id) {
            this.scrollPosition = window.scrollY;
            this.modalDisplay = true;
            window.scrollTo(0, 0);
            this.index = id;
            this.variant = "modalDetail";
            this.modalHeight = true;
            // console.log(this.scrollPosition);
        },
        modalCartOpen() {
            this.scrollPosition = window.scrollY;
            this.modalDisplay = true;
            window.scrollTo(0, 0);
            this.modalHeight = false;
            this.variant = "modalCart";
            // console.log(this.scrollPosition);
        },
        modalNavMobileOpen() {
            this.scrollPosition = window.scrollY;
            this.modalDisplay = true;
            window.scrollTo(0, 0);
            this.navMobile = true;
            this.modalHeight = false;
            this.variant = "modalNavMobile";
            // console.log(this.scrollPosition);
        },

        // -- modal close --
        modalDetailClose() {
            window.scrollTo(0, this.scrollPosition);
            this.modalDisplay = false;
            this.index = 0;
            this.size = 0;
            this.qty = 1;
            this.reqSize = "";
            this.packaging = "-";
            this.variant = "";
            // console.log(this.scrollPosition);
        },
        modalCartClose() {
            window.scrollTo(0, this.scrollPosition);
            this.modalDisplay = false;
            this.modalHeight = true;
            this.variant = "";
            // console.log(this.scrollPosition);
        },
        modalNavMobileClose() {
            window.scrollTo(0, this.scrollPosition);
            this.modalDisplay = false;
            this.navMobile = false;
            this.variant = "";
            // console.log(this.scrollPosition);
        },
        // modalClose() {
        //     window.scrollTo(0, scrollPosition);
        //     this.modalDisplay = false;
        //     this.modalHeight = true;
        //     this.index = 0;
        //     this.size = 0;
        //     this.qty = 1;
        //     this.reqSize = "";
        //     this.packaging = "-";
        //     this.navMobile = false;
        // },
        qtyPlus() {
           this.qty = parseInt(this.qty) + 1;
        //    this.qty += 1;
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
        urlFill(isRepeat, fill) {
            let url = encodeURIComponent(
                (isRepeat ? "" : "Hallo, Saya ingin memesan\n") +
                "Produk: " + (isRepeat? fill.size : this.products[this.index].name) + "\n" +
                "Ukuran: " + (isRepeat ? fill.size : this.size) + "\n" +
                "Jumlah: " + (isRepeat ? fill.qty : this.qty) + "\n" +
                "Request Size: " + (isRepeat ? fill.reqSize : this.reqSize) + "\n" +
                "Packaging: " + (isRepeat ? fill.packaging : this.packaging) +
                (isRepeat? "\n\n" : "")
              );
            return url
        },
        buy(buyVariant) {
            if (buyVariant === "buyCartItems") {
                this.waUrl = "https://wa.me/" + this.waNum + "?text=";
                this.waUrl += encodeURIComponent("Hallo, Saya ingin memesan\n\n");
                for (let i = 0; i < this.cartItems.length; i++) {
                    this.waUrl += this.urlFill(true, this.cartItems[i]);
                }
                this.waUrl += encodeURIComponent("Terimakasih")
            } else if(buyVariant === "buyItem") {
                    this.waUrl = "https://wa.me/" + this.waNum + "?text=";
                    this.waUrl += this.urlFill(false);
                    this.waUrl += encodeURIComponent("\n\nTerimakasih");
                }
            window.location.href = this.waUrl;
            // console.log(this.waUrl);
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
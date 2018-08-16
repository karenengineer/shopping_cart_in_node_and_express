module.exports = function data(oldCart) {
    this.items = oldCart.items || 0;
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, quantity, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0
            };
        }
        quantity = parseInt(quantity);
        storedItem.qty += quantity;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty += quantity;
        this.totalPrice += storedItem.price;
    };

    this.generateArray = () => {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }

        return arr;
    };

    this.removeItem = (id) => {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };
};

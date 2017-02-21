function formatCurrency(value) {
    return "$" + value.toFixed(2);
}
 
var CartLine = function() {
    var self = this;
    self.category = ko.observable();
    self.product = ko.observable();
    self.quantity = ko.observable(1);
    self.subtotal = ko.computed(function() {
        return self.product() ? self.product().price * parseInt("0" + self.quantity(), 10) : 0;
    });
 
    // Whenever the category changes, reset the product selection
    self.category.subscribe(function() {
        self.product(undefined);
    });
};
 
var Cart = function() {
    // Stores an array of lines, and from these, can work out the grandTotal
    var self = this;
    self.lines = ko.observableArray([new CartLine()]); // Put one line in by default
    self.grandTotal = ko.computed(function() {
        var total = 0;
        $.each(self.lines(), function() { 
            total += this.subtotal();
        });
        return total;
    });    
 
    // Operations
    self.addLine = function() { 
        self.lines.push(new CartLine());
    };

    self.removeLine = function(line) { 
        self.lines.remove(line);
    };

    self.totalItems = ko.computed(function() {
        var count = 0;
        $.each(self.lines(), function() {            
            if(this.subtotal() > 0) {
                count += parseInt(this.quantity());
            }            
        });
        return count;
    });

    self.save = function() {
        var dataToSave = $.map(self.lines(), function(line) {
            return line.product() ? {
                productName: line.product().name,
                quantity: line.quantity()
            } : undefined;
        });
        alert("Saved");
    };
};
 
ko.applyBindings(new Cart());
var MenuItem = Backbone.Model.extend({
    defaults: {
	id: '',
	name: '',
	img: '',
	calories: 0,
	rating: 0,
	description: ''
    }
});

var MenuItemsCollection = Backbone.Collection.extend({
    model: MenuItem
});

var item1 = new MenuItem({
    id: 'chicken-pomegranate-salad',
    name: 'Chicken Pomegranate Salad',
    image: 'chicken-pomegranate-salad.jpg',
    calories: 430,
    rating: 4.1,
    description: 'A simple, sweet and delicious salad of chicken, pomegranates, spinach, and spiced candied walnuts. Served with a side of citrus vinaigrette.',
    source: 'https://www.pexels.com/photo/salad-pomegranate-chicken-spinach-5916/',
    photographer: 'Karolina Grabowska.STAFFAGE'
});

var item2 = new MenuItem({
    id: 'strawberry-pudding',
    name: 'Strawberry Pudding',
    image: 'strawberry-pudding.jpg',
    calories: 280,
    rating: 5,
    description: 'A sweet and tasty pudding filled with strawyberries, blueberries, and raspberries.',
    source: 'https://www.pexels.com/photo/restaurant-dessert-pudding-strawberries-3674/',
    photographer: ''
});

var item3 = new MenuItem({
    id: 'ham-goat-cheese-croissant',
    name: 'Ham and Goat Cheese Croissant',
    image: 'ham-goat-cheese-croissant.jpg',
    calories: 670,
    rating: 3.9,
    description: 'A savory slice of ham topped with a wedge of goat cheese, all on a buttery, flaky croissant.',
    source: 'https://www.pexels.com/photo/croissant-bakery-plate-food-7390/',
    photographer: ''
});

var MenuItems = new MenuItemsCollection();
MenuItems.add(item1);
MenuItems.add(item2);
MenuItems.add(item3);

var MenuItemsView = Backbone.View.extend({

    el: '#table-body',

    initialize: function() {
	this.render();
	selectedItemView.render();
    },

    render: function() {
	this.$el.html('');

	MenuItems.each(function(model) {
	    var menuItem = new MenuItemView({
		model: model
	    });

	    this.$el.append(menuItem.render().el);
	}.bind(this));

	return this;
    }

});

var MenuItemView = Backbone.View.extend({

    tagName: 'tr',

    events: {
	'click .select-item': 'selectItem'
    },

    selectItem: function(e) {
	e.preventDefault();
	console.log(this.model.get('name') + ' was clicked!');
    },

    template: _.template($('#menuItem-template').html(), {variable: 'menuItem'}),

    render: function() {
	this.$el.html(this.template(this.model.attributes));
	return this;
    }

});

var SelectedItem = Backbone.Model.extend({
    defaults: {
	selected: false,
	item: ''
    }
});

var selectedItem = new SelectedItem();

var SelectedItemView = Backbone.View.extend({
    model: selectedItem,

    el: '#selected-item',

    initialize: function() {
	this.model = selectedItem;
	this.render();
    },

    render: function() {
	var content;
	if (this.model.get('selected')) {
	    content = "You are going to eat: ";
	} else {
	    content = "Aren't you hungry? You have not picked anything to eat yet.";
	}

	this.$el.html(content);

	return this;
    }
});

var selectedItemView = new SelectedItemView();

var app = new MenuItemsView();

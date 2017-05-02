Vue.component("vue-tree-list", {
	props: {
		listModel: Object
	},
	data: function () {
		return {
			tmpModel: {}
		};
	},
	mounted: function() {
	},
	methods: {
		addSelectedElements: function(event) {
			/*
			for (var property in event.data) {
			    if (event.data.hasOwnProperty(property)) {
			    	this.l[property] = event.data[property];
			    }
			}
			this.$emit('input', this.l);
			*/
		},
		addSelection: function(level, id, event) {
			var arrLevel = this.tmpModel[level];
			
			if (!(arrLevel instanceof Array)) {
				arrLevel = new Array();
				this.tmpModel[level] = arrLevel;
			}

			if (event.target.checked) {
				arrLevel.push(id);
			} else {
				arrLevel.splice(arrLevel.indexOf(id), 1);
			}

			this.$emit('change', this.tmpModel);
		},
		addSubTreeSelection: function(event) {
			for (var level in event) {
			    if (event.hasOwnProperty(level)) {
			    	this.tmpModel[level] = event[level];
			    }
			}
			this.$emit('change', this.tmpModel);
		}
	},
	template: "\
		<ul>\
			<li v-for=\"item in listModel.items\">\
				<input type=\"checkbox\" @change=\"addSelection(listModel.level, item.id, $event)\" />\
				<label>{{ item.label }}</label>\
				<vue-tree-list\
						@change=\"addSubTreeSelection($event)\"\
						:list-model=\"item\">\
				</vue-tree-list>\
			</li>\
		</ul>\
	"
});
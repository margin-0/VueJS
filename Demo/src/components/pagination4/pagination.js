(function() {

/*
	使用方法：
	

	注释：
		<fz-pagination :pagination="pagination" :callback="loadData" :options="paginationOptions" :size="size"></fz-pagination>


		pagination: {
            total: 0,//总共有多少个分页单元
            per_page: 12,    // required 平均展示多少个分页单元
            current_page: 1, // required 当前的所在的位置
            last_page: 6,    // required 最后的分页单元
            from: 1,		//分页单元中间显示数组起始位置
            to: 12           // 分页单元中间显示数组终点位置
        },
        paginationOptions: {
	        offset: 4,
	        previousText: 'Prev',
	        nextText: 'Next',
	        alwaysShowPrevNext: true
	    },

*/ 

    var tm = `<nav>
        		<ul class="pagination" v-if="pagination.last_page > 0" :class="sizeClass">
            		<li v-if="showPrevious()" :class="{ 'disabled' : pagination.current_page <= 1 }">
                		<span v-if="pagination.current_page <= 1">
                    		<span aria-hidden="true">{{ config.previousText }}</span>
                		</span>
                		<a href="#" v-if="pagination.current_page > 1 " :aria-label="config.ariaPrevioius" @click.prevent="changePage(pagination.current_page - 1)">
                    		<span aria-hidden="true">{{ config.previousText }}</span>
                		</a>
            		</li>

            		<li v-for="num in array" :class="{ 'active': num === pagination.current_page }">
                		<a href="#" @click.prevent="changePage(num)">{{ num }}</a>
            		</li>

            		<li v-if="showNext()" :class="{ 'disabled' : pagination.current_page === pagination.last_page || pagination.last_page === 0 }">
                		<span v-if="pagination.current_page === pagination.last_page || pagination.last_page === 0">
                    		<span aria-hidden="true">{{ config.nextText }}</span>
                		</span>
                
                		<a href="#" v-if="pagination.current_page < pagination.last_page" :aria-label="config.ariaNext" @click.prevent="changePage(pagination.current_page + 1)">
                    		<span aria-hidden="true">{{ config.nextText }}</span>
                		</a>
            		</li>
        		</ul>
    		</nav>`;
    var cusPagination = Vue.extend({
        template: tm,
        props: {
	        pagination: {
	            type: Object,
	            required: true
	        },
	        callback: {
	            type: Function,
	            required: true
	        },
	        options: {
	            type: Object
	        },
	        size: {
	            type: String
	        }
	    },
        computed: {
	        array () {
	        	var lastP = this.pagination.last_page;//公共显示分页个数
	        	var curP = this.pagination.current_page;//当前所在分页器位置
	        	var offsetVal = this.config.offset;//最大显示个数

	            if (lastP <= 0) {
	                return [];
	            }
	            var from = curP - (offsetVal-parseInt(offsetVal/2));
	            var to = 1;
	            var arr = [];
	            if(lastP > 11){
	            	if (from < 1) {
		                from = 1;
		                to = offsetVal;
		            }else{
		            	
		            	to = curP + parseInt(offsetVal/2)-1;
		            	from = to - offsetVal+1;
		            	if(from >= (lastP-parseInt(offsetVal) + 1)){
		            		from = lastP-parseInt(offsetVal) + 1;
		            		to = lastP;
		            	}
		            }
	            }
	            console.log(from);
	            console.log(to);
	            while (from <=to) {
	                arr.push(from);
	                from++;
	            }
	            console.dir(arr);
	            return arr;
	        },
            config () {
	            return Object.assign({
	                offset:11,//默认显示中间页面个数
	                ariaPrevious: 'Previous',
	                ariaNext: 'Next',
	                previousText: '«',
	                nextText: '»',
	                alwaysShowPrevNext: true
	            }, this.options);
	        },
	        sizeClass () {
	            if (this.size === 'large') {
	                return 'pagination-lg';
	            } else if(this.size === 'small') {
	                return 'pagination-sm';
	            } else {
	                return '';
	            }
	        }
        },
        watch: {
	        'pagination.per_page' (newVal, oldVal) {
	        	console.log(newVal);
	        	console.log(oldVal);
	            if (+newVal !== +oldVal) {
	                this.callback();
	            }
	        }
	    },
        methods: {
	        showPrevious () {
	        	console.log('showPrevious');
	        	console.log(this.config);
	            return this.config.alwaysShowPrevNext || this.pagination.current_page > 1;
	        },
	        showNext () {
	        	console.log('showNext');
	            return this.config.alwaysShowPrevNext || this.pagination.current_page < this.pagination.last_page;
	        },
	        changePage (page) {
	        	console.log('changePage');
	            if (this.pagination.current_page === page) {
	                return;
	            }

	            this.$set(this.pagination, 'current_page', page);
	            this.callback();
	        }
	    }
    })
    window.Pagination = cusPagination;
})()

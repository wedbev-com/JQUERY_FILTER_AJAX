jQuery(function () {
    initFilterAjax();
});


function initFilterAjax() {
    jQuery('.filter-form').filterAjax();
}


;(function ($) {
    function FilterAjax(options) {
        this.options = $.extend({
            holder: '.tabs-wrap',
            container: '.items-list'
        }, options);
        this.init();
    }
    FilterAjax.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
            }
        },
        findElements: function () {
            this.form = $(this.options.holder);
            this.container = $(this.options.container);
            this.formUrl = this.form.attr('action') ;
            this.formMethod = this.form.attr('method') ;
        },
        attachEvents: function () {
            var self = this;
            this.form.on('submit', function(e){
                e.preventDefault();
                self.ajaxLoad();
            });
        },
        ajaxLoad: function(){
            var self = this;
            $.ajax({
                method:  this.formMethod || 'POST',
                url: this.formUrl,
                data: this.form.serialize(),
                success: function (data) {
                    self.container.html(data);
                },
                error:function () {
                    console.log('ajax error');
                }
            });
        },
        myCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
        }
    };
    // jquery plugin
    $.fn.filterAjax = function (opt) {
        return this.each(function () {
            $(this).data('FilterAjax', new FilterAjax($.extend({
                holder: this
            }, opt)));
        });
    };
}(jQuery));
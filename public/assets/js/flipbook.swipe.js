/* v 3.7.1
author http://codecanyon.net/user/creativeinteractivemedia/portfolio?ref=creativeinteractivemedia
*/

var FLIPBOOK = FLIPBOOK || {};

FLIPBOOK.BookSwipe = function(el, wrapper, model, options) {

    this.options = options
    this.singlePage = options.singlePageMode
    this.pageWidth = this.options.pageWidth
    this.pageHeight = this.options.pageHeight
    this.slides = []
    this.pagesArr = []
    this.leftPage = 0
    this.rightPage = 0
    this.rotation = 0

    this.prevPageEnabled = false

    this.setRightIndex(options.rightToLeft ? options.pages.length : 0)
    this.currentSlide = 0
    this.flipping = false;

    // this.watch("rightIndex",function(){
    //     debugger
    // });

    this.wrapper = wrapper

    this.$wrapper = jQuery(wrapper)

    //debug

    // this.$wrapper.css('overflow', "visible")
    // this.$wrapper.parent().css('overflow', "visible")

    // debug end

    this.scroller = el
    this.$scroller = jQuery(this.scroller).removeClass('book').addClass('flipbook-carousel-scroller')

    this.iscroll = new IScroll(this.wrapper, {

        // momentum: true,
        snap: true,
        snapSpeed: 200 * this.options.pageFlipDuration,
        // snapSpeed: 500,
        // keyBindings: false,
        // hScrollbar: false
        // zoom: true,
        // mouseWheel: true,
        // wheelAction: 'zoom',

        freeScroll: true,

        scrollX: true,
        scrollY: false,

        // preventDefault: true,
        preventDefault: false,

        disableTouch:true,
        eventPassthrough  : 'vertical'

        // HWCompositing:false,

        // mouseWheel: true,
        // wheelAction: 'zoom',
        // scrollbars: true
    });


    for (var i = 0; i < 3; i++) {

        var $slide = jQuery('<div class="flipbook-carousel-slide"><div class="slide-inner"/></div>"').appendTo(this.$scroller)
        this.slides.push($slide)

    }

    this.slides[0].iscroll = new IScroll(this.slides[0][0], {
          // scrollbars: true,
        zoom: true,
        scrollX: true,
        scrollY: true,
        freeScroll: true,
        keepInCenterV: true,
        keepInCenterH: true,
        preventDefault: false,
    })

    // this.slides[0].iscroll.refresh()

    this.slides[2].iscroll = new IScroll(this.slides[2][0], {
          // scrollbars: true,
        zoom: true,
        scrollX: true,
        scrollY: true,
        freeScroll: true,
        keepInCenterV: true,
        keepInCenterH: true,
        preventDefault: false,
    })

    // this.slides[2].iscroll.refresh()


    this.slides[1].iscroll = new IScroll(this.slides[1][0], {
        // scrollbars: true,
        zoom: true,
        scrollX: true,
        scrollY: true,
        freeScroll: true,
        keepInCenterV: true,
        keepInCenterH: true,
        // scrollbars: false,
        preventDefault: false,
        // preventDefault: true,
        // HWCompositing:false,
    })

    // this.slides[1].iscroll.refresh()

    for (var i = 0; i < 3; i++) {

        this.slides[i].iscroll.on("zoomEnd", function() {

            var scale = options.main.zoom
            this.options.eventPassthrough = scale > 1 ? '' : 'vertical'
            this.options.freeScroll = scale > 1
            this.refresh()

        })

    }
    



    this.slides[1].iscroll.on("zoomStart", function() {

        // debugger

        // this.options.preventDefault = true
        // this.refresh()

        // self.disableFlip()
    })

    // this.slides[0].iscroll.disable()
    // this.slides[1].iscroll.disable()
    // this.slides[2].iscroll.disable()

    this.resizeInnerSlides()

    var page

    var pageOptions = {
        rightToLeft: options.rightToLeft,
        numPages: options.numPages,
        pdfMode: options.pdfMode
    }

    for (var i = 0; i < options.numPages; i++) {

        page = new FLIPBOOK.PageSwipe(model, options, i, options.pages[i].src, options.pages[i].htmlContent)

        this.pagesArr.push(page)

        if (options.loadAllPages)
            page.load()
    }

    var self = this

    this.iscroll.on("scrollStart", function() {

        return

        self.disablePan()
    })

    this.iscroll.on("scrollEnd", function() {

        var sliderPage = this.currentPage.pageX

        if(self.currentSlide == sliderPage)
            return

        //self.enablePan()

        // console.log("")
        // console.log("scrollEnd")
        // console.log("sliderPage:", sliderPage)

        /*if (sliderPage == 1) {
            self.flipping = false;
            self.updateVisiblePages()
            return
        }*/

        if (self.singlePage) {

            if (sliderPage > self.currentSlide)

                self.setRightIndex(self.rightIndex + 1);

            else if (sliderPage < self.currentSlide)

                self.setRightIndex(self.rightIndex - 1);

        } else {

            if (sliderPage > self.currentSlide)

                self.setRightIndex(self.rightIndex + 2);

            else if (sliderPage < self.currentSlide)

                self.setRightIndex(self.rightIndex - 2);
        }

        self.currentSlide = sliderPage

        self.updateVisiblePages()

        self.flipping = false;

    })

    this.flipEnabled = true

    this.nextEnabled = true
    this.prevEnabled = true

    model.on("toolMove", function() {
        self.updateTool()
    })

    model.on("toolSelect", function() {
        self.updateTool()
    })

    model.on('pageLoaded', function(e){
       // console.log(e)
    })

}


FLIPBOOK.BookSwipe.prototype.constructor = FLIPBOOK.BookSwipe;

FLIPBOOK.BookSwipe.prototype = {

    goToPage: function(value, instant) {

        if (!this.enabled)
            return

        // console.log("    ##### gotopage "+value)
        // debugger

        if (!this.flipEnabled) return

        if (value > this.options.pages.length)
            value = this.options.pages.length

        if (this.singlePage || value % 2 != 0) 
            value--;

        if (isNaN(value) || value < 0)
            value = 0

        this.resetZoom()

        if (instant) {
            this.setRightIndex(value)
            this.updateVisiblePages()
            return
        }


        if (this.singlePage) {

            if (this.options.rightToLeft && this.options.oddPages && value < 1)
                value = 1

            if (value > this.rightIndex) {

                this.setSlidePages(this.currentSlide + 1, [value])
                this.setRightIndex(value - 1)
                this.nextPage(instant);

            } else if (value < this.rightIndex) {

                this.setSlidePages(this.currentSlide - 1, [value])
                this.setRightIndex(value + 1)
                this.prevPage(instant);

            }

        } else {

            if (this.options.rightToLeft && this.options.oddPages && value < 2)
                value = 2

            if (value > this.rightIndex) {

                if (value >= this.pagesArr.length) {

                    this.setSlidePages(2, [value - 1, value])
                    this.setRightIndex(value - 2)
                    this.goToSlide(2, instant)

                } else {

                    this.setSlidePages(this.currentSlide + 1, [value - 1, value])
                    this.setRightIndex(value - 2)
                    this.nextPage(instant);

                }

            } else if (value < this.rightIndex) {

                if (value == 0) {

                    this.setRightIndex(value + 2)
                    this.setSlidePages(0, [value])
                    this.goToSlide(0, instant)

                } else {

                    this.setRightIndex(value + 2)
                    this.setSlidePages(this.currentSlide - 1, [value - 1, value])
                    this.prevPage(instant);

                }

            }
        }

    },

    setRightIndex: function(value) {

        this.rightIndex = value

    },

    nextPage: function(instant) {

       // if (!this.flipEnabled) return

        /*if (this.flipping) 
            return;*/

        if (this.currentSlide == 2)
            return

        this.flipping = true;

        this.goToSlide(this.currentSlide + 1, instant)

        /*if(this.mode == 1)
            this.rightIndex++;*/

    },

    prevPage: function(instant) {

      //  if (!this.flipEnabled) return

        /*if (this.flipping) 
            return;*/

        if (this.currentSlide == 0)
            return;

        this.flipping = true;

        this.goToSlide(this.currentSlide - 1, instant)

        /*if(this.mode == 1)
            this.rightIndex--;*/

    },

    enablePrev: function(val) {

        this.prevEnabled = val

    },

    enableNext: function(val) {

        this.nextEnabled = val

    },

    // onPageUnloaded:function(index,size){

    //     var pageIndex = index

    //     if (this.options.rightToLeft)
    //         pageIndex = this.options.pages.length - index - 1

    //     this.pagesArr[pageIndex].unload()

    // },

    resetZoom: function() {

        return
        /* for (var i = 0; i < this.slides.length; i++) {
             if (this.slides[i].iscroll.scale !== 1)
                 this.slides[i].iscroll.zoom(1, 0, 0, 0)
             this.slides[i].iscroll.refresh()
             // this.slides[i].iscroll.refresh()
         }*/

        if (this.slides[1].iscroll.scale !== 1)
            this.slides[1].iscroll.zoom(1, 0, 0, 0)
        this.slides[1].iscroll.refresh()
        // this.slides[i].iscroll.refresh()


        this.enableFlip()
    },

    setSlidePages: function(slide, pages) {

        var arr = []
        for (var i = 0; i < pages.length; i++) {
            arr.push(pages[i].index)
        }

       // console.log(slide,pages)

        if (this.slides[slide].pages) {

            if (arr.join("") === this.slides[slide].pages.join("")){
                // console.log(arr)
                // console.log(this.slides[slide].pages)
                return
            }

        }

        /*if(this.slides[slide].pages && (this.slides[slide].pages.join("") == pages.join(""))) 
            return;*/

        this.clearSlidePages(slide)

        var slideInner = this.slides[slide].find('.slide-inner')

        // slideInner.width(2 * this.options.pageTextureSize * this.options.pageWidth / this.options.pageHeight)

        for (var i = 0; i < pages.length; i++) {

            var pageIndex = pages[i].index

            // console.log("setSlidePages slide:"+slide+" pageIndex:"+pageIndex)

            if (this.pagesArr[pageIndex]) {

                slideInner.append(this.pagesArr[pageIndex].$wrapper)
                this.slides[slide].pages.push(pageIndex)

            }

        }

        this.resizeInnerSlides()

        if (this.slides[slide].iscroll)
            this.slides[slide].iscroll.refresh()

        // this.zoomTo(.25)
        // this.slides[slide].iscroll.refresh()

        // this.slides[slide].iscroll.zoom(.1, 0, 0, 0);

        // this.slides[slide].show()

    },

    updateTool: function() {

        switch (this.options.main.tool) {

            case "toolSelect":
                this.disableFlip()
                this.disablePan()
                jQuery(".flipbook-textLayer").css("pointer-events", "auto").removeClass(".flipbook-noselect")
                break;

            case "toolMove":
                this.onZoom(this.options.main.zoom)
                jQuery(".flipbook-textLayer").css("pointer-events", "none").addClass(".flipbook-noselect")
                break;
        }

    },

    clearSlidePages: function(slide) {

        this.slides[slide].find('.slide-inner').empty()
        this.slides[slide].pages = []

        // var test = jQuery("<p>SLIDE</p>")

        // this.slides[slide].find('.slide-inner').append(test)
        // this.slides[slide].hide()

    },

    setZoomPages: function(pages) {

        if (this.$zoomScroller.pages && (this.$zoomScroller.pages.join("") == pages.join("")))
            return;

        this.$zoomScroller.empty()
        this.$zoomScroller.pages = []

        for (var i = 0; i < pages.length; i++) {

            var pageIndex = pages[i]

            if (this.pagesArr[pageIndex]) {

                this.$zoomScroller.append(this.pagesArr[pageIndex].$wrapper)
                this.$zoomScroller.pages.push(pageIndex)

            }

        }
    },

    resizeZoomPages: function(pages, scale) {

        var h = this.$wrapper.height() * scale
        var pdfSize = parseInt(h / 500) * 500 + 500
        if (pdfSize < 500) pdfSize = 500
        if (pdfSize > 2000) pdfSize = 2000

        // this.options.pageTextureSize = pdfSize

        for (var i = 0; i < pages.length; i++) {

            var pageIndex = pages[i]

            if (this.pagesArr[pageIndex]) {
                /*this.pagesArr[pageIndex].$wrapper.height(this.zoomScroll.scrollerHeight)
                this.pagesArr[pageIndex].$wrapper.width(this.zoomScroll.scrollerWidth/2)*/
                //this.pagesArr[pageIndex].pageTextureSize = pdfSize
                this.pagesArr[pageIndex].load()

            }

        }
    },

    getCurrentSlidePages: function() {

        if (this.singlePage)

            return [this.rightIndex];

        else
            return [this.rightIndex - 1, this.rightIndex];


    },

    clearSlide: function(slide) {

        this.slides[slide].empty()

    },

    hasPage: function(slide, page) {


    },

    loadVisiblePages: function() {

        var self = this
        var toLoad
        var main = this.options.main

        var index = this.rightIndex

        if(this.options.rightToLeft && this.options.oddPages) index--;

        var right = this.pagesArr[index]
        var left = this.pagesArr[index - 1]
        var next = this.pagesArr[index + 1]
        var afterNext = this.pagesArr[index + 2]
        var prev = this.pagesArr[index - 2]
        var beforePrev = this.pagesArr[index - 3]

        if(this.singlePage){

            if(right){

                right.load(function() {

                    main.setLoadingProgress(1)
                    if (left) left.load()
                    if (next) next.load()

                })

            }else if(left){
                left.load()
            }



        }else{
            if (left) {

                left.load(function() {

                    if (right) {
                        right.load(function() {

                            main.setLoadingProgress(1)
                            if (prev) prev.load()
                            if (beforePrev) beforePrev.load()
                            if (next) next.load()
                            if (afterNext) afterNext.load()

                        })
                    } else {

                        main.setLoadingProgress(1)
                        if (prev) prev.load()

                        if (beforePrev) beforePrev.load()
                    }

                })
            } else {

                if (right) {

                    right.load(function() {

                        main.setLoadingProgress(1)
                        if (next) next.load()
                        if (afterNext) afterNext.load()

                    })
                }

            }
        }

    },

    updateVisiblePages: function() {

        var self = this
        var toLoad
        var main = this.options.main

        var index = this.rightIndex

        if(this.options.rightToLeft && this.options.oddPages) index--;

        var right = this.pagesArr[index]
        var left = this.pagesArr[index - 1]
        var next = this.pagesArr[index + 1]
        var afterNext = this.pagesArr[index + 2]
        var prev = this.pagesArr[index - 2]
        var beforePrev = this.pagesArr[index - 3]

        if (this.singlePage) {

           if(!left){
                //cover
                this.setSlidePages(0, [right])
      
                if(next)
                    this.setSlidePages(1, [next])
                else
                    this.clearSlidePages(1)
                this.goToSlide(0,true)

                this.clearSlidePages(2)

            }else{

               if(next){

                    this.setSlidePages(1, [right])
                    this.setSlidePages(0, [left])
                    this.setSlidePages(2, [next])
                    this.goToSlide(1,true)

               }else{

                    this.setSlidePages(2, [right])
                    this.setSlidePages(1, [left])
                    this.goToSlide(2,true)

                    this.clearSlidePages(0)

               }
                
            }


        } else {

            if(!left){
                //cover
                this.setSlidePages(0, [right])

                if(afterNext)
                    this.setSlidePages(1, [next, afterNext])
                else
                    this.setSlidePages(1, [next])

                this.goToSlide(0,true)

                this.clearSlidePages(2)

            }else{

                if(right){

                    //L R

                    if(!next){

                        this.setSlidePages(2, [left, right])

                        if(beforePrev)
                            this.setSlidePages(1, [beforePrev, prev])
                        else
                            this.setSlidePages(1, [prev])

                        this.goToSlide(2,true)

                        this.clearSlidePages(0)

                    }else{

                        if(prev){

                            this.setSlidePages(1, [left, right])

                            if(beforePrev)
                                this.setSlidePages(0, [beforePrev, prev])
                            else
                                this.setSlidePages(0, [prev])

                           if(afterNext)
                            this.setSlidePages(2, [next, afterNext])
                        else
                            this.setSlidePages(2, [next])

                            this.goToSlide(1,true)

                        }else{
                            this.setSlidePages(0, [left, right])

                            if(afterNext)
                            this.setSlidePages(1, [next, afterNext])
                        else
                            this.setSlidePages(1, [next])

                            this.clearSlidePages(2)
                        }


                        


                    }
                    
                }else{
                    this.setSlidePages(2, [left])

                    if(beforePrev)
                        this.setSlidePages(1, [beforePrev, prev])
                    else
                        this.setSlidePages(1, [prev])

                    this.goToSlide(2,true)
                    this.clearSlidePages(0)

                }
            }

        }

        this.loadVisiblePages()

        this.options.main.turnPageComplete()

    },

    loadPage: function(index) {

        if (this.pagesArr[index])
            this.pagesArr[index].load()

    },

    hidePage: function(index) {

    },

    showPage: function(index) {

    },

    disable: function() {

        this.enabled = false

    },

    enable: function() {

        this.enabled = true
        this.onResize()

    },

    resize: function() {

    },

    onResize: function() {

        var w = this.$wrapper.width()
        var h = this.$wrapper.height()
        this.w = w
        this.h = h

        if (w == 0 || h == 0) return;

        var pw = this.pageWidth
        var ph = this.pageHeight

        var portrait = 2 * this.options.zoomMin * pw / ph > w / h
        var doublePage = !this.options.singlePageMode && (!this.options.responsiveView || (w > this.options.responsiveViewTreshold || !portrait))
         //console.log("doublePage:", doublePage)
        var bw = doublePage ? 2*pw : pw
        var bh = ph
        this.bw = bw
        this.bh = bh

        var scale
        if (h / w > bh / bw) {
            //fit to width
            scale = (bh / bw) * w / this.options.pageTextureSize
        } else {
            scale = h / this.options.pageTextureSize
        }

        var spaceBetweenSlides = 0

        for (var i = 0; i < this.slides.length; i++) {

            this.slides[i].width(w + spaceBetweenSlides).height(h)

            if (this.slides[i].iscroll) {

                this.slides[i].iscroll.options.zoomMin = this.options.zoomMin * scale
                this.slides[i].iscroll.options.zoomMax = this.options.zoomMax * scale
                this.slides[i].iscroll.refresh()
            }

        }

        this.$scroller.width(this.$scroller.children().length * (w+spaceBetweenSlides))
        this.iscroll.refresh()

        //var portrait = bw / bh > w / h && w < this.options.responsiveViewTreshold && this.options.responsiveView
        // var portrait = 2 * this.options.zoomMin * this.pageWidth / this.pageHeight > w / h
        // var pw, ph

        // if (portrait) {
        //     pw = w
        //     ph = parseInt(w * this.pageHeight / this.pageWidth)
        // } else {
        //     ph = h
        //     pw = parseInt(h * this.pageWidth / this.pageHeight)
        // }

        if ((!doublePage || this.options.singlePageMode) && !this.singlePage) {

            // console.log("single page mode")

            if (this.rightIndex % 2 == 0 && this.rightIndex > 0)
                this.setRightIndex(this.rightIndex - 1);

            this.singlePage = true

            this.resizeInnerSlides()

        } else if (doublePage && !this.options.singlePageMode && this.singlePage) {

            // console.log("double page mode")


            if (this.rightIndex % 2 != 0)
                this.setRightIndex(this.rightIndex + 1);

            this.singlePage = false

            this.resizeInnerSlides()

        }

        this.updateVisiblePages()


    },

    resizeInnerSlides: function() {
        var pw = this.options.pageTextureSize * this.pageWidth / this.pageHeight

        if(this.rotation == 90 || this.rotation == 270)
            pw = this.options.pageTextureSize * this.pageHeight / this.pageWidth

        var sw = this.singlePage ? pw : 2 * pw

        // debugger
        for (var i = 0; i < 3; i++) {
            sw = this.slides[i].pages && this.slides[i].pages.length == 1 ? pw : 2 * pw
            this.slides[i].find(".slide-inner").width(sw)
        }
    },

    resizeInnerSlide: function(slide) {

        var pw = this.options.pageTextureSize * this.pageWidth / this.pageHeight

        if (this.slides[slide].pages.length == 1)
            this.slides[slide].find(".slide-inner").width(pw)
        else
            this.slides[slide].find(".slide-inner").width(pw)

    },


    goToSlide: function(slide, instant) {

        // console.log("gotoslide "+slide)

        var time = instant ? 0 : 300 * this.options.pageFlipDuration
        // var time = instant ? 0 : 500 * this.options.pageFlipDuration
        // time = 10

        if (this.iscroll.pages.length > 0)
            this.iscroll.goToPage(slide, 0, time)

        if (instant)
            this.currentSlide = slide

        this.zoomTo(this.options.zoomMin)

    },

    getCurrentSlide: function() {

        return this.currentSlide

    },

    zoomIn: function(value, time, e) {

        if (e && e.type === 'mousewheel')
            return
        this.zoomTo(value)

    },

    zoomTo: function(zoom, time, x, y) {

        if (!this.enabled)
            return

        var x = x || 0
        var y = y || 0
        var time = time || 0

        if (zoom > 1) {
            this.disableFlip()
        }

        if (w == 0 || h == 0) return;

        var w = this.w
        var h = this.h
        var pw = this.pageWidth
        var ph = this.pageHeight
        var bw = this.bw 
        var bh = this.bh

        var scale
        if (h / w > bh / bw) {
            //fit to width
            scale = (bh / bw) * zoom * w / this.options.pageTextureSize
        } else {
            scale = zoom * h / this.options.pageTextureSize
        }

        //var scale = zoom * this.$wrapper.height() / this.options.pageTextureSize

        // console.log(zoom)

        for (var i = 0; i < 3; i++) {

            if (this.slides[i].iscroll)

                this.slides[i].iscroll.zoom(scale, x, y, time);

        }

        this.onZoom(zoom)

        this.loadVisiblePages()

        // if (this.slides[this.currentSlide].iscroll)
        //     this.slides[this.currentSlide].iscroll.zoom(zoom, x, y, time);


    },

    zoomOut: function(value) {

        this.zoomTo(value)

    },

    onZoom: function(zoom) {
        // debugger
        // console.log("on zoom : ",zoom)
        if(this.options.main.tool == "toolSelect"){
            this.disableFlip()
            this.disablePan()
        } else if (zoom > 1) {
            this.disableFlip()
            this.enablePan()
        } else {
            this.enableFlip()
            // this.disablePan()
        }

        this.options.main.onZoom(zoom)

    },

    rotateLeft:function(){

        this.rotation = (this.rotation + 360 - 90)%360

        for (var i = 0; i < this.pagesArr.length; i++) {
            var page = this.pagesArr[i]
            page.setRotation(this.rotation)
        }

        this.resizeInnerSlides()
        this.onResize()
        console.log(this.rotation)

    },

    rotateRight:function(){

        this.rotation = (this.rotation + 360 + 90)%360

        for (var i = 0; i < this.pagesArr.length; i++) {
            var page = this.pagesArr[i]
            page.setRotation(this.rotation)
        }

        this.resizeInnerSlides()
        this.onResize()
        console.log(this.rotation)

    },

    enableAutoplay: function(val) {

        // this.main.enableAutoplay(val)

    },

    updateCurrentPage: function(val) {


    },

    enable: function() {
        this.enabled = true
    },

    disable: function() {
        this.enabled = false
    },

    onSwipe: function(event, phase, direction, distance, duration, fingerCount, fingerData) {
        //console.log(event, phase, direction, distance, duration, fingerCount, fingerData)
        /*if(e.type == 'touchend' && !direction)
            this.main.toggleMenu()*/

        if (phase == 'start')
            return;
        if (direction == 'up' || direction == 'down')
            return


        // if(fingerCount > 1){
        //     this.disablePan()
        // }
    },

    onPageLoaded: function(i, size) {

        var index = this.options.rightToLeft ? this.options.numPages - i - 1 : i;

        this.pagesArr[index].onPageLoaded(size, this.options.pages[i].canvas[size], this.options.pages[i].htmlContent)

        this.updateTool()
    },

    onPageUnloaded: function(i, size) {

        var index = this.options.rightToLeft ? this.options.numPages - i - 1 : i;

        // this.pagesArr[index].onPageUnloaded(size)
        this.pagesArr[index].unload()
    },

    disableFlip: function() {
        
        this.flipEnabled = false
        this.iscroll.disable()
    },

    enableFlip: function() {

        if(this.options.numPages == 1){
            this.disableFlip()
            return
        }
            
        
        this.flipEnabled = true
        this.iscroll.enable()
        // this.iscroll.disable()
        // this.slides[1].iscroll.options.preventDefault = false
        // this.slides[1].iscroll.refresh()
    },

    enablePan: function() {
        
        // this.slides[1].iscroll.options.preventDefault = true
        if (this.slides[0].iscroll)
            this.slides[0].iscroll.enable()
        if (this.slides[1].iscroll)
            this.slides[1].iscroll.enable()
        if (this.slides[2].iscroll)
            this.slides[2].iscroll.enable()
            // this.slides[1].iscroll.disable()
    },

    disablePan: function() {
        
        // this.slides[1].iscroll.options.preventDefault = false
        if (this.slides[0].iscroll)
            this.slides[0].iscroll.disable()
        if (this.slides[1].iscroll)
            this.slides[1].iscroll.disable()
        if (this.slides[2].iscroll)
            this.slides[2].iscroll.disable()
    }

}

FLIPBOOK.PageSwipe = function(model, options, index, texture, html) {

    this.rotation = 0
    this.index = index
    this.options = options
    this.texture = texture
    this.html = html
    this.index = index
    this.$wrapper = jQuery('<div>').addClass('flipbook-carousel-page')
    this.wrapper = this.$wrapper[0]
    this.model = model

    this.$inner = jQuery('<div>').appendTo(this.$wrapper).addClass('flipbook-carousel-page-inner')
    this.$img = jQuery('<img>')

    if(options.pagePreloader)
        this.$preloader = jQuery('<img src="' + options.pagePreloader + '" class="flipbook-page-preloader-image">').appendTo(this.$inner)
    else
        this.$preloader = jQuery('<img src="' + options.assets.spinner + '" class="flipbook-page-preloader">').appendTo(this.$inner)

    this.setSize(this.pw, this.ph)

    // jQuery('<div class="cssload-container"><div class="cssload-speeding-wheel"></div></div>').appendTo(this.$wrapper)

}

FLIPBOOK.PageSwipe.prototype = {

    load: function(callback) {

        var index = this.options.rightToLeft ? this.options.numPages - this.index - 1 : this.index

        if (this.options.pdfMode) {

            var model = this.model
            if(!model.wrapperH) return;
            if(!model.zoom) return;
            // console.log(model)

            // var size = this.options.pageTextureSize
            var o = this.options
            var pageSize = model.wrapperH * model.zoom
            var size = pageSize < o.pageTextureSizeTreshold ? o.pageTextureSizeSmall : o.pageTextureSize

            if (this.size == size) {
                if (callback) callback.call(this)
                return
            }

            this.size = size

            this.options.main.loadPage(index, this.size, callback)

        } else {

            var self = this

                if (this.loaded) {
                if (callback) callback.call(this)
                return
            }

            this.loaded = true

            this.options.main.loadPage(index, this.options.pageTextureSize, function(page) {

                var img = document.createElement('img')
                img.src = page.image.src

                self.$img = jQuery(img).addClass("page-carousel-img")

                var imgW = page.image.naturalHeight
                var imgH = page.image.naturalHeight
                var pw = self.options.pageWidth
                var ph = self.options.pageHeight
                var scaleY = ph / imgH
                var translateX = 0

                self.$img.appendTo(self.$inner)

                if (self.options.doublePage && self.index > 0 && self.index % 2 == 0) {

                    self.$img.css('left', '-100%')

                }

                if (self.options.doublePage) {

                    if (self.index == 0 || (self.index == (self.options.pages.length - 1) && !self.options.oddPages))
                        self.$img.css('width', '100%')
                    else
                        self.$img.css('width', '200%')

                } else
                    self.$img.css('width', '100%')

    

                if (page.htmlContent) {

                    self.htmlContent = page.htmlContent[0]
                    page.htmlContent.appendTo(self.$inner)

                    self.updateHtmlContentSize()

                }

                // self.$wrapper.css('background', 'none')

                self.setRotation()

                if (callback) callback.call(self)

            })

        }
    },

    unload: function() {

        this.loaded = false
        this.pageSize = 0
        this.size = 0

        this.$preloader.appendTo(this.$inner)


        // console.log("page ",this.index," unloaded")
    },

    onPageLoaded: function(size, canvas, htmlContent) {

        if (this.pageSize != size) {

            this.pageSize = size

            this.$inner.empty();
            jQuery(canvas).appendTo(this.$inner)
            jQuery(htmlContent).appendTo(this.$inner)
            
            this.htmlContent = htmlContent

            this.updateHtmlContentSize()

        }

    },

    dispose: function() {

        if (this.pageSize) {

            this.pageSize = null
            this.$inner.empty();

            // console.log('disposing page ' + this.index)

        }

    },

    setSize: function() {

        var h = this.options.pageTextureSize, w;

        if(this.rotation == 0 || this.rotation == 180){
            w = h * this.options.pageWidth / this.options.pageHeight
        }
        else{
            this.$wrapper.width(h).height(w)
            w = h * this.options.pageHeight / this.options.pageWidth
        }
        this.pw = w
        this.ph = h
        this.$wrapper.width(w).height(h)
        this.updateHtmlContentSize()

    },

    setRotation: function(val) {

        if(typeof val != 'undefined')
            this.rotation = val
        this.setSize()
        this.$img.css('transform', 'rotate('+ this.rotation + 'deg) translateZ(0)')
        if(this.rotation == 90 || this.rotation == 270)
            this.$img.width(this.$wrapper.height()).height(this.$wrapper.width())
        else
            this.$img.width(this.$wrapper.width()).height(this.$wrapper.height())
    },

    updateHtmlContentSize: function() {

        var scale = this.ph / 1000

        // console.log(this.height)

        // console.log('updateHtmlContentSize()')
        // console.log(this.htmlContent.style)

        if (this.htmlContent && this.htmlContent.style) {
            // this.htmlContent.style.transform = 'scale(' + scale + ')'
            this.htmlContent.style.transform = 'scale(' + scale + ') translateZ(0)'

            if (this.options.doublePage) {

                // if (this.index == 0 || (this.index == (this.options.pages.length - 1) && !this.options.oddPages))
                //     this.htmlContent.style.left = '0'
                // else
                //     this.htmlContent.style.left = '-100%'

                if (this.index % 2 == 0 && this.index > 0)
                    this.htmlContent.style.left = '-100%'
                else
                    this.htmlContent.style.left = '0'

            }

        }

    }

}
/* v 3.7.10
author http://codecanyon.net/user/creativeinteractivemedia/portfolio?ref=creativeinteractivemedia
*/
var FLIPBOOK = FLIPBOOK || {};

{ /* Main */
    (function init(jQuery, window, document, undefined) {

        jQuery.fn.flipBook = function(options) {
            return new FLIPBOOK.Main(options, this);
        };

        jQuery.fn.swipeBook = function(options) {
            options.viewMode = "swipe"
            return new FLIPBOOK.Main(options, this);
        };

        // DEFAULT OPTIONS
        jQuery.fn.flipBook.options = {

            name: "",

            /*array of page objects - this must be passed to plugin constructor
            {
                src:"page url",
                thumb:"page thumb url",
                title:"page title",
                htmlContent:"page html content"
            }*/
            pages: [],

            /*array of table_of_content objects
            {
                title:"Cover",
                page:"1",
            }*/
            tableOfContent: [],

            tableOfContentCloseOnClick: true,
            thumbsCloseOnClick:true,

            //set unique prefix to enable deep linking, for example prefix "book1_" will add hash #book1_{page number} to the end of url
            deeplinkingEnabled: false,
            deeplinkingPrefix: '',

            assets: {
                preloader: "images/preloader.jpg",
                overlay: "images/overlay.png",
                flipMp3: "mp3/turnPage.mp3",
                spinner: "images/spinner.gif"
            },

            //pdf source options
            pdfUrl: null,
            pdfBrowserViewerIfMobile: false,
            pdfBrowserViewerIfIE: false,
            pdfBrowserViewerFullscreen: true,
            pdfBrowserViewerFullscreenTarget: "_blank",
            pdfPageScale: 1,
            pdfOutline:true,

            htmlLayer: true,

            rightToLeft: false,

            //page that will be displayed when the book starts
            startPage: 0,

            //if the sound is enabled
            sound: true,

            backgroundColor: "rgb(81, 85, 88)",
            backgroundImage: "",
            backgroundPattern: "",
            backgroundTransparent: false,

            //book default settings
            thumbSize: 130,

            loadAllPages: false,
            loadPagesF: 2,
            loadPagesB: 1,

            autoplayOnStart: false,
            autoplayInterval: 3000,

            //UI settings

            skin: "light", //"dark", "light", "gradient"
            layout: "1", //"1", "2", "3", "4"

            menuOverBook: false,
            menuFloating: false,
            menuBackground: '',
            menuShadow: '',
            menuMargin: 0,
            menuPadding: 0,
            menuTransparent:false,

            menu2OverBook:true,
            menu2Floating: false,
            menu2Background:'',
            menu2Shadow: '',
            menu2Margin: 0,
            menu2Padding: 0,
            menu2Transparent:true,

            skinColor:'',
            skinBackground:'',

            floatingBtnColor:"#FFF",
            floatingBtnBackground:"#00000044",

            btnSize: 14,
            btnRadius: 2,
            btnMargin: 2,
            btnShadow: '',
            btnTextShadow: '',
            btnBorder: '',
            btnColor: '',
            btnColorHover: "",
            btnBackground: 'none',
            btnBackgroundHover: '',

            sideBtnSize: 30,
            sideBtnRadius: 0,
            sideBtnMargin: 0,
            sideBtnPaddingV: 5,
            sideBtnPaddingH: 0,
            sideBtnShadow: '',
            sideBtnTextShadow: '',
            sideBtnBorder: '',
            sideBtnColor: '#FFF',
            sideBtnBackground: '#00000033',

            btnOrder:[
                'currentPage',
                'btnFirst', 
                'btnPrev', 
                'btnNext', 
                'btnLast',
                'btnZoomIn',
                'btnZoomOut',
                'btnRotateLeft',
                'btnRotateRight',
                'btnAutoplay',
                'btnSearch',
                'btnSelect',
                'btnBookmark',
                'btnToc',
                'btnThumbs',
                'btnShare',
                'btnPrint',
                'btnDownloadPages',
                'btnDownloadPdf',
                'btnSound',
                'btnExpand',
                'btnClose'
            ],

            currentPage: {
                enabled: true,
                title: "Current page",
                vAlign:'top',
                hAlign:'left',
                marginH:0,
                marginV:0,
                color:'',
                background:''
            },

            btnFirst: {
                enabled: false,
                title: "First page",
                icon: "fa-angle-double-left",
                icon2: "first_page"
            },

            btnPrev: {
                enabled: true,
                title: "Previous page",
                icon: "fa-angle-left",
                icon2: "chevron_left"
            },

            btnNext: {
                enabled: true,
                title: "Next page",
                icon: "fa-angle-right",
                icon2: "chevron_right"
            },

            btnLast: {
                enabled: false,
                title: "Last page",
                icon: "fa-angle-double-right",
                icon2: "last_page"
            },

            btnZoomIn: {
                enabled: true,
                title: "Zoom in",
                icon: "fa-plus",
                icon2: "zoom_in"
            },

            btnZoomOut: {
                enabled: true,
                title: "Zoom out",
                icon: "fa-minus",
                icon2: "zoom_out"
            },

            btnRotateLeft: {
                enabled: false,
                title: "Rotate left",
                icon: "fas fa-undo"
            },

            btnRotateRight: {
                enabled: false,
                title: "Rotate right",
                icon: "fas fa-redo"
            },

            btnAutoplay: {
                enabled: true,
                title: "Autoplay",
                icon: "fa-play",
                icon2: "play_arrow",
                iconAlt:"fa-pause",
                iconAlt2:"pause",
            },

            btnSearch: {
                enabled: false,
                title: "Search",
                icon: "fas fa-search",
                icon2: "search"
            },

            btnSelect: {
                enabled: true,
                title: "Select tool",
                icon: "fas fa-i-cursor",
                icon2: "text_format"
            },

            btnBookmark: {
                enabled: true,
                title: "Bookmark",
                icon: "fas fa-bookmark",
                icon2: "bookmark"
            },

            btnToc: {
                enabled: true,
                title: "Table of Contents",
                icon: "fa-list-ol",
                icon2: "toc"
            },

            btnThumbs: {
                enabled: true,
                title: "Pages",
                icon: "fa-th-large",
                icon2: "view_module"
            },

            btnShare: {
                enabled: true,
                title: "Share",
                icon: "fa-link",
                icon2: "share",
                hideOnMobile:true
            },

            btnPrint: {
                enabled: true,
                title: "Print",
                icon: "fa-print",
                icon2: "print",
                hideOnMobile:true
            },

            btnDownloadPages: {
                enabled: true,
                title: "Download pages",
                icon: "fa-download",
                icon2: "file_download",
                url: "images/pages.zip",
                name: "allPages.zip"
            },

            btnDownloadPdf: {
                forceDownload: false,
                enabled: true,
                title: "Download PDF",
                icon: "fa-file",
                icon2: "picture_as_pdf",
                url: null,
                openInNewWindow: true,
                name: "allPages.pdf"
            },

            btnSound: {
                enabled: true,
                title: "Volume",
                icon: "fa-volume-up",
                iconAlt: "fa-volume-off",
                icon2: "volume_up",
                iconAlt2: "volume_mute",
                hideOnMobile:true
            },

            btnExpand: {
                enabled: true,
                title: "Toggle fullscreen",
                icon: "fa-expand",
                icon2: "fullscreen",
                iconAlt: "fa-compress",
                iconAlt2: "fullscreen_exit"
            },

            btnClose: {
                title: "Close",
                icon: "fa-times",
                icon2: "close",
                hAlign:'right',
                vAlign:'top'
            },

            btnShareIfMobile: false,
            btnSoundIfMobile: false,
            btnPrintIfMobile: false,

            sideNavigationButtons: true,

            hideMenu: false,

            //share

            google_plus: {
                enabled: true,
                url: null
            },

            twitter: {
                enabled: true,
                url: null,
                description: null
            },

            facebook: {
                enabled: true,
                load_sdk: true,
                url: null,
                app_id: null,
                title: null,
                caption: null,
                description: null,
                image: null
            },

            pinterest: {
                enabled: true,
                url: null,
                image: null,
                description: null
            },

            email: {
                enabled: true,
                title: null,
                description: null,
                url:null
            },

            pdf: {
                annotationLayer: false,
            },

            pageTextureSize: 2048, 
            pageTextureSizeSmall: 1024,
            pageTextureSizeTreshold:1024, //

            //flip animation type; can be "2d", "3d" , "webgl", "swipe"
            viewMode: 'webgl',
            singlePageMode: false,
            singlePageModeIfMobile: false,
            zoomMin: .95,
            // zoomLevels:[.85,1,2,3,4,5],
            zoomSize: null,
            zoomStep: 2,
            zoomTime:0,

            wheelDisabledNotFullscreen: false,
            arrowsDisabledNotFullscreen: false,

            responsiveView: true,
            responsiveViewTreshold: 768,
            minPixelRatio: 1, //between 1 and 2, 1.5 = best ratio performance FPS / image quality

            pageFlipDuration: 1,

            contentOnStart: false,
            thumbnailsOnStart: false,
            sideMenuOverBook:true,
            sideMenuOverMenu:false,
            sideMenuOverMenu2:true,

            //lightbox settings

            lightBox: false,
            lightBoxOpened: false,
            lightBoxFullscreen: false,
            lightboxCloseOnClick: false,
            lightboxResetOnOpen: true,
            lightboxBackground: null, //css of flipbook background, rgba or hexadecimal color or bg image, for example 'rgba(0,0,0,.5)' or '#F0F0F0' or 'url("overlay.png" ) repeat'
            lightboxStartPage: null,
            lightboxMarginV: '0',
            lightboxMarginH: '0',
            lightboxCSS: '',
            lightboxPreload:false,

            // WebGL settings

            disableImageResize:true, //disable image resize to power of 2 (needed for anisotropic filtering)

            pan: 0,
            panMax: 10,
            panMax2: 2,
            panMin: -10,
            panMin2: -2,
            tilt: 0,
            tiltMax: 0,
            tiltMax2: 0,
            tiltMin: -20,
            tiltMin2: -5,

            rotateCameraOnMouseMove: false,
            rotateCameraOnMouseDrag: true,

            lights: true,
            lightColor: 0xFFFFFF,
            lightPositionX: 0,
            lightPositionZ: 1400,
            lightPositionY: 350,
            lightIntensity: .6,

            shadows: true,
            shadowMapSize: 1024,
            shadowOpacity: .2,
            shadowDistance: 15,

            pageRoughness: 1,
            pageMetalness: 0,

            pageHardness: 2,
            coverHardness: 2,
            pageSegmentsW: 5,
            pageSegmentsH: 1,

            pageMiddleShadowSize: 2,
            pageMiddleShadowColorL: "#999999",
            pageMiddleShadowColorR: "#777777",

            antialias: false,

            // preloader
           
            preloaderText: '',

            fillPreloader: {
                enabled: false,
                imgEmpty: "images/logo_light.png",
                imgFull: "images/logo_dark.png",
            },

            // logo

            logoImg: '', //url of logo image
            logoUrl: '', // url target 
            logoCSS: 'position:absolute;',
            logoHideOnMobile: false,

            printMenu: true,
            downloadMenu: true,

            cover: true,
            backCover: true,

            textLayer: false,

            googleAnalyticsTrackingCode:null,

            // loadExtraPages:5,

            strings: {

                print: "Print",
                printLeftPage: "Print left page",
                printRightPage: "Print right page",
                printCurrentPage: "Print current page",
                printAllPages: "Print all pages",

                download: "Download",
                downloadLeftPage: "Download left page",
                downloadRightPage: "Download right page",
                downloadCurrentPage: "Download current page",
                downloadAllPages: "Download all pages",

                bookmarks: "Bookmarks",
                bookmarkLeftPage: "Bookmark left page",
                bookmarkRightPage: "Bookmark right page",
                bookmarkCurrentPage: "Bookmark current page",

                search: "Search",
                findInDocument: "Find in document",
                pagesFoundContaining: "pages found containing",

                thumbnails: "Thumbnails",
                tableOfContent: "Table of Contents",
                share: "Share",

                pressEscToClose:"Press ESC to close"


            },

            //mobile devices settings - override any setting for mobile devices
            mobile: {

            }

        };

        FLIPBOOK.Main = function(options, elem) {

            var self = this;
            this.elem = elem;
            this.$elem = jQuery(elem);
            this.$body = jQuery("body")
            this.body = this.$body[0]
            this.$window = jQuery(window)

            this.bodyHasVerticalScrollbar = function() {
                return self.body.scrollHeight > window.innerHeight
            }
            this.isZoomed = function() {
                return self.zoom > 1
            }
            // console.log(this.fullscreenFlipbook)
            this.options = {};

            
            var dummyStyle = document.createElement('div').style,
                vendor = (function() {
                    var vendors = 't,webkitT,MozT,msT,OT'.split(','),
                        t,
                        i = 0,
                        l = vendors.length;

                    for (; i < l; i++) {
                        t = vendors[i] + 'ransform';
                        if (t in dummyStyle) {
                            return vendors[i].substr(0, vendors[i].length - 1);
                        }
                    }
                    return false;
                })(),
                prefixStyle = function(style) {
                    if (vendor === '')
                        return style;

                    style = style.charAt(0).toUpperCase() + style.substr(1);
                    return vendor + style;
                },

                isAndroid = (/android/gi).test(navigator.appVersion),
                isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
                has3d = prefixStyle('perspective') in dummyStyle

            this.msie = window.navigator.userAgent.indexOf("MSIE ");

            this.isAndroid = isAndroid;
            this.has3d = has3d;

            //detect webgl


            function webgl_detect(return_context) {
                if (!!window.WebGLRenderingContext) {
                    var canvas = document.createElement("canvas"),
                        names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
                        context = false;

                    for (var i = 0; i < 4; i++) {
                        try {
                            context = canvas.getContext(names[i]);
                            if (context && typeof context.getParameter == "function") {
                                // WebGL is enabled
                                if (return_context) {
                                    // return WebGL object if the function's argument is present
                                    return {
                                        name: names[i],
                                        gl: context
                                    };
                                }
                                // else, return just true
                                return true;
                            }
                        } catch (e) {}
                    }

                    // WebGL is supported, but disabled
                    //return true;
                    return false;
                }

                // WebGL not supported
                return false;
            }

            function getInternetExplorerVersion()
            {
              var rv = -1;
              if (navigator.appName == 'Microsoft Internet Explorer')
              {
                var ua = navigator.userAgent;
                var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                  rv = parseFloat( RegExp.$1 );
              }
              else if (navigator.appName == 'Netscape')
              {
                var ua = navigator.userAgent;
                var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                  rv = parseFloat( RegExp.$1 );
              }
              return rv;
            }

            this.hasWebGl = webgl_detect()

            var IEversion = getInternetExplorerVersion()
            if (IEversion > 0){
                this.hasWebGl = false
                this.options.isIE = true
            }

            this.thumbsShowing = false
            this.bookmarkShowing = false
            this.searchingString = false
            this.tocShowing = false
            this.menuShowing = true
            this.fullscreenActive = false

            // UI layouts

           var layouts = {
            "2":{ // bottom 2
                currentPage:{vAlign:'bottom', hAlign:'center'},
                btnAutoplay:{hAlign:'left'},
                btnSound:{hAlign:'left'},
                btnExpand:{hAlign:'right'},
                btnZoomIn:{hAlign:'right'},
                btnZoomOut:{hAlign:'right'},
                btnSearch:{hAlign:'left'},
                btnBookmark:{hAlign:'left'},
                btnToc:{hAlign:'left'},
                btnThumbs:{hAlign:'left'},
                btnShare:{hAlign:'right'},
                btnPrint:{hAlign:'right'},
                btnDownloadPages:{hAlign:'right'},
                btnDownloadPdf:{hAlign:'right'},
                btnSelect:{hAlign:'right'}
            },
            "3":{ // top 
                menuTransparent:true,
                menu2Transparent:false,
                menu2OverBook:false,
                menu2Padding:5,
                btnMargin:5,
                currentPage:{vAlign:'top', hAlign:'center'},
                btnPrint:{vAlign:'top',hAlign:'right'},
                btnDownloadPdf:{vAlign:'top',hAlign:'right'},
                btnDownloadPages:{vAlign:'top',hAlign:'right'},
                btnThumbs:{vAlign:'top',hAlign:'left'},
                btnToc:{vAlign:'top',hAlign:'left'},
                btnBookmark:{vAlign:'top',hAlign:'left'},
                btnSearch:{vAlign:'top',hAlign:'left'},
                btnSelect:{vAlign:'top',hAlign:'right'},
                btnShare:{vAlign:'top',hAlign:'right'},
                btnAutoplay:{hAlign:'right'},
                btnExpand:{hAlign:'right'},
                btnZoomIn:{hAlign:'right'},
                btnZoomOut:{hAlign:'right'},
                btnSound:{hAlign:'right'},
                menuPadding:5
            },
            "4":{ // top 2
                menu2Transparent:false,
                menu2OverBook:false,
                sideMenuOverMenu2:false,
                currentPage:{vAlign:'top', hAlign:'center'},
                btnAutoplay:{vAlign:'top', hAlign:'left'},
                btnSound:{vAlign:'top', hAlign:'left'},
                btnExpand:{vAlign:'top', hAlign:'right'},
                btnZoomIn:{vAlign:'top', hAlign:'right'},
                btnZoomOut:{vAlign:'top', hAlign:'right'},
                btnSearch:{vAlign:'top', hAlign:'left'},
                btnBookmark:{vAlign:'top', hAlign:'left'},
                btnToc:{vAlign:'top', hAlign:'left'},
                btnThumbs:{vAlign:'top', hAlign:'left'},
                btnShare:{vAlign:'top', hAlign:'right'},
                btnPrint:{vAlign:'top', hAlign:'right'},
                btnDownloadPages:{vAlign:'top', hAlign:'right'},
                btnDownloadPdf:{vAlign:'top', hAlign:'right'},
                btnSelect:{vAlign:'top', hAlign:'right'}
                
            }
        }
            

            var skins = {
                'dark':{
                    skinColor:"#EEE",
                    btnColorHover:"#FFF",
                    skinBackground:"#313538"
                },
                'light':{
                    skinColor:"#222",
                    btnColorHover:"#000",
                    skinBackground:"#FFF",
                    floatingBtnColor:"#FFF",
                    floatingBtnBackground:"#00000055"
                },
                'gradient':{
                    skinColor:"#EEE",
                    btnColor:"#EEE",
                    btnColorHover:"#FFF",
                    skinBackground:"#313538DD",
                    zoomMin:.85,
                    menuOverBook:true,
                    menu2OverBook:true,
                    sideMenuOverMenu:true,
                    sideMenuOverMenu2:true,
                    menuBackground: 'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)',
                    menu2Background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, transparent 100%)'
                }
            }

            for(var key in skins){
                if(options.skin == key)
                    options = jQuery.extend(true, {}, skins[key], options);
            }

            for(var key in layouts){
                if(String(options.layout) === key)
                    options = jQuery.extend(true, {}, layouts[key], options);
            }


            //default options are overridden by options object passed to plugin constructor
            this.options = jQuery.extend(true, {}, jQuery.fn.flipBook.options, options);

            var o = this.options

            o.isMobile = jQuery.browser.mobile || isIDevice || isAndroid

            if (o.isMobile) {

                for (var key in o.mobile) {
                    o[key] = o.mobile[key]
                }

                // o.pageTextureSize = 1024

            }

            this.strings = o.strings

            o.pageShininess = o.pageShininess / 2;

            this.s = 0;

            if(o.googleAnalyticsTrackingCode){
                this.gaCode = o.googleAnalyticsTrackingCode
                if(!window.ga){
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                }

                ga('create', this.gaCode, 'auto');
            }

            jQuery('head').append("<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />");


            if (o.isMobile) {

                o.singlePageMode = o.singlePageModeIfMobile ? true : o.singlePageMode

                if (o.viewModeMobile)
                    o.viewMode = o.viewModeMobile

                if (o.pageTextureSizeMobile)
                    o.pageTextureSize = o.pageTextureSizeMobile
            }

            if (o.viewMode == "3dSinglePage") {
                o.singlePageMode = true
            }
            if (o.viewMode == "2dSinglePage") {
                o.singlePageMode = true
                o.viewMode = "2d"
            }

            if (o.singlePageMode) {
                if (o.viewMode != '2d' 
                && o.viewMode != 'swipe'
                ) o.viewMode = '3d'

                if(o.rightToLeft)
                    o.viewMode = 'swipe'
            }

            if (o.singlePageMode && o.viewMode == "3d")
                o.rightToLeft = false

            if(o.viewMode == "simple"){
                o.viewMode = "3d"
                o.instantFlip = true
            }

            function getAndroidVersion(ua) {
                ua = (ua || navigator.userAgent).toLowerCase();
                var match = ua.match(/android\s([0-9\.]*)/);
                return match ? match[1] : false;
            };

            if (o.viewMode == 'webgl') {
                if (!this.hasWebGl || ((parseFloat(getAndroidVersion()) < 4.4) && this.isAndroid))
                    o.viewMode = '3d'
            }
            if (o.viewMode == '3d' && !self.has3d)
                o.viewMode = '2d'

            this.webgl = o.viewMode == 'webgl'

            if(o.menuFloating){
                o.menuOverBook = true
                o.sideMenuOverMenu = true
            }

            if(o.menu2Floating){
                o.menu2OverBook = true
                o.sideMenuOverMenu2 = true
            }

            if(o.menuTransparent){
                o.menuOverBook = true
                o.sideMenuOverMenu = true
                o.menuBackground = 'none'
            }

            if(o.menu2Transparent){
                o.menu2OverBook = true
                o.sideMenuOverMenu2 = true
                o.menu2Background = 'none'
            }else{
                o.sideMenuOverMenu2 = false
            }

            if(o.menuOverBook)
                o.sideMenuOverMenu = true

            if(o.menu2OverBook)
                o.sideMenuOverMenu2 = true

            if (o.isMobile && o.pdfBrowserViewerIfMobile && o.pdfUrl) {

                // if( options.pdfBrowserViewerIfMobile && options.pdfUrl){  // TEST mobile = true

                if (o.lightBox && !o.lightBoxOpened) {
                    this.$elem.on("touched click", function() {
                        openPdfBrowserViewer()
                    }).css('cursor', 'pointer')
                } else {
                    openPdfBrowserViewer()
                }
                return;
            }

            if (o.isIE && o.pdfBrowserViewerIfIE && o.pdfUrl) {

                // if( options.pdfBrowserViewerIfMobile && options.pdfUrl){  // TEST mobile = true

                if (o.lightBox && !o.lightBoxOpened) {
                    this.$elem.on("touched click", function() {
                        openPdfBrowserViewer()
                    }).css('cursor', 'pointer')
                } else {
                    openPdfBrowserViewer()
                }
                return;
            }

            function openPdfBrowserViewer() {
                if (o.pdfBrowserViewerFullscreen) {
                    window.open(o.pdfUrl, o.pdfBrowserViewerFullscreenTarget)
                } else {
                    jQuery('<object type="application/pdf"/>').width("100%").height("100%").attr('data', o.pdfUrl).appendTo(self.$elem)
                    //<div> <object data="test.pdf" type="application/pdf" width="300" height="200"> alt : <a href="test.pdf">test.pdf</a> </object> </div>
                }
            }

            o.pdfMode = Boolean(o.pdfUrl && o.pdfUrl != "")

            var zl = o.zoomLevels
            if (zl) {
                if (typeof zl == 'string')
                    zl = zl.split(',')

                for (i = 0; i < zl.length; i++) {
                    zl[i] = Number(zl[i])
                }

                o.zoomLevels = zl;
                o.zoomMin = zl[0]
            }

            if (o.backgroundTransparent)
                o.backgroundColor = 'none'


            // self.onZoom(o.zoom)
            this.wrapper = jQuery(document.createElement('div'))
                .addClass('flipbook-main-wrapper')
            // .hide()

            if (o.backgroundColor != "")
                this.wrapper.css('background', o.backgroundColor);

            if (o.backgroundPattern != "")
                this.wrapper.css('background', 'url(' + o.backgroundPattern + ') repeat');

            if (o.backgroundImage != "") {
                this.wrapper.css('background', 'url(' + o.backgroundImage + ') no-repeat');
                this.wrapper.css('background-size', 'cover')
            }

            this.bookLayer = jQuery(document.createElement('div'))
                .addClass('flipbook-bookLayer')
                .appendTo(self.wrapper)

            if (o.hideMenu){
                this.bookLayer.css('bottom', '0')
                o.menuOverBook = true
            }

            this.book = jQuery(document.createElement('div'))
                .addClass('book')
                .appendTo(self.bookLayer);

            if (o.preloader)
                this.preloader = o.preloader
            else if(!jQuery('.flipbook-preloader').length || !o.lightBox)
                this.preloader = jQuery('<div class="flipbook-preloader cssload-container"><div class="cssload-speeding-wheel"/><div class="flipbook-loading-text"></div><div class="flipbook-loading-bg"></div></div>')
            else
                this.preloader = jQuery('.flipbook-preloader')

            jQuery('.flipbook-loading-text').text(o.preloaderText)

            this.setLoadingProgress(0);

            function checkHash(){
                if(self.disposed)
                    return

                var targetPage = self.getPageFromHash(), startPage = targetPage
                if(targetPage){
                    targetPage = o.rightToLeft ? o.pages.length - targetPage + 1 : targetPage
                 if(!self.started){
                    o.startPage = startPage

                    if(o.lightBox){
                        init()

                        if (o.lightBoxFullscreen) {

                            setTimeout(function() {
                                self.toggleExpand()
                            }, 100)

                        }
                    }
                        
                    }else if(self.Book){
                         if (self.lightbox) {
                            self.lightbox.openLightbox();
                            self.lightboxStart()
                         }
                         self.goToPage(targetPage, true);
                    }
                }
            }

            if(!o.deeplinkingPrefix && o.deeplinking && o.deeplinking.prefix)
                o.deeplinkingPrefix = o.deeplinking.prefix

            o.deeplinkingEnabled = o.deeplinkingPrefix || o.deeplinkingEnabled || (o.deeplinking && o.deeplinking.enabled)

            if (o.deeplinkingEnabled) {

                checkHash()
                jQuery(window).bind('hashchange', function(e) {
                    checkHash()
                })
            }

            function preload(){
                if (typeof IScroll == 'undefined' && !FLIPBOOK.scriptsAdded[FLIPBOOK.iscrollSrc]) {
                    self.loadScript(FLIPBOOK.iscrollSrc, function() {})
                    }
                if(o.pdfMode){
                    if (typeof pdfjsLib == 'undefined' && !FLIPBOOK.scriptsAdded[FLIPBOOK.pdfjsSrc]) {
                    self.loadScript(FLIPBOOK.pdfjsSrc, function() {})
                    }
                    // if (!FLIPBOOK.scriptsAdded[FLIPBOOK.pdfjsworkerSrc]) {
                    //     self.loadScript(FLIPBOOK.pdfjsworkerSrc, function() {})
                    // }
                    if (typeof FLIPBOOK.PdfService == 'undefined' && !FLIPBOOK.scriptsAdded[FLIPBOOK.pdfServiceSrc]) {
                        self.loadScript(FLIPBOOK.pdfServiceSrc, function() {})
                    }

                    if (o.btnSearch.enabled){

                        if (!FLIPBOOK.scriptsAdded[FLIPBOOK.markSrc]) {
                            self.loadScript(FLIPBOOK.markSrc, function(){})
                        }
                    }


                }
                if(o.viewMode == "webgl"){
                    if (typeof THREE == 'undefined' && !FLIPBOOK.scriptsAdded[FLIPBOOK.threejsSrc]) {
                    self.loadScript(FLIPBOOK.threejsSrc, function() {})
                    }
                    // if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipbookWebGlSrc]) {
                    // self.loadScript(FLIPBOOK.flipbookWebGlSrc, function() {})
                    // }
                }
                
            }

            function init() {


                if (o.fillPreloader.enabled) {

                    self.$fillPreloader = jQuery("<div>").addClass("flipbook-fillPreloader")
                    var empty = new Image()
                    empty.src = o.fillPreloader.imgEmpty
                    empty.onload = function() {
                        var full = new Image()
                        full.src = o.fillPreloader.imgFull
                        full.onload = function() {
                            //fill preloder ready

                            jQuery(empty).appendTo(self.$fillPreloader)
                            self.$fillPreloaderImg = jQuery(full).appendTo(self.$fillPreloader)

                            self.$fillPreloader.appendTo(self.wrapper)

                            initBook()

                        }

                    }

                } else {

                    initBook()

                }


            }

            function initBook() {

                if (o.pdfMode)
                    self.initPdf(o.btnSearch.enabled)
                else {
                    o.btnSearch.enabled = false
                    self.initJpg()
                }

                self.setLoadingProgress(.1)

            }

            this.dispose = function(){
                this.disposed = true
            }

            o.main = this

            var model = {

                _events: {},

                on: function(type, fn) {
                    if (!this._events[type]) {
                        this._events[type] = [];
                    }

                    this._events[type].push(fn);
                },

                off: function(type, fn) {
                    if (!this._events[type]) {
                        return;
                    }

                    var index = this._events[type].indexOf(fn);

                    if (index > -1) {
                        this._events[type].splice(index, 1);
                    }
                },

                trigger: function(type) {
                    if (!this._events[type]) {
                        return;
                    }

                    var i = 0,
                        l = this._events[type].length;

                    if (!l) {
                        return;
                    }

                    for (; i < l; i++) {
                        this._events[type][i].apply(this, [].slice.call(arguments, 1));
                    }
                },
            }

            model.on('pageLoaded', function(e){

               // console.log("page loaded")
               // console.log(o.name)
               // console.log(e.index)

                o.pages[e.index] = o.pages[e.index] || {}
                o.pages[e.index].canvas = o.pages[e.index].canvas || {}
                o.pages[e.index].canvas[e.size] = e.canvas

                if (self.Book && self.Book.onPageLoaded)
                    self.Book.onPageLoaded(e.index, e.size)

                if (self.searchingString)
                    self.mark(self.searchingString)

            })

            model.on('pageUnloaded', function(e){

                e.unloadedPages.forEach(function(elem) {
                    if (self.Book.onPageUnloaded)
                        self.Book.onPageUnloaded(elem.index, elem.size)
                })

            })

            model.on('pdfinit', function(){

                        console.log("pdfinit")
                
                o.tableOfContent = self.pdfService.outline || o.tableOfContent 

                o.pageMode = self.pdfService.double ? 'doubleWithCover' : 'singlePage'
                o.doublePage = self.pdfService.double

                self.viewportOriginal = self.pdfService.viewports[0]

                o.firstPage = {
                    width: self.pdfService.viewports[0].width,
                    height: self.pdfService.viewports[0].height,
                    ratio: self.pdfService.viewports[0].width / self.pdfService.viewports[0].height
                }

                if (self.pdfService.numPages > 1)
                    o.secondPage = {
                        width: self.pdfService.viewports[1].width,
                        height: self.pdfService.viewports[1].height,
                        ratio: self.pdfService.viewports[1].width / self.pdfService.viewports[1].height
                    }

                o.numPages = self.pdfService.numPages;

                // if (this.backCover)
                //     o.numPages--;

                var pages = []

                for (var i = 0; i < o.numPages; i++) {

                    var p = {
                        canvas: {}
                    }

                    if (o.pages && o.pages[i]) {
                        jQuery.extend(p, o.pages[i])
                    } else {
                        p.title = i + 1
                    }

                    pages[i] = p
                }

                o.pages = pages

                var bh = self.book.height()
                //var pageSize = 1000
                var pageSize = o.pageTextureSize
                o.pageWidth = parseInt(pageSize * self.viewportOriginal.width / self.viewportOriginal.height);
                o.pageHeight = pageSize;

                o.pw = o.pageWidth
                o.ph = o.pageHeight

                o.zoomSize = o.zoomSize || o.pageTextureSize

                self.start()

                // out until optimized for large pdf-s

                // if(loadPdfOutline)
                //     self.pdfService.loadOutline()

            })


            model.on("toolSelect", function() {
                
                self.bookLayer.removeClass("flipbook-move")
                if(self.btnSelect)
                    self.btnSelect.addClass("flipbook-btn-active")
                jQuery('.flipbook-page-htmlContent').css('userSelect', 'auto')

            })

            model.on("toolMove", function() {
                
                self.bookLayer.addClass("flipbook-move")
                if(self.btnSelect)
                    self.btnSelect.removeClass("flipbook-btn-active")
                jQuery('.flipbook-page-htmlContent').css('userSelect', 'none')

            })

            this.model = model


            if (o.lightBox) {

                o.btnClose.enabled = true

                this.lightbox = new FLIPBOOK.Lightbox(this, this.wrapper, o);
                this.lightboxStartedTimes = 0
                this.wrapper.css('background', 'none');
                this.bookLayer.css('background', 'none');
                this.book.css('background', 'none');

                this.preloader.appendTo(this.$body).css('position', 'fixed');


                this.$elem.css('cursor', 'pointer')

                    .bind('tap click', function(e) {

                        self.lightboxStartPage = jQuery(this).attr("data-page")

                        if (self.started) {

                            self.lightboxStart()

                            if (o.lightBoxFullscreen) {

                                setTimeout(function() {
                                    self.toggleExpand()
                                }, 0)

                            }

                        } else {

                            init()

                            if (o.lightBoxFullscreen) {

                                setTimeout(function() {
                                    self.toggleExpand()
                                }, 100)

                            }

                        }

                    });

                if (o.lightBoxOpened) {
                    init()
                    jQuery(this).trigger('lightboxLoadingStarted')
                }else if(o.lightboxPreload){
                    preload()
                }

                this.fullscreenElement = document.documentElement

            } else {

                o.btnClose.enabled = false

                this.preloader.appendTo(this.wrapper);

                this.wrapper.appendTo(this.$elem);

                this.fullscreenElement = this.$elem[0]

                init()

            }

             



        };

        FLIPBOOK.Main.prototype = {

            start: function() {

                

                if (this.options.dp) {
                    this.options.doublePage = true
                    this.options.pageMode = 'doubleWithCover'
                }

                if (this.started)
                    return;

                this.model.pageW = this.options.pageWidth
                this.model.bookW = 2 * this.options.pageWidth
                if(this.options.singlePageMode) 
                    this.model.bookW /= 2;
                this.model.pageH = this.options.pageHeight
                this.model.bookH = this.options.pageHeight

                // if (this.options.numPages == 1) {
                //     this.options.viewMode = "3d"
                //     this.webgl = false
                // }

                if (this.options.numPages % 2 == 0) {
                    this.options.numSheets = (this.options.numPages + 2) / 2
                } else {
                    this.options.numSheets = (this.options.numPages + 1) / 2
                }

                // if(!this.options.backCover)
                //     this.options.numSheets++;

                this.started = true;

                if (this.options.lightBox) {
                    this.lightbox.openLightbox();
                    this.lightboxStart()

                }

                this.createBook();

                this.updateSkinColors()


            },

            updateSkinColors:function(){

                var o = this.options

                if(o.skinColor)
                    this.wrapper.find('.skin-color').css('color', o.skinColor)
                if(o.skinBackground)
                    this.wrapper.find('.skin-color-bg').css('background', o.skinBackground)

            },

            lightboxStart: function() {

                var self = this;
                if (!this.started) this.start();

                if (typeof this.Book == 'undefined') {

                    setTimeout(function() {
                        self.lightboxStart()
                    }, 100);
                    return;

                }

                this.Book.enable();

                if (this.options.contentOnStart) this.toggleToc(true);

                if (this.options.thumbnailsOnStart) this.toggleThumbs(true);

                if(this.lightboxStartPage) this.goToPage(this.lightboxStartPage, true);

                else if(this.options.lightboxStartPage) this.goToPage(this.options.lightboxStartPage, true);

                this.lightboxStartedTimes ++

                if(this.gaCode){
                    ga('send', {
                       hitType: 'event',
                       eventCategory: 'Flipbook : '+this.options.name,
                       eventAction: 'lightbox open' ,
                       eventLabel: 'lightbox open',
                       eventValue: this.lightboxStartedTimes,
                       nonInteraction: true
                   });
                }

               // if (this.options.lightboxResetOnOpen && this.options.viewMode != "webgl") this.Book.goToPage(1, true)

                this.updateCurrentPage();
                this.initColors();
                this.resize();

                jQuery(this).trigger('lightboxOpened')

            },

            setHash: function(page) {

                if (page < 1) page = 1

                if (this.options.deeplinkingEnabled && this.Book.enabled)
                    window.location.hash = "#" + this.options.deeplinkingPrefix + String(page)

            },

            clearHash: function() {

                window.location.hash = "";

            },

            getPageFromHash: function() {
                 var page = null
                 var string = window.location.hash,
                 substring = "#" + this.options.deeplinkingPrefix,
                 hasPrefix = string.indexOf(substring) !== -1
                 if(hasPrefix){
                    page = parseInt(window.location.hash.replace(/#/g, '').replace(this.options.deeplinkingPrefix, ""))
                    if (isNaN(page)) page = 0;
                }
                return page;
            },

            initColors: function() {

                this.wrapper.find(".skin-color-bg")
                    .removeClass("flipbook-bg-light")
                    .removeClass("flipbook-bg-dark")
                    .addClass("flipbook-bg-" + this.options.skin);

                this.wrapper.find(".skin-color")
                    .removeClass("flipbook-color-light")
                    .removeClass("flipbook-color-dark")
                    .addClass("flipbook-color-" + this.options.skin);

                this.updateSkinColors()
            },

            lightboxEnd: function() {

                if(screenfull.isFullscreen)

                    screenfull.exit();

                if (window.location.hash) {
                    // var urlWithoutHash = document.location.href.replace(location.hash , "" );
                    this.clearHash()
                }

                this.setLoadingProgress(1)

                this.Book.disable();

            },

            turnPageComplete: function() {

                this.animating = false;
                this.updateCurrentPage();

                //autoplay
                var rightIndex = this.Book.rightIndex || 0;
                /* if ((rightIndex > this.options.pages.length - 1) && this.autoplay) {
                     this.toggleAutoplay(false)
                 }*/

                if (this.options.rightToLeft)
                    rightIndex = this.options.pages.length - rightIndex
                if (this.pdfService)
                    this.pdfService.setRightIndex(rightIndex)

            },

            updateCurrentPage: function() {

                if (typeof this.currentPage === 'undefined')
                    return;

                var rtl = this.options.rightToLeft,
                total = this.options.numPages,
                rightIndex = this.Book.rightIndex || 0,
                s

                if (rtl) rightIndex = this.options.pages.length - rightIndex;

                if (this.options.singlePageMode || this.Book.singlePage) {

                    if(rtl) rightIndex--;

                    s = rightIndex+1

                    this.currentPageNumber = rightIndex
                    this.setHash(s)

                    this.cPage = [rightIndex]

                    
                }else{

                    if (rightIndex > total || (rightIndex == total && total % 2 == 0)) {
                        s = total
                        this.cPage = [total - 1]
                    } else if (rightIndex < 1) {
                        s = 1
                        this.cPage = [0]
                    } else {
                        s = String(rightIndex) + '-' + String(rightIndex + 1)
                        this.cPage = [rightIndex - 1, rightIndex]
                    }

                    this.setHash(rightIndex)

                }

                if(rtl){

                    this.enableNext(rightIndex > 0)
                    this.enablePrev(rightIndex < total - 1)

                }else{

                    this.enablePrev(rightIndex > 0)
                    this.enableNext(rightIndex < total - 1)
                }

                if (this.cPage.length == 2) {

                    this.wrapper.find(".c-l-p").show()
                    this.wrapper.find(".c-r-p").show()
                    this.wrapper.find(".c-p").hide()

                } else {

                    this.wrapper.find(".c-l-p").hide()
                    this.wrapper.find(".c-r-p").hide()
                    this.wrapper.find(".c-p").show()

                }

                this.s && this.options.pdfPageScale > 0 && this.goToPage(0)


                if (s != this.currentPageValue){

                    this.currentPageValue = String(s)
                    this.currentPage.text(s + ' / ' + String(total))


                    this.currentPageInput.width(this.currentPageHolder.width())

                    this.resize()

                    // console.log(this.currentPageValue)

                    jQuery(this).trigger({
                        type: "pagechange",
                        page: this.currentPageValue,
                        name: this.options.name
                    });

                }


            },

            initJpg: function() {

                var self = this

                if (this.options.numPages == 1) {
                    this.options.viewMode = "swipe"
                    this.options.singlePageMode = true
                    this.webgl = false
                }

                this.loadPage(0, this.options.pageTextureSize, function() {

                    self.setLoadingProgress(.5)

                    if(self.options.pages.length == 1){

                        var p1 = self.options.pages[0].img

                        self.options.pw = p1.width
                        self.options.ph = p1.height

                        self.options.pageWidth = p1.width
                        self.options.pageHeight = p1.height

                        self.options.pageMode = 'singlePage'

                        self.options.doublePage = false

                        self.options.zoomSize = self.options.zoomSize || p1.height

                        self.setLoadingProgress(.7)

                        self.start();

                    }else{
                        self.loadPage(1, self.options.pageTextureSize, function() {

                            var p1 = self.options.pages[0].img
                            var p2 = self.options.pages[1].img
                            var r1 = p1.width / p1.height
                            var r2 = p2.width / p2.height

                            self.options.pw = p1.width
                            self.options.ph = p1.height

                            self.options.pageWidth = p1.width
                            self.options.pageHeight = p1.height

                            self.options.pageMode = (r2 / r1 > 1.5) ? 'doubleWithCover' : 'singlePage'

                            self.options.doublePage = (r2 / r1 > 1.5)

                            self.options.zoomSize = self.options.zoomSize || p1.height

                            self.setLoadingProgress(.7)

                            self.start();

                        })
                    }
                })

            },

            initPdf: function(loadAllPages) {


                if (this.started) return;

                if (this.options.viewMode == "swipe" || this.options.btnSearch.enabled)
                    this.options.textLayer = true

                var self = this;

                if(typeof pdfjsLib == 'undefined'){
                    if (!FLIPBOOK.scriptsAdded[FLIPBOOK.pdfjsSrc]) {
                        self.loadScript(FLIPBOOK.pdfjsSrc, function() {
                            self.initPdf(loadAllPages)
                        })
                        return;
                    }

                    if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.pdfjsSrc]) {
                        setTimeout(function(){
                            self.initPdf(loadAllPages)
                        },100)
                        return;
                    }
                }

                this.setLoadingProgress(.2)

                if(typeof FLIPBOOK.PdfService == 'undefined'){

                    if (!FLIPBOOK.scriptsAdded[FLIPBOOK.pdfServiceSrc]) {
                        self.loadScript(FLIPBOOK.pdfServiceSrc, function() {
                            self.initPdf(loadAllPages)
                        })
                        return;
                    }

                    if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.pdfServiceSrc]) {
                        setTimeout(function(){
                            self.initPdf(loadAllPages)
                        },100)
                        return;
                    }

                }

                this.setLoadingProgress(.3)

                //fix for IE10
                if(window.CanvasPixelArray) {
                    CanvasPixelArray.prototype.set = function(arr) {
                        var l=this.length, i=0;

                        for(;i<l;i++) {
                            this[i] = arr[i];
                        }
                    };
                }

                PDFJS = pdfjsLib

                //PDFJS.disableWorker = this.options.disableWorker || false;
                pdfjsLib.externalLinkTarget = pdfjsLib.LinkTarget.BLANK
                pdfjsLib.GlobalWorkerOptions.workerSrc = this.options.pdfjsworkerSrc || FLIPBOOK.pdfjsworkerSrc
                // PDFJS.disableAutoFetch = true;

                // PDFJS.disableStream = true;

                // PDFJS.cMapUrl = 'cmaps/';
                // PDFJS.cMapPacked = true;

                //match page protocol
                if(location.protocol == "https:"){
                    self.options.pdfUrl = self.options.pdfUrl.replace("http://","https://")
                }

                var params = {
                    cMapPacked: true,
                    cMapUrl: "cmaps/",
                    // disableAutoFetch: false,
                    // disableCreateObjectURL: false,
                    // disableFontFace: false,
                    // disableRange: false,
                    disableAutoFetch: true,
                    disableStream: true,
                    // isEvalSupported: true,
                    // maxImageSize: -1,
                    // pdfBug: false,
                    // postMessageTransfers: true,
                    url: self.options.pdfUrl,
                    // verbosity: 1
                }

                if(this.pdfinitStarted) return;
                    this.pdfinitStarted = true

                pdfjsLib.getDocument(
                    params
                ).then(function(pdf) {

                    self.pdfDocument = pdf

                    var numPages = pdf._pdfInfo.numPages
                    if (numPages == 1) {
                        self.options.viewMode = "swipe"
                        self.options.singlePageMode = true
                        self.webgl = false
                    }

                    self.pdfService = new FLIPBOOK.PdfService(pdf, self.model, self.options)

                    

                    self.options.thumbLoaded = function(c) {
                        self.options.thumbs = self.options.thumbs || []
                        self.options.thumbs[c.index] = c
                    }

                    self.setLoadingProgress(.5)

                    var loadPdfOutline = !self.options.tableOfContent || self.options.tableOfContent.length == 0

                    var e = e


                    // self.pdfService.on("outlineLoaded", function(){
                    //     debugger
                    // })

                    self.pdfService.init() 
                });


            },

            loadPage: function(index, size, callback) {

                var self = this

                if (this.options.pdfMode) {

                    // if(this.options.pages[index].canvas && this.options.pages[index].canvas[size]){

                    //     if(callback)
                    //         callback.call(this,{ canvas: this.options.pages[index].canvas[size], size: size })

                    //     this.model.trigger('pageLoaded', {index:index, size:size, canvas:this.options.pages[index].canvas[size]})
                    //     // else
                    //     //     debugger
                    // }else{
                    //     this.loadPageFromPdf(index, size, callback)
                    // }

                    this.loadPageFromPdf(index, size, callback)

                    // this.loadPageFromPdf(index, size, function(){
                    //     self.pageLoaded({index:index, size:size, canvas:self.options.pages[index].canvas[size]}, callback)
                    // })

                } else {

                    var self = this, page = this.options.pages[index]

                    if (!page.img) {
     
                        page.img = document.createElement('img')
                        // console.log('loading page ' + index)
                        page.img.setAttribute("id", index);

                        page.img.onload = function() {

                            page.imgLoaded = true

                            if(page.htmlContent){
                                        page.htmlContentDiv = jQuery(document.createElement('div'))
                                        .addClass('flipbook-page-htmlContent')
                                        .append(jQuery(page.htmlContent))
                            }

                            self.pageLoaded({ index: index, size: size, image: page.img, htmlContent: page.htmlContentDiv }, callback)

                        }

                        // crossOrigin is used only for mode webgl
                        if(this.options.viewMode == "webgl")
                            page.img.crossOrigin = 'Anonymous'

                        if(location.protocol == "https:"){
                            page.src = page.src.replace("http://","https://")
                        }

                        page.img.src = page.src

                    } else if (page.imgLoaded) {

                        self.pageLoaded({ index: index, size: size, image: page.img, htmlContent: page.htmlContentDiv }, callback)
                    
                    } else {
                        setTimeout(function() {
                            self.loadPage(index, size, callback)
                        }, 300)
                    }

                }

            },

            pageLoaded: function(page, callback) {

                // console.log("page loaded : ",page.index)

                // jQuery(this).trigger("pageLoaded", index, 1);

                callback.call(this, page, callback)

                if (this.options.loadAllPages && page.index < (this.options.numPages - 1)) {


                    // console.log("....load : ", page.index + 1)

                    this.loadPage(page.index + 1, page.size, function() {})
                }



            },

            loadPageFromPdf: function(pageIndex, size, callback) {

                //console.log("loadpagefrompdf ", pageIndex, " ", size)

                var self = this;
                
                size = size || this.options.pageTextureSize

                if (!self.options.pages[pageIndex]) {
                    callback.call(self)
                } else {
                    // var bookPage = self.pdfService.getBookPage(pageIndex, size)
                    // if(bookPage){
                    //     this.model.trigger('pageLoaded', {index:pageIndex, size:size, canvas:bookPage.canvas})
                    //     if (callback)
                    //         callback.call(this, { canvas: bookPage.canvas, size: size, pdfPageIndex: bookPage.pdfPageIndex });
                    // }else{
                        this.pdfService.renderBookPage(pageIndex, size, callback)
                    // }

                }

            },

            getString:function(name){
                return this.options.strings[name]
            },

            mark: function(str) {

                var c = jQuery('.flipbook-page-htmlContent')
                c.unmark({
                    done: function() {
                        c.mark(str,{
                            "acrossElements": true
                        });
                    }
                })

            },

            unmark: function() {

                this.searchingString = null

                var c = jQuery('.flipbook-page-htmlContent')
                c.unmark()

            },

            setTool: function(tool) {

                this.tool = tool
                this.model.trigger(tool)

            },

            toggleTool: function() {

                var tool = this.tool == "toolSelect" ? "toolMove" : "toolSelect"
                this.setTool(tool)

            },

            toggleSound:function(){

                var o = this.options
                if (o.sound) {
                    o.sound = false
                    this.btnSound.$icon.hide()
                    this.btnSound.$iconAlt.show()
                } else {
                    o.sound = true
                    this.btnSound.$icon.show()
                    this.btnSound.$iconAlt.hide()
                }

            },

            scrollPageIntoView: function(obj) {

                var num = this.options.rightToLeft ? this.options.pages.length - obj.pageNumber + 1 : obj.pageNumber

                this.goToPage(num)

            },

            loadScript: function(src, callback) {

                var self = this
                var script = document.createElement('script');
                var prior = document.getElementsByTagName('script')[0];
                script.async = 1;
                prior.parentNode.insertBefore(script, prior);

                FLIPBOOK.scriptsAdded[src] = true;

                script.onload = script.onreadystatechange = function(_, isAbort) {
                    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                        script.onload = script.onreadystatechange = null;
                        script = undefined;

                        if (!isAbort) {
                            if (callback) callback.call(self);
                        }
                        FLIPBOOK.scriptsLoaded[src] = true;
                    }
                };

                script.src = src;

            },

            createBook: function() {

                var self = this,
                    model = this.model,
                    options = this.options;

                if(options.icons == "material" && !FLIPBOOK.MaterialIconsLoaded){
                    FLIPBOOK.MaterialIconsLoaded = true
                    jQuery('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">')
                }


                if(typeof IScroll == 'undefined'){

                    if (!FLIPBOOK.scriptsAdded[FLIPBOOK.iscrollSrc]) {
                        self.loadScript(FLIPBOOK.iscrollSrc, self.createBook)
                        return;
                    }

                    if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.iscrollSrc]) {
                        setTimeout(function(){
                            self.createBook()
                        },100)
                        return
                    }
                }

                if (this.options.btnSearch.enabled){

                    if (!FLIPBOOK.scriptsAdded[FLIPBOOK.markSrc]) {
                        self.loadScript(FLIPBOOK.markSrc, self.createBook)
                        return;
                    }

                    if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.markSrc]) {
                        setTimeout(function(){
                            self.createBook()
                        },100)
                        return
                    }

                }

                self.setLoadingProgress(.9)

                if (self.options.viewMode == "webgl") {

                    if(typeof THREE == 'undefined'){

                        if (!FLIPBOOK.scriptsAdded[FLIPBOOK.threejsSrc]) {
                            self.loadScript(FLIPBOOK.threejsSrc, self.createBook)
                            return;
                        }

                        if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.threejsSrc]) {
                            setTimeout(function(){
                                self.createBook()
                            },100)
                            return
                        }
                    }

                    if(typeof FLIPBOOK.BookWebGL == 'undefined'){

                        if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipbookWebGlSrc]) {
                            self.loadScript(FLIPBOOK.flipbookWebGlSrc, self.createBook)
                            return;
                        }

                        if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipbookWebGlSrc]) {
                            setTimeout(function(){
                                self.createBook()
                            },100)
                            return
                        }

                    }

                } else if (self.options.viewMode == "swipe") {

                    if(typeof FLIPBOOK.BookSwipe == 'undefined'){

                        if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipBookSwipeSrc]) {
                            self.loadScript(FLIPBOOK.flipBookSwipeSrc, self.createBook)
                            return;
                        }

                        if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipBookSwipeSrc]) {
                            setTimeout(function(){
                                self.createBook()
                            },100)
                            return
                        }

                    }

                } else {

                    if(typeof FLIPBOOK.Book3 == 'undefined'){

                        if (!FLIPBOOK.scriptsLoaded[FLIPBOOK.flipbookBook3Src]) {
                            self.loadScript(FLIPBOOK.flipbookBook3Src, self.createBook)
                            return;
                        }

                        if (!FLIPBOOK.scriptsAdded[FLIPBOOK.flipbookBook3Src]) {
                            setTimeout(function(){
                                self.createBook()
                            },100)
                            return
                        }

                    }

                    

                }

                this.setLoadingProgress(1)

                this.initEasing()

                if ( /*!self.options.pdfMode && */ self.options.pageMode == "doubleWithCover" && self.options.pages.length > 2) {
                    var newArr = [self.options.pages[0]]
                    for (var i = 1; i <= self.options.pages.length - 2; i++) {
                        var p = self.options.pages[i]
                        var left = {
                            src: p.src,
                            thumb: p.thumb,
                            title: p.title,
                            htmlContent: p.htmlContent,
                            side: 'left'
                        }
                        var right = {
                            src: p.src,
                            thumb: p.thumb,
                            title: p.title,
                            htmlContent: p.htmlContent,
                            side: 'right'
                        }

                        newArr.push(left)
                        newArr.push(right)

                    }
                    newArr.push(self.options.pages[self.options.pages.length - 1])
                    self.options.pages = newArr
                }

                this.options.numPages = this.options.pages.length
                if (this.options.numPages % 2 != 0 && !this.options.singlePageMode  /*&& this.options.viewMode != 'swipe' */) {
                    this.oddPages = true
                    this.options.oddPages = true
                    //because of RTL - pages array needs to have even number of pages
                    this.options.pages.push({
                        src: this.options.assets.preloader,
                        thumb: ''
                    })
                }

                if (self.options.pages.length > 0) {
                    for (var i = 0; i < self.options.pages.length; i++) {
                        if (typeof(self.options.pages[i].htmlContent) != 'undefined') {
                            // self.options.viewMode = '3d'
                            self.options.hasHtmlContent = true
                            self.options.pages[i].htmlContent = jQuery(self.options.pages[i].htmlContent)
                        }
                    }
                }

                function initSound() {

                    self.flipsound = document.createElement('audio');
                    self.flipsound.setAttribute('src', self.options.assets.flipMp3);
                    self.flipsound.setAttribute('type', 'audio/mpeg')


                }

                if (self.options.viewMode == "webgl") {

                    var bookOptions = self.options;
                    // bookOptions.pagesArr = self.options.pages;
                    bookOptions.scroll = self.scroll;
                    bookOptions.parent = self;
                    self.Book = new FLIPBOOK.BookWebGL(self.book[0], model, bookOptions);
                    self.webglMode = true;

                    self.initSwipe();
                    initSound()


                } else if (self.options.viewMode == "swipe") {

                    self.Book = new FLIPBOOK.BookSwipe(self.book[0], self.bookLayer[0], model, options);

                    self.initSwipe();

                } else {

                    if (self.options.viewMode != "2d")
                        self.options.viewMode = "3d"

                    self.Book = new FLIPBOOK.Book3(self.book[0], model, options);

                    self.initSwipe();

                    self.webglMode = false;
                    initSound()
                }

                self.Book.enable()
                self.book.hide().fadeIn("slow")

                this.tocCreated = false

                this.createMenu();

                this.onZoom(this.options.zoom)

                // this.createCurrentPage();
                // if (!this.options.currentPage.enabled) {
                //     this.currentPageHolder.hide()
                // }

                if (this.options.pages.length == 1) {
                    this.rightToLeft = false
                }

                var $book = jQuery(self.Book)

                $book.bind('loadPagesFromPdf', function(e, arr, size, callback) {
                    self.loadPagesFromPdf(arr, size, callback)
                })

                $book.bind('turnPageComplete', function(e) {
                    self.turnPageComplete()
                })

                $book.bind('initEasing', function(e) {
                    self.initEasing()
                })

                $book.bind('playFlipSound', function(e) {
                    self.playFlipSound()
                })

                $book.bind('closeLightbox', function(e) {
                    self.closeLightbox()
                })

                $book.bind('updateCurrentPage', function(e) {
                    self.updateCurrentPage()
                })

                this.createLogo()

                this.onBookCreated()
            },

            onBookCreated: function() {

                var o = this.options

                var self = this
                jQuery(window).resize(function() {
                    self.resize();
                });

                if (o.rightToLeft) {
                    self.goToPage(Number(o.pages.length - Number(o.startPage) + 1), true);
                } else {
                    self.goToPage(Number(o.startPage), true);
                }

                this.updateCurrentPage();

                //keyboard evetns
                document.addEventListener("keydown", function(e) {
                    if (!self.Book.enabled)
                        return;

                    if (!self.options.lightBox && !self.fullscreenActive){
                        if(self.options.arrowsDisabledNotFullscreen || self.bodyHasVerticalScrollbar())
                            return;
                    }

                    e = e || window.event;
                    switch (e.keyCode) {
                        //left
                        case 37:
                            self.prevPage();
                            break;
                            //up
                        case 38:
                            self.zoomIn();
                            break;
                            //right
                        case 39:
                            self.nextPage();
                            break;
                            //down
                        case 40:
                            self.zoomOut();
                            break;
                    }
                    return false;
                })

                document.addEventListener("MSFullscreenChange", function(e) {
                    self.handleFsChange()
                });

                document.addEventListener("mozfullscreenchange", function(e) {
                    self.handleFsChange()
                });

                document.addEventListener("webkitfullscreenchange", function(e) {
                    self.handleFsChange()
                });

                document.addEventListener("fullscreenchange", function(e) {
                    self.handleFsChange()
                });

                // if (!o.zoomDisabled) {
                //disable page scrolling
                // jQuery(this.wrapper).on('DOMMouseScroll', function(e) {
                //     e.preventDefault();
                // });
                // jQuery(this.wrapper).on('mousewheel', function(e) {
                //     e.preventDefault();
                // });
                // }

                this.zoom = o.zoomMin;

                //add mouse scroll listeners
                // if (!o.zoomDisabled) {
                //Firefox
                this.bookLayer.bind('DOMMouseScroll', function(e) {

                    if (!self.Book.enabled) 
                        return;

                    if (!self.options.lightBox && !self.fullscreenActive){
                        if(self.options.wheelDisabledNotFullscreen || self.bodyHasVerticalScrollbar())
                            return;
                    }

                    e.stopPropagation()
                    e.preventDefault()

                    if (e.originalEvent.detail > 0) {
                        //scroll down
                        // console.log('Down');
                        self.zoomOut(e.originalEvent)
                    } else {
                        //scroll up
                        // console.log('Up');
                        self.zoomIn(e.originalEvent)
                    }
                    //prevent page fom scrolling
                    return false;
                });

                //IE, Opera, Safari
                this.bookLayer.bind('mousewheel', function(e) {

                    if (!self.Book.enabled) 
                        return;

                    if (!self.options.lightBox && !self.fullscreenActive){
                        if(self.options.wheelDisabledNotFullscreen || self.bodyHasVerticalScrollbar())
                            return;
                    }

                    e.stopPropagation()
                    e.preventDefault()

                    // alert("mousewheel")
                    if (e.originalEvent.wheelDelta < 0 /*|| e.originalEvent.deltaY < 0  -> zoom in does not work in chrome*/ ) {
                        //scroll down
                        // console.log('Down');
                        self.zoomOut(e.originalEvent)
                    } else {
                        //scroll up
                        // console.log('Up');
                        self.zoomIn(e.originalEvent)
                    }
                    //prevent page fom scrolling
                    return false;
                });

                this.setTool("toolMove")



                // this.bookLayer.bind('gesturestart', function(e) {
                //     if (!self.Book.enabled) return;
                //     // alert("gesturestart")
                //     if (e.scale < 1.0) {
                //         // User moved fingers closer together
                //     } else if (e.scale > 1.0) {
                //         // User moved fingers further apart
                //     }
                // }, false);

                // this.bookLayer.bind('gestureend', function(e) {
                //     if (!self.Book.enabled) return;
                //     // alert("gestureend")
                //     if (e.scale < 1.0) {
                //         self.zoomOut(e)
                //         // User moved fingers closer together
                //     } else if (e.scale > 1.0) {
                //         self.zoomIn(e)
                //         // User moved fingers further apart
                //     }
                // }, false);

                // this.bookLayer.bind('gesturechange', function(e) {
                //     if (!self.Book.enabled) return;
                //     // alert("gesturechange")
                //     if (e.scale < 1.0) {
                //         // User moved fingers closer together
                //         self.zoomOut(e)
                //     } else if (e.scale > 1.0) {
                //         // User moved fingers further apart
                //         self.zoomIn(e)
                //     }
                // }, false);

                // }

                if (o.contentOnStart) self.toggleToc(true);

                if (o.thumbnailsOnStart) self.toggleThumbs(true);

                if (o.autoplayOnStart) self.toggleAutoplay(true);

                if (self.options.lightBox)
                    self.Book.disable()

                self.Book.updateVisiblePages()

                self.initColors();

                self.resize();

                self.Book.zoomTo(o.zoomMin)

                setTimeout(function() {
                    self.resize();
                }, 200)

                // setTimeout(function() {
                //     self.resize();
                // }, 400)

                setTimeout(function() {
                    self.resize();
                }, 600)

                if (o.onbookcreated)
                    o.onbookcreated.call(this)

            },

            initSwipe: function() {

                if(this.options.numPages == 1)
                    return;

                var self = this

                window.jQuery(this.bookLayer).swipe({

                    swipeStatus: function(e, phase, direction, distance, duration, fingerCount, fingerData) {
                        // console.log(e,phase,direction,distance,duration,fingerCount,fingerData)

                        // if(fingerCount > 1){
                        //     if(self.Book.disablePan)
                        //         self.Book.disablePan()
                        // }

                        // if(phase == 'end' || phase == 'cancel'){
                        //     if(self.Book.enablePan)
                        //         self.Book.enablePan()
                        // }

                        if (phase == 'start') {

                            try {
                                self.currentPageInput.trigger('blur')
                            } catch (e) {}
                        }

                        if (self.options.sideNavigationButtons && (e.target === self.arrowL[0] || e.target === self.arrowR[0])) return;

                        //gesture for fullscreen disabled

                        // if (phase == 'cancel' && duration < 200 && distance > 10 && direction == 'up') {
                        //     if (!self.fullscreenActive) self.toggleExpand();
                        // }

                        // if (phase == 'cancel' && duration < 200 && distance > 10 && direction == 'down') {
                        //     if (self.fullscreenActive) self.toggleExpand();
                        // }

                        /*if (e.type == 'touchend' && duration < 200 && distance < 10) {
                            // console.log("tap")
                            var posX = e.changedTouches[0].pageX
                            var w = self.bookLayer.width()

                            if (posX < (w / 3)) {
                                self.Book.prevPage()
                                e.preventDefault()
                                e.stopPropagation()
                            } else if (posX > (w * 2 / 3)) {
                                self.Book.nextPage()
                                e.preventDefault()
                                e.stopPropagation()
                            } else {
                                //tap in the middle
                                //                                 self.toggleMenu()
                                //                                 e.preventDefault()
                                //                                 e.stopPropagation()
                            }
                        } else */
                        if ((phase == "end" || phase == "cancel") && duration < 200 && distance < 10) {

                            // double tap zoom if text layer not active
                            // if (!self.options.textLayer && !self.options.doubleClickZoomDisabled) {
                            if (self.tool == "toolMove" && !self.options.doubleClickZoomDisabled) {

                                if (self.clickTimer == null) {
                                    self.clickTimer = setTimeout(function() {
                                        self.clickTimer = null;
                                        // console.log("single")
                                        if (e.type == 'touchend') {

                                            var posX = e.changedTouches[0].pageX

                                        } else if (e.type == 'mouseup') {
                                            var posX = e.offsetX
                                        }

                                        //turn page on click - disabled

                                        // var w = self.bookLayer.width()

                                        // if (posX < (w * 0.4) && self.zoom <= 1) {
                                        //     self.Book.prevPage()
                                        //     e.preventDefault()
                                        //     e.stopPropagation()
                                        // } else if (posX > (w * 0.6) && self.zoom <= 1) {
                                        //     self.Book.nextPage()
                                        //     e.preventDefault()
                                        //     e.stopPropagation()
                                        // }

                                    }, 300)
                                } else {
                                    clearTimeout(self.clickTimer);
                                    self.clickTimer = null;
                                    // console.log("double")

                                    var t = self.options.zoomTime
                                    if (self.zoom >= self.options.zoomMax)
                                        self.zoomTo(self.options.zoomMin, t, e)
                                    else
                                        self.zoomTo(self.options.zoomMax, t, e)

                                }
                            }

                            //start timer, if another click arrives 
                        } else {

                            if ((direction == "up" || direction == "down") && phase == 'move' || self.zoom > 1 || self.tool == "toolSelect") return;
                            // console.log(phase,direction,distance, fingerCount, fingerData)
                            self.Book.onSwipe(e, phase, direction, distance, duration, fingerCount, fingerData)
                        }

                        /*if (e.type == 'mouseup' && duration < 100 && distance < 10) {
                            var posX = e.pageX
                            var w = self.bookLayer.width()

                            if (posX < (w / 3)) {
                               e.stopPropagation();
                            e.preventDefault();
                            self.Book.prevPage();
                            } else if (posX > (w * 2 / 3)) {
                                e.stopPropagation();
                            e.preventDefault();
                            self.Book.nextPage();
                            } else {
                                        
                            }
                        }*/
                    },

                    // pinchIn: function(event, direction, distance, duration, fingerCount, pinchZoom) {
                        // console.log("pinch in")
                        // jQuery("#trace").text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
                    // },
                    // pinchOut: function(event, direction, distance, duration, fingerCount, pinchZoom) {
                        // console.log("pinch out")
                        // jQuery("#trace").text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
                    // },
                    pinchStatus: function(event, phase, direction, distance, duration, fingerCount, pinchZoom) {
                        // console.log(event, phase, direction, distance, duration, fingerCount, pinchZoom)
                        // console.log(pinchZoom)
                        if (phase == "start")
                            self.zoomStart = self.zoom

                        if (fingerCount > 1 && phase == "move"){

                            event.preventDefault()

                            if(event.scale)
                                pinchZoom = event.scale

                            // if (self.options.viewMode == "webgl"){
                                self.zoomTo(self.zoomStart * pinchZoom, 0, event)
                                // console.log("zoom to ",self.zoomStart * pinchZoom, event)
                            // }
                            
                        }

                   },

                    fingers: 2,

                    pinchThreshold: 0,

                    allowPageScroll: 'vertical',

                    preventDefaultEvents: false

                });

                this.swipeEnabled = true

            },

            toggleMenu: function() {

                if (this.menuShowing) {
                    //hide menu 
                    this.menuShowing = false

                    this.bookLayer.css('bottom', '0px');
                    this.menuBottom.fadeOut()
                    this.currentPageHolder.fadeOut()
                    jQuery('.flipbook-nav').fadeOut()
                    this.Book.onResize()

                } else {
                    //show menu 
                    this.menuShowing = true

                    this.bookLayer.css('bottom', this.menuBottom.height() + 'px');
                    this.menuBottom.fadeIn()
                    this.currentPageHolder.fadeIn()
                    jQuery('.flipbook-nav').fadeIn()
                    this.Book.onResize()

                }

            },

            createIcon:function(btn, alt, transparent){

                var o = this.options, $icon;
           
                if (o.icons == "material") {
                    $icon = jQuery('<i>')
                        .addClass('material-icons flipbook-icon-material flipbook-menu-btn skin-color')
                        .attr('title', btn.title)
                        .text(alt ? btn.iconAlt2 : btn.icon2)
                }else{
                    $icon = jQuery(document.createElement('span'))
                        .attr('aria-hidden', 'true')
                        .addClass(alt ? btn.iconAlt : btn.icon)
                        .addClass('flipbook-icon-fa flipbook-menu-btn skin-color fa')
                        
                }
                if(!transparent)
                    $icon.addClass('skin-color-bg')

                return $icon;
            },

            createButton: function(btn) {
                
                var o = this.options;
                var floating = ((btn.vAlign == 'top' && o.menu2Transparent) || (btn.vAlign != 'top' && o.menuTransparent))
                var bgColor =  floating ? o.floatingBtnBackground : o.btnBackground
                var color = floating ? o.floatingBtnColor : o.btnColor
                var textShadiw = floating ? o.floatingBtnTextShadow : o.btnTextShadow
                var radius = floating ? o.floatingBtnRadius : o.btnRadius
                var margin = floating ? o.floatingBtnMargin : o.btnMargin
                var $btn = jQuery(document.createElement('span'))
                var material = o.icons == "material"
                var btnSize = material ? o.btnSize + 8 : o.btnSize
                var btnWidth = o.btnSize + 24

                function addCSS($icon){
                    $icon.css({
                        'width': btnWidth + 'px',
                        'font-size': btnSize + 'px',
                        'margin': margin + 'px',
                        'border-radius': radius + 'px',
                        'text-shadow': o.btnTextShadow,
                        'box-shadow': o.btnShadow,
                        'border': o.btnBorder,
                        'color': color,
                        'background': bgColor,
                        'text-shadow' : textShadiw
                    })

                    if(color) $icon.removeClass('skin-color')
                    if(bgColor) $icon.removeClass('skin-color-bg')
                }

                $btn.$icon = this.createIcon(btn)
                    .appendTo($btn)
                addCSS($btn.$icon)

                if(btn.iconAlt2){

                    $btn.$iconAlt = this.createIcon(btn, true)
                        .appendTo($btn)
                        .hide()
                    addCSS($btn.$iconAlt)

                }
               

                $btn.icon = btn.icon
                $btn.iconAlt = btn.iconAlt

                if (btn.onclick)
                    $btn.bind('tap click', function(e) {
                        btn.onclick()
                    })

                if (!floating && (o.btnColorHover || o.btnBackgroundHover || o.btnBorderHover))

                    $btn.mouseenter(function() {
                        $btn.$icon.css({
                            'color': o.btnColorHover,
                            'background': o.btnBackgroundHover,
                            'border': o.btnBorderHover,
                        })
                        if($btn.$iconAlt) $btn.$iconAlt.css({
                            'color': o.btnColorHover,
                            'background': o.btnBackgroundHover,
                            'border': o.btnBorderHover,
                        })
                    }).mouseleave(function() {
                        $btn.$icon.css({
                            'color': o.btnColor,
                            'background': o.btnBackground,
                            'border': o.btnBorder,
                        })  
                        if($btn.$iconAlt) $btn.$iconAlt.css({
                            'color': o.btnColor,
                            'background': o.btnBackground,
                            'border': o.btnBorder,
                        })
                    });


                var menu, cssClass = ''

                if(btn.vAlign == 'top'){
                    if(o.menu2Floating){
                        menu = this.menuTC
                    }else if(btn.hAlign == 'left'){
                        menu = this.menuTL
                    }else if(btn.hAlign == 'right'){
                        menu = this.menuTR
                    }else{
                        menu = this.menuTC
                    }
                }else{
                    if(o.menuFloating){
                        menu = this.menuBC
                    }else if(btn.hAlign == 'left'){
                        menu = this.menuBL
                    }else if(btn.hAlign == 'right'){
                        menu = this.menuBR
                    }else{
                        menu = this.menuBC
                    }
                }

                $btn.attr('data-name', btn.name)
                    .appendTo(menu)
                    .attr('title', btn.title)
                    .addClass(cssClass)
                    .css('order', btn.order)


                    //button titles

                // jQuery("<span></span>").css({
                //     'fontSize':'10px',
                //     'display':'block',
                //     'marginTop':'-8px',
                //     'maxWidth':'40px'
                //     }).appendTo($btn).text(btn.title)


                return $btn

            },

            createMenu: function() {

                var o = this.options

                var menuBottomClass = o.menuFloating ? 'flipbook-menu-floating' : 'flipbook-menu-fixed'
                var menuTopClass = o.menu2Floating ? 'flipbook-menu-floating' : 'flipbook-menu-fixed'

                var self = this;
                this.menuBottom = jQuery(document.createElement('div'))
                    .addClass('flipbook-menuBottom')
                    .addClass(menuBottomClass)
                    .appendTo(this.wrapper)
                    .css({
                        'background': o.menuBackground,
                        'box-shadow': o.menuShadow,
                        'margin': o.menuMargin + 'px',
                        'padding': o.menuPadding + 'px',
                    })

                if(!o.menuTransparent && !o.menuBackground)
                    this.menuBottom.addClass('skin-color-bg')
                    

                if (o.hideMenu)
                    this.menuBottom.hide();

                this.menuTop = jQuery(document.createElement('div'))
                    .addClass('flipbook-menuTop')
                    .addClass(menuTopClass)
                    .appendTo(this.wrapper)
                    .css({
                        'background': o.menu2Background,
                        'box-shadow': o.menu2Shadow,
                        'margin': o.menu2Margin + 'px',
                        'padding': o.menu2Padding + 'px',
                    })

                if(!o.menu2Transparent && !o.menu2Background)
                    this.menuTop.addClass('skin-color-bg')

                // if (o.hideMenu)
                //     this.menuTop.hide();

                if (o.viewMode == "swipe") o.btnSound.enabled = false

                this.menuBL = jQuery(document.createElement('div'))
                    .addClass('flipbook-menu flipbook-menu-left')
                    .appendTo(this.menuBottom)
                    

                this.menuBC = jQuery(document.createElement('div'))
                    .addClass('flipbook-menu flipbook-menu-center')
                    .appendTo(this.menuBottom)
                    
                this.menuBR = jQuery(document.createElement('div'))
                    .addClass('flipbook-menu flipbook-menu-right')
                    .appendTo(this.menuBottom)

                this.menuTL = jQuery(document.createElement('div'))
                    .addClass('flipbook-menu flipbook-menu-left')
                    .appendTo(this.menuTop)
                    
                this.menuTC = jQuery(document.createElement('div'))
                    .addClass('flipbook-menu flipbook-menu-center')
                    .appendTo(this.menuTop)

                this.menuTR = jQuery(document.createElement('div'))
                    .addClass('flipbook-menu flipbook-menu-right')
                    .appendTo(this.menuTop)

                if(o.isMobile){
                    if(typeof o.btnTocIfMobile != 'undefined') o.btnToc.hideOnMobile = !o.btnTocIfMobile
                    if(typeof o.btnThumbsIfMobile != 'undefined') o.btnThumbs.hideOnMobile = !o.btnThumbsIfMobile
                    if(typeof o.btnShareIfMobile != 'undefined') o.btnShare.hideOnMobile = !o.btnShareIfMobile
                    if(typeof o.btnDownloadPagesIfMobile != 'undefined') o.btnDownloadPages.hideOnMobile = !o.btnDownloadPagesIfMobile
                    if(typeof o.btnDownloadPdfIfMobile != 'undefined') o.btnDownloadPdf.hideOnMobile = !o.btnDownloadPdfIfMobile
                    if(typeof o.btnSoundIfMobile != 'undefined') o.btnSound.hideOnMobile = !o.btnSoundIfMobile
                    if(typeof o.btnExpandIfMobile != 'undefined') o.btnExpand.hideOnMobile = !o.btnExpandIfMobile
                    if(typeof o.btnPrintIfMobile != 'undefined') o.btnPrint.hideOnMobile = !o.btnPrintIfMobile
                }

                //arrows
                if (o.sideNavigationButtons) {

                    //if (self.options.btnNext.enabled)
                    this.btnNext = jQuery('<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>')
                        .appendTo(this.bookLayer)
                        .bind('tap click', function(e) {

                            if (self.btnNext.disabled) return;
                            self.btnNext.disabled = true
                            setTimeout(function() {
                                self.btnNext.disabled = false;
                            }, 300)

                            e.stopPropagation();
                            e.preventDefault();
                            self.nextPage();
                        });

                    this.arrowR = this.createIcon(o.btnNext).appendTo(this.btnNext.first())
                        .addClass('flipbook-right-arrow')
                        .css({
                            'width': o.sideBtnSize + 'px',
                            'height': o.sideBtnSize + 'px',
                            'font-size': o.sideBtnSize + 'px',
                            'border-radius': o.sideBtnRadius + 'px',
                            'margin-top': String(-o.sideBtnSize / 2) + 'px',
                            'margin-right': o.sideBtnMargin + 'px',
                            'padding': o.sideBtnPaddingV + 'px ' + o.sideBtnPaddingH + 'px',
                            'text-shadow': o.sideBtnTextShadow,
                            'box-shadow': o.sideBtnShadow,
                            'border': o.sideBtnBorder,
                            'color': o.sideBtnColor,
                            'background': o.sideBtnBackground,
                            'box-sizing': 'initial'
                        })

                   if(o.sideBtnColor) this.arrowR.removeClass("skin-color")
                   if(o.sideBtnBackground) this.arrowR.removeClass("skin-color-bg")



                    //if (self.options.btnPrev.enabled)
                    this.btnPrev = jQuery('<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>')
                        .appendTo(self.bookLayer)
                        .bind('tap click', function(e) {

                            if (self.btnPrev.disabled) return;
                            self.btnPrev.disabled = true
                            setTimeout(function() {
                                self.btnPrev.disabled = false;
                            }, 300)

                            e.stopPropagation();
                            e.preventDefault();
                            self.prevPage();
                        })

                    this.arrowL = this.createIcon(o.btnPrev).appendTo(this.btnPrev.first())
                        .addClass('flipbook-left-arrow')
                        .css({
                            'width': o.sideBtnSize + 'px',
                            'height': o.sideBtnSize + 'px',
                            'font-size': o.sideBtnSize + 'px',
                            'border-radius': o.sideBtnRadius + 'px',
                            'margin-top': String(-o.sideBtnSize / 2) + 'px',
                            'margin-left': o.sideBtnMargin + 'px',
                            'padding': o.sideBtnPaddingV + 'px ' + o.sideBtnPaddingH + 'px',
                            'text-shadow': o.sideBtnTextShadow,
                            'box-shadow': o.sideBtnShadow,
                            'border': o.sideBtnBorder,
                            'color': o.sideBtnColor,
                            'background': o.sideBtnBackground,
                            'box-sizing': 'initial'
                        })

                    if(o.sideBtnColor) this.arrowL.removeClass("skin-color")
                    if(o.sideBtnBackground) this.arrowL.removeClass("skin-color-bg")


                    if (o.btnFirst.enabled) {
                        this.btnFirst = jQuery('<div class="flipbook-nav"><div class="flipbook-arrow-wrapper"></div></div>')
                            .appendTo(this.bookLayer)
                            .bind('tap click', function(e) {

                                if (self.btnFirst.disabled) return;
                                self.btnFirst.disabled = true
                                setTimeout(function() {
                                    self.btnFirst.disabled = false;
                                }, 300)

                                e.stopPropagation();
                                e.preventDefault();
                                self.firstPage();
                            });

                        this.arrowFirst = this.createIcon(o.btnFirst).appendTo(this.btnFirst.first())
                            .addClass('flipbook-first-arrow')
                            .css({
                                'width': o.sideBtnSize + 'px',
                                'height': o.sideBtnSize * .66 + 'px',
                                'font-size': o.sideBtnSize * .66 + 'px',
                                'border-radius': o.sideBtnRadius + 'px',
                                'margin-top': String(o.sideBtnSize / 2 + o.sideBtnMargin + 2 * o.sideBtnPaddingV) + 'px',
                                'margin-left': o.sideBtnMargin + 'px',
                                'padding': o.sideBtnPaddingV + 'px ' + o.sideBtnPaddingH + 'px',
                                'text-shadow': o.sideBtnTextShadow,
                                'box-shadow': o.sideBtnShadow,
                                'border': o.sideBtnBorder,
                                'color': o.sideBtnColor,
                                'background': o.sideBtnBackground,
                                'box-sizing': 'initial'
                            })
                            if(o.sideBtnColor) this.arrowFirst.removeClass("skin-color")
                            if(o.sideBtnBackground) this.arrowFirst.removeClass("skin-color-bg")

                    }

                    if (o.btnLast.enabled) {
                        this.btnLast = this.createIcon(o.btnFirst).appendTo(this.btnFirst.first())
                            .appendTo(self.bookLayer)
                            .bind('tap click', function(e) {

                                if (self.btnLast.disabled) return;
                                self.btnLast.disabled = true
                                setTimeout(function() {
                                    self.btnLast.disabled = false;
                                }, 300)


                                e.stopPropagation();
                                e.preventDefault();
                                self.lastPage();
                            });

                        this.arrowLast = this.createIcon(o.btnLast).appendTo(this.btnLast.first())
                            .addClass('flipbook-last-arrow')
                            .css({
                                'width': o.sideBtnSize + 'px',
                                'height': o.sideBtnSize * .66 + 'px',
                                'font-size': o.sideBtnSize * .66 + 'px',
                                'border-radius': o.sideBtnRadius + 'px',
                                'margin-top': String(o.sideBtnSize / 2 + o.sideBtnMargin + 2 * o.sideBtnPaddingV) + 'px',
                                'margin-right': o.sideBtnMargin + 'px',
                                'padding': o.sideBtnPaddingV + 'px ' + o.sideBtnPaddingH + 'px',
                                'text-shadow': o.sideBtnTextShadow,
                                'box-shadow': o.sideBtnShadow,
                                'border': o.sideBtnBorder,
                                'color': o.sideBtnColor,
                                'background': o.sideBtnBackground,
                                'box-sizing': 'initial'
                            })

                        if(o.sideBtnColor) this.arrowLast.removeClass("skin-color")
                         if(o.sideBtnBackground) this.arrowLast.removeClass("skin-color-bg")


                    }

                    if(o.btnOrder.indexOf('btnFirst') >= 0) o.btnOrder.splice(o.btnOrder.indexOf('btnFirst'), 1);
                    if(o.btnOrder.indexOf('btnPrev') >= 0) o.btnOrder.splice(o.btnOrder.indexOf('btnPrev'), 1);
                    if(o.btnOrder.indexOf('btnNext') >= 0) o.btnOrder.splice(o.btnOrder.indexOf('btnNext'), 1);
                    if(o.btnOrder.indexOf('btnLast') >= 0) o.btnOrder.splice(o.btnOrder.indexOf('btnLast'), 1);

                } 

                if (o.pdfMode && !o.btnDownloadPdf.url)
                    o.btnDownloadPdf.url = o.pdfUrl

                if(!o.textLayer) o.btnSelect.enabled = false

                for (var i = 0; i < o.btnOrder.length; i++) {

                    var btnName = o.btnOrder[i]
                    var btn = o[btnName]

                    if(o.isMobile && btn.hideOnMobile) btn.enabled = false

                    if(btn.enabled){

                        btn.name = btnName

                        if(btn.name == 'currentPage'){
                            this.createCurrentPage()
                        }else{
                            this[btnName] = this.createButton(btn)
                            .bind('touchend click', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                self.onButtonClick(this,e)
                            })
                        }
                    }
                }

                if (o.buttons) {
                    for (var i = 0; i < o.buttons.length; i++) {
                        var btn = o.buttons[i]
                        self.createButton(btn).index(1)
                    }
                }

            },

            onButtonClick:function(btn,e){

                var name = jQuery(btn).attr('data-name'),
                o = this.options

                switch(name){
                    case 'btnFirst':
                        this.firstPage()
                        break;
                    case 'btnPrev':
                        this.prevPage()
                        break;
                    case 'btnNext':
                        this.nextPage()
                        break;
                    case 'btnLast':
                        this.lastPage()
                        break;
                    case 'btnZoomIn':
                        this.zoomIn()
                        break;
                    case 'btnZoomOut':
                        this.zoomOut()
                        break;
                    case 'btnAutoplay':
                        if (!this.autoplay)
                            this.nextPage()
                        this.toggleAutoplay();
                        break;
                    case 'btnSearch':
                        this.toggleSearch()
                        break;
                    case 'btnBookmark':
                        this.toggleBookmark()
                        break;
                    case 'btnRotateLeft':
                        if(this.Book.rotateLeft) this.Book.rotateLeft()
                        break;
                    case 'btnRotateRight':
                        if(this.Book.rotateRight) this.Book.rotateRight()
                        break;
                    case 'btnToc':
                        this.toggleToc()
                        break;
                    case 'btnThumbs':
                        this.toggleThumbs()
                        break;
                    case 'btnShare':
                        this.toggleShareMenu()
                        break;
                    case 'btnDownloadPages':

                        if (o.downloadMenu) {

                            this.toggleDownloadMenu()

                        } else {

                            var link = document.createElement('a');
                            link.href = o.btnDownloadPages.url;
                            link.download = o.btnDownloadPages.name;
                            link.dispatchEvent(new MouseEvent('click'));

                        }

                        break;

                    case 'btnPrint':

                        if (o.printMenu) 
                            this.togglePrintMenu();
                         else 
                            this.togglePrintWindow();

                        break;

                    case 'btnDownloadPdf':

                        if (o.btnDownloadPdf.forceDownload) {

                            var path = o.btnDownloadPdf.url;
                            var save = document.createElement('a');
                            save.href = path;
                            var filename = save.href.split('/').pop().split('#')[0].split('?')[0];
                            save.download = filename;
                            document.body.appendChild(save);
                            save.click();
                            document.body.removeChild(save);

                        } else {

                            var target = o.btnDownloadPdf.openInNewWindow || typeof(o.btnDownloadPdf.openInNewWindow == 'undefined') ? '_blank' : '_self'
                            window.open(o.btnDownloadPdf.url, target)

                        }

                        if(this.gaCode){
                            ga('send', {
                               hitType: 'event',
                               eventCategory: 'Flipbook : '+o.name,
                               eventAction: 'download PDF' ,
                               eventLabel: o.btnDownloadPdf.url,
                               nonInteraction: true
                           });
                        }
                        
                        break;

                    case 'btnSound':
                        this.toggleSound()
                        break;
                    case 'btnSelect':
                        this.toggleTool()
                        break;
                    case 'btnExpand':
                        this.toggleExpand()
                        break;
                    case 'btnClose':
                       // if(!this.lightbox) return;
                       // var $target = jQuery(e.target)
                       // if (!$target.parents().hasClass('flipbook-overlay') || $target.hasClass('flipbook-bookLayer'))
                            this.lightbox.closeLightbox();
                        break;

                }
            },

            handleFsChange: function(e) {

                if (!this.Book || !this.Book.enabled)
                    return

                // var $el = this.lightbox ? this.$body : this.$elem
                var $el = jQuery(this.fullscreenElement)
                
                var currentFullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
                if (currentFullscreenElement === this.fullscreenElement || this.isFullscreen) {
                    
                    this.btnExpand.$icon.hide()
                    this.btnExpand.$iconAlt.show()

                    $el.addClass('flipbook-browser-fullscreen')

                    this.fullscreenActive = true

                    if (this.options.onfullscreenenter)
                        this.options.onfullscreenenter.call(this)

                } else {

                    this.btnExpand.$icon.show()
                    this.btnExpand.$iconAlt.hide()

                    $el.removeClass('flipbook-browser-fullscreen')

                    this.fullscreenActive = false
                    
                    if (this.options.onfullscreenexit)
                        this.options.onfullscreenexit.call(this)
                }

                this.triggerResizeOnce()

            },

            createLogo: function() {
                var o = this.options
                if (!o.logoImg) return;
                if (o.isMobile && o.logoHideOnMobile) return;

                var $logo = jQuery('<img>')
                    .attr('src', o.logoImg)
                    .attr('style', o.logoCSS)
                    .appendTo(this.wrapper)

                if (o.logoAlignH == 'right')
                    $logo.css('right', '0')
                if (o.logoAlignV == 'bottom')
                    $logo.css('bottom', '0')

                if (o.logoUrl) {
                    $logo.bind('touchend click', function() {
                        window.open(o.logoUrl, '_blank')
                    })
                }
            },

            setLoadingProgress: function(percent) {

                if(this.disposed)
                    return

                if(this.$fillPreloader)
                    this.setFillPreloaderProgress(percent)
                else{
                    if (percent > 0 && percent < 1) {
                        jQuery(this.preloader).stop(true, true).show()
                    } else {
                        jQuery(this.preloader).stop(true, true).hide()
                    }
                }

                
            },

            setFillPreloaderProgress: function(percent) {

                if (!this.$fillPreloader)
                    return;

                if (percent > 0 && percent < 1) {

                    this.fillPreloaderProgress = this.fillPreloaderProgress || 0

                    if (percent < this.fillPreloaderProgress)
                        return;
                    else
                        this.fillPreloaderProgress = percent
                    // percent = .5
                    var img = this.$fillPreloaderImg[0]
                    img.style.clip = "rect(0px," + img.width * percent + "px," + img.height + "px,0px)"
                    this.$fillPreloader.show()

                } else {
                    this.$fillPreloader.hide()

                }
            },

            createNavigation: function() {
                var self = this;

                this.navLeft = jQuery('<div />');
                this.navLeft
                    // .appendTo(this.bookLayer)
                    // .css('position','absolute')
                    // .css('width','200px')
                    // .css('height','200px')
                    .css('background', '#f00')
                    .css('left', '0')
                    .css('top', '200px')
                    .attr('aria-hidden', 'true')
                    .addClass('skin-color fa fa-chevron-left fa-5x')
                    .css('margin-top', this.navLeft.height() + 'px')
                    .bind('touchend click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        self.prevPage();
                    });

                this.navRight = jQuery('<div />')
                    .appendTo(this.bookLayer)
                    .css('position', 'absolute')
                    .css('width', '200px')
                    .css('height', '200px')
                    .css('margin-top', '-100px')
                    .css('background', '#f00')
                    .css('right', '0')
                    .css('top', '200px')
                    .bind('touchend click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        self.nextPage();
                    });


            },
            playFlipSound: function() {

                var self = this

                if (this.options.sound && this.Book.enabled && typeof(this.flipsound.play) != 'undefined') {

                    this.flipsound.currentTime = 0;

                    setTimeout(function() {

                        try {

                            self.flipsound.play()

                        } catch (e) {

                        }

                    }, 100);
                }
            },

            onMouseWheel: function(e) {
                //console.log(e)

                if ('wheelDeltaX' in e) {
                    wheelDeltaX = e.wheelDeltaX / 12;
                    wheelDeltaY = e.wheelDeltaY / 12;
                } else if ('wheelDelta' in e) {
                    wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
                } else if ('detail' in e) {
                    wheelDeltaX = wheelDeltaY = -e.detail * 3;
                } else {
                    return;
                }
                if (wheelDeltaX > 0)
                    this.zoomIn(e)
                else
                    this.zoomOut(e);

            },

            zoomTo: function(val, time, e) {

                // console.log(val, time, e, e.pageX)

                this.zoom = val

                var x, y

                if (typeof e == 'undefined') {

                    //zoom to middle
                    x = this.model.wrapperW / 2
                    y = this.model.wrapperH / 2

                } else {

                    if (e.touches && e.touches[0]) {

                        x = e.touches[0].pageX
                        y = e.touches[0].pageY

                    } else if (e.changedTouches && e.changedTouches[0]) {

                        x = e.changedTouches[0].pageX
                        y = e.changedTouches[0].pageY

                    } else {

                        x = e.pageX
                        y = e.pageY
                    }

                    //main wrapper offset - works for all modes

                    // if(!this.fullscreenActive){
                        x = x - this.wrapper.offset().left
                        y = y - this.wrapper.offset().top
                    // }

                }

                // console.log(this.zoom, this.options.zoomMin, this.options.zoomMax)
                if(this.zoom < this.options.zoomMin)
                    this.zoom = this.options.zoomMin
                if(this.zoom > this.options.zoomMax)
                    this.zoom = this.options.zoomMax

                this.model.zoom = this.zoom

                this.Book.zoomTo(this.zoom, time, x, y);

                this.onZoom(this.zoom)

            },

            zoomOut: function(e) {

                var newZoom = this.zoom / this.options.zoomStep
                newZoom = newZoom < this.options.zoomMin ? this.options.zoomMin : newZoom;

                if(this.zoom == newZoom)
                    return

                this.zoom = newZoom

                var t = this.options.zoomTime

                this.zoomTo(this.zoom, t, e)

            },

            zoomIn: function(e) {

                var newZoom = this.zoom * this.options.zoomStep

                if (this.bookLayer.height() * newZoom > this.options.zoomSize)
                    newZoom = this.options.zoomSize / this.bookLayer.height()
                //newZoom = newZoom > this.options.zoomMax ? this.options.zoomMax : newZoom;

                if(this.zoom == newZoom)
                    return

                this.zoom = newZoom

                var t = this.options.zoomTime

                this.zoomTo(this.zoom, t, e)

            },

            nextPage:function(){

                if(this.Book) this.Book.nextPage()

            },

            prevPage:function(){

                if(this.Book) this.Book.prevPage()

            },

            firstPage:function(){

                this.goToPage(1)

            },

            lastPage:function(){

                this.goToPage(this.options.pages.length)

            },

            goToPage: function(pageNumber, instant) {

                       // if(pageNumber > this.options.numPages) pageNumber = this.options.numPages
                      //  if(pageNumber < 1) pageNumber = 1

                if(this.Book)
                    this.Book.goToPage(pageNumber, instant)

            },

            onZoom: function(newZoom) {

                this.zoom = newZoom
                this.enableButton(this.btnZoomIn, newZoom < this.options.zoomMax)
                this.enableButton(this.btnZoomOut, newZoom > this.options.zoomMin)
                this.enableSwipe(newZoom <= 1)
                this.model.zoom = newZoom

            },

            enableSwipe: function(val) {

                this.swipeEnabled = val

            },

            createCurrentPage: function() {

                var self = this, o = this.options;
                var menu, cssClass = 'flipbook-currentPageHolder '

                if(o.currentPage.vAlign == 'top'){
                    if(o.currentPage.hAlign == 'left'){
                        menu = this.menuTL
                    }else if(o.currentPage.hAlign == 'right'){
                        menu = this.menuTR
                    }else
                        menu = this.menuTC
                }else{
                    if(o.currentPage.hAlign == 'left'){
                        menu = this.menuBL
                    }else if(o.currentPage.hAlign == 'right'){
                        menu = this.menuBR
                    }else
                        menu = this.menuBC

                }

                var floating = ((o.currentPage.vAlign == 'top' && o.menu2Transparent) || (o.currentPage.vAlign != 'top' && o.menuTransparent))
                var bgColor =  floating ? o.floatingBtnBackground : ''
                var color = floating ? o.floatingBtnColor : o.btnColor
                var textShadiw = floating ? o.floatingBtnTextShadow : ''
                var radius = floating ? o.floatingBtnRadius : o.btnRadius
                var margin = floating ? o.floatingBtnMargin : o.btnMargin

                var currentPageHolder = jQuery('<div>')
                    .appendTo(menu)

                currentPageHolder.css('margin', o.currentPage.marginV + 'px ' + o.currentPage.marginH + 'px')

                if(!floating)
                    cssClass += "skin-color "
                
                currentPageHolder
                    .addClass(cssClass)
                    .css({
                        'color':color,
                        'background':bgColor,
                        'text-shadow':textShadiw,
                        'border-radius':radius + 'px'
                    })

                if(o.currentPage.order)
                    currentPageHolder.css('order', o.currentPage.order)
                        
                this.currentPageHolder = currentPageHolder
                this.currentPage = jQuery(document.createElement('div'))
                    .addClass('flipbook-currentPageNumber')
                    .appendTo(currentPageHolder)

                var $form = jQuery('<form>')
                    .appendTo(currentPageHolder)
                    .submit(function(e) {

                        var value = parseInt(self.currentPageInput.val());
                        value = value > o.pages.length ? o.pages.length : value;
                        if (self.options.rightToLeft) {

                            value = o.pages.length - value + 1;
                        }
                        //self.updateCurrentPage();
                        //if (self.options.singlePageMode) value--;
                        self.goToPage(value);
                        self.currentPageInput.trigger('blur')
                        return false
                    })

                this.currentPageInput = jQuery('<input type="text" maxlength="4">')
                    .addClass('flipbook-currentPageInput')
                    .css({
                        'margin': o.currentPage.marginV + 'px ' + o.currentPage.marginH + 'px',
                        'color':color
                    })
                    .appendTo($form)
                    .val('')
                    .focus(function() {

                        self.currentPageInput.val('')
                        self.currentPage.addClass('flipbook-color-transparent')

                    })
                    .blur(function() {

                        self.currentPageInput.val('')
                        self.currentPage.removeClass('flipbook-color-transparent')

                    })

                if(!floating)
                    this.currentPageInput.addClass('skin-color')

            },

            createMenuHeader: function(elem, title, onClose) {

                var self = this

                var header = jQuery("<div>")
                    .addClass("flipbook-menu-header skin-clor flipbook-font")
                    .appendTo(elem);

                var title = jQuery('<span>')
                    .text(title)
                    .addClass('flipbook-menu-title skin-color')
                    .appendTo(header);

                var btnClose = jQuery('<span>').appendTo(header)
                    .addClass('flipbook-btn-close')
                    .bind('touchend click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        self.closeMenus()
                    });

                var $icon = this.createIcon(this.options.btnClose, null, true)
                    .appendTo(btnClose)
                    // .attr('aria-hidden', 'true')
                    // .addClass('fa fa-times flipbook-btn-close-icon skin-color')


            },

            createToc: function() {

                var self = this,
                tocArray = this.options.tableOfContent;

                if(!tocArray && this.pdfService && !this.pdfService.outlineLoaded){
                    self.pdfService.loadOutline(function(outline){
                        self.options.tableOfContent = outline
                        self.createToc()
                    })
                    return
                }

                this.tocHolder = jQuery('<div>')
                    .addClass('flipbook-tocHolder flipbook-side-menu skin-color-bg')
                    .appendTo(this.wrapper)
                    .hide()

                this.createMenuHeader(this.tocHolder, this.strings.tableOfContent, this.toggleToc)

                // .css('left', '-1000px')
                this.toc = jQuery('<div>')
                    .addClass('flipbook-toc')
                    .appendTo(this.tocHolder)

                this.tocScroller = jQuery('<div>')
                    .addClass('flipbook-toc-scroller')
                    .appendTo(this.toc);

                this.tocScroll = new FLIPBOOK.IScroll(self.toc[0], {
                    bounce: false,
                    mouseWheel: true,
                    scrollbars: true,
                    interactiveScrollbars: true
                });

                 if (tocArray && tocArray.length > 0) {

                    var pages = this.options.pages;
                    for (var i = 0; i < tocArray.length; i++) {

                        this.createTocItem(tocArray[i])
                    }

                } else {

                    var arr = this.options.pages
                    for (var i = 0; i < arr.length; i++) {
                        var title = arr[i].title
                        if (title == "" || typeof title == 'undefined')
                            continue;
                        var page = String(i + 1)
                        var item = {title:title, page:page}

                        this.createTocItem(item)

                    }

                }

                this.initColors()
                this.tocScroll.refresh();
                this.tocCreated = true
                this.toggleToc()

            },

            createTocItem:function(item, parent, level){

                var self = this
                var parent = parent || this.tocScroller

                var tocItem = jQuery(document.createElement('a'))
                .attr('class', 'flipbook-tocItem')
                .addClass('skin-color')
                // .attr('title', item.page)
                .appendTo(parent)
                .bind('touchend click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();

                    //console.log(item)

                    if (self.tocScroll.moved) 
                        return;

                    if (self.options.tableOfContentCloseOnClick)
                        self.toggleToc(false)

                    if(!item.page && item.dest){
                        self.pdfService.pdfDocument.getPageIndex(item.dest[0]).then(function(index){
                            // item.page = index + 1

                            var targetPage = index + 1

                            targetPage = self.options.rightToLeft ? self.options.pages.length - targetPage + 1 : targetPage   

                            setTimeout(function(){
                                self.goToPage(targetPage);
                            },200)

                        })
                    }else{

                        var targetPage = item.page

                        targetPage = self.options.rightToLeft ? self.options.pages.length - targetPage + 1 : targetPage   

                        setTimeout(function(){
                            self.goToPage(targetPage);
                        },200)

                    }
                    
                });

                if(!level) 
                    level = 0
                
                tocItem.level = level

                tocItem.css('padding','8px 0')
                tocItem.css('margin-left','10px')
                if(!level){
                    tocItem.css('margin-right','15px')
                    tocItem.css('padding-left','10px')
                }
                else{
                    tocItem.css('margin-top','8px')
                    tocItem.css('padding-bottom','0')
                }

                var expandBtn = jQuery(document.createElement('span'))
                .appendTo(tocItem)
                .css('width','20px')
                .css('display','inline-block')
                .css('cursor','auto')
                .bind('touchend click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        for (var i = 0; i < tocItem.items.length; i++) {
                           tocItem.items[i].toggle()
                        }
                        $icon.toggle()
                        $icon2.toggle()
                        self.tocScroll.refresh();
                    })

                var $icon = jQuery('<span>')
                .attr('aria-hidden', 'true')
                .appendTo(expandBtn)
                .addClass('fa fa-chevron-right skin-color')
                .hide()

                var $icon2 = jQuery('<span>')
                .attr('aria-hidden', 'true')
                .appendTo(expandBtn)
                .addClass('fa fa-chevron-down skin-color')
                .hide()


                jQuery(document.createElement('span'))
                    .appendTo(tocItem)
                    .addClass('title')
                    .text(item.title)
                    .css('width', String(170 - tocItem.level * 10) + 'px');
                jQuery(document.createElement('span'))
                    .appendTo(tocItem)
                    .attr('class', 'right')
                    .text(item.page);

                if(item.items && item.items.length){
                    tocItem.items = []
                    for (var i = 0; i < item.items.length; i++) {
                        var subItem = this.createTocItem(item.items[i], tocItem, tocItem.level + 1)
                        tocItem.items.push(subItem)
                        subItem.hide()
                    }
                    $icon.show()
                }

                return tocItem

            },

            enablePrev: function(val) {

                this.enableButton(this.btnPrev, val)
                this.enableButton(this.btnFirst, val)
                this.Book.enablePrev(val)

            },

            enableNext: function(val) {

                this.enableButton(this.btnNext, val)
                this.enableButton(this.btnLast, val)
                this.Book.enableNext(val)

            },

            /* enableAutoplay: function(val) {

                 this.enableButton(this.btnAutoplay, val)
                 this.enableButton(this.btnAutoplay, val)

             },*/

            enableButton: function(button, enabled) {
                if (typeof(button) == 'undefined')
                    return;
                if (enabled) {
                    button.css('opacity', '1')
                    button.css('pointer-events', 'auto')
                } else {
                    button.css('opacity', '0.2')
                    button.css('pointer-events', 'none')
                }
                button.enabled = enabled
            },

            resize: function() {

                if(!this.Book || !this.Book.enabled)
                    return

                var o = this.options

                if (!o.menuOverBook && this.menuShowing && this.menuBottom){
                    this.bookLayer.css('bottom', this.menuBottom.outerHeight() + 'px');
                }else{
                    this.bookLayer.css('bottom', '0px');
                }

                if (!o.menu2OverBook && this.menuShowing && this.menuTop){
                    this.bookLayer.css('top', this.menuTop.outerHeight() + 'px');
                } else{
                    this.bookLayer.css('top', '0px');
                }


                // this.bookLayer.css('top', '0px');
                // this.bookLayer.css('bottom', '0px');

                if(this.tocShowing || this.thumbsShowing || this.searchShowing || this.bookmarkShowing){
                    if(!o.sideMenuOverBook){
                        this.bookLayer.css('left', '250px')
                    } 
                    if(!this.options.sideMenuOverMenu){
                        this.wrapper.find('.flipbook-side-menu').css('bottom', this.menuBottom.outerHeight() + 'px')
                    } 
                    if(!this.options.sideMenuOverMenu2){
                        this.wrapper.find('.flipbook-side-menu').css('top', this.menuTop.outerHeight() + 'px')
                    } 
                }else{
                    this.bookLayer.css('left', '0px')
                }

                var model = this.model
                model.wrapperW = this.bookLayer.width()
                model.wrapperH = this.bookLayer.height()

                // if(o.menuFloating){
                //     this.menuBottom.css('left', model.wrapperW/2 - this.menuBottom.width()/2)
                // }
                // if(o.menu2Floating){
                //     this.menuTop.css('left', model.wrapperW/2 - this.menuTop.width()/2)
                // }

                o.zoomMax = o.zoomSize / model.wrapperH

                model.zoom = o.zoomMin
                this.Book.onResize();
                

            },

            pdfResize: function() {
                var self = this
                
                /*
                    //this.pdfDocument.getPage(1).then(function(page) {
                    //self.viewportOriginal = page.getViewport(1);
                var bh = self.bookLayer.height()
                scale = bh / self.viewportOriginal.height
                scale *= self.zoom

                function findClosestInArray(num, arr) {
                    var minDist = null
                    var dist
                    for (var i = 0; i < arr.length; i++) {
                        dist = Math.abs(num - arr[i])
                        if (!minDist || dist < minDist) {
                            minDist = dist
                            min = arr[i]
                        }
                    }
                    return min
                }

                scale = findClosestInArray(scale, self.options.pdf.supportedScales)


                if (self.Book && self.options.pdf.currentScale != scale)*/
                self.Book.onZoom();
                //});


            },

            createThumbs: function() {

                this.thumbs = new FLIPBOOK.Thumbnails(this)

            },

            toggleThumbs: function(value) {

                if (!this.thumbs) {
                    this.createThumbs()
                }

                if(typeof value != 'undefined')
                    this.thumbsShowing = !value

                if(!this.thumbsShowing){
                    this.closeMenus()
                    this.thumbs.show()
                    this.thumbsShowing = true

                }else{

                    this.thumbs.hide()
                    this.thumbsShowing = false

                }

                this.resize()

            },

            toggleToc: function(value) {

                if (!this.tocCreated) {

                    this.createToc()
                    return
                
                }

                if (!this.tocShowing || value) {

                    this.closeMenus()
                    this.tocShowing = true
                    this.tocHolder.show()
                    this.tocScroll.refresh();
                    

                } else {

                    this.tocHolder.hide()
                    this.tocShowing = false

                }

                this.resize()

            },

            toggleSearch: function(value) {

                if (!this.thumbs) {
                    this.createThumbs()
                }

                if(typeof value != 'undefined')
                    this.searchShowing = !value

                if(!this.searchShowing){
                    this.closeMenus()
                    this.thumbs.show()
                    this.thumbs.showSearch()
                    this.searchShowing = true

                }else{

                    this.thumbs.hide()
                    this.searchShowing = false
                    this.unmark()

                }

                this.resize()

            },

            toggleBookmark: function(value) {

                if (!this.thumbs) {
                    this.createThumbs()
                }

                if(typeof value != 'undefined')
                    this.bookmarkShowing = !value

                if(!this.bookmarkShowing){
                    this.closeMenus()
                    this.thumbs.show()
                    this.thumbs.showBookmarks()
                    this.bookmarkShowing = true

                }else{

                    this.thumbs.hide()
                    this.bookmarkShowing = false

                }

                this.resize()

            },

            closeMenus: function() {

                if (this.thumbsShowing) this.toggleThumbs()
                if (this.tocShowing) this.toggleToc()
                if (this.searchShowing) this.toggleSearch()
                if (this.bookmarkShowing) this.toggleBookmark()

                if (this.printMenuShowing) this.togglePrintMenu()
                if (this.dlMenuShowing) this.toggleDownloadMenu()
                if (this.shareMenuShowing) this.toggleShareMenu()

            },

            togglePrintMenu: function() {

                var self = this

                if (!this.printMenu) {

                    this.printMenu = jQuery('<div class="flipbook-sub-menu flipbook-font">').appendTo(this.wrapper)

                    var center = jQuery('<idv class="flipbook-sub-menu-center">').appendTo(this.printMenu)
                    var content = jQuery('<idv class="flipbook-sub-menu-content skin-color-bg">').appendTo(center)

                    this.createMenuHeader(content, this.strings.print, this.togglePrintMenu)

                    var current = jQuery('<a><div class="c-p skin-color flipbook-btn">'+this.strings.printCurrentPage+'</div></a>')
                        .appendTo(content)
                        .bind('touchend click', function(e) {
                            self.printPage(self.cPage[0], this)
                        })
                    var left = jQuery('<a><div class="c-l-p skin-color flipbook-btn">'+this.strings.printLeftPage+'</div></a>').appendTo(this.printMenu)
                        .appendTo(content)
                        .bind('touchend click', function(e) {
                            self.printPage(self.cPage[0], this)
                        })

                    var right = jQuery('<a><div class="c-r-p skin-color flipbook-btn">'+this.strings.printRightPage+'</div></a>').appendTo(this.printMenu)
                        .appendTo(content)
                        .bind('touchend click', function(e) {
                            self.printPage(self.cPage[1], this)
                        })

                    var all = jQuery('<a><div class="skin-color flipbook-btn">'+this.strings.printAllPages+'</div></a>')
                        .appendTo(content)
                        .bind('touchend click', function(e) {

                            self.togglePrintWindow()

                        })

                    this.closeMenus()
                    this.printMenuShowing = true
                    this.initColors()
                    this.updateCurrentPage()

                } else if (!this.printMenuShowing) {

                    this.closeMenus()

                    // this.printMenu.show()
                    this.printMenu.show()
                    this.printMenuShowing = true
                    this.updateCurrentPage()

                } else {

                    this.printMenu.hide()
                    this.printMenuShowing = false

                }

            },

            toggleDownloadMenu: function() {

                var self = this

                if (!this.dlMenu) {

                    this.dlMenu = jQuery('<div class="flipbook-sub-menu flipbook-font">').appendTo(this.wrapper)

                    var center = jQuery('<idv class="flipbook-sub-menu-center">').appendTo(this.dlMenu)
                    var content = jQuery('<idv class="flipbook-sub-menu-content skin-color-bg">').appendTo(center)

                    this.createMenuHeader(content, this.strings.download, this.toggleDownloadMenu)

                    var current = jQuery('<a><div class="c-p skin-color flipbook-btn">'+this.strings.downloadCurrentPage+'</div></a>')
                        .appendTo(content)
                        .bind('touchend click', function(e) {
                            self.downloadPage(self.cPage[0], this)
                        })
                    var left = jQuery('<a><div class="c-l-p skin-color flipbook-btn">'+this.strings.downloadLeftPage+'</div></a>')
                        .appendTo(content)
                        .bind('touchend click', function(e) {
                            self.downloadPage(self.cPage[0], this)
                        })

                    var right = jQuery('<a><div class="c-r-p skin-color flipbook-btn">'+this.strings.downloadRightPage+'</div></a>')
                        .appendTo(content)
                        .bind('touchend click', function(e) {
                            self.downloadPage(self.cPage[1], this)
                        })

                    var all = jQuery('<a><div class="skin-color flipbook-btn">'+this.strings.downloadAllPages+'</div></a>')
                        .appendTo(content)
                        .bind('touchend click', function(e) {

                            var link = document.createElement('a');
                            link.href = self.options.btnDownloadPages.url;
                            var filename = link.href.split('/').pop().split('#')[0].split('?')[0];
                            link.download = filename;
                            link.dispatchEvent(new MouseEvent('click'));

                            // window.location = self.options.btnDownloadPages.url;
                        })

                    this.closeMenus()
                    this.dlMenuShowing = true
                    this.initColors()
                    this.updateCurrentPage()

                } else if (!this.dlMenuShowing) {

                    // this.dlMenu.show()
                    this.dlMenu.show()
                    this.closeMenus()
                    this.dlMenuShowing = true
                    this.updateCurrentPage()

                } else {

                    this.dlMenu.hide()
                    this.dlMenuShowing = false

                }

            },

            toggleShareMenu: function() {

                var self = this

                if (!this.shareMenu) {

                    this.shareMenu = jQuery('<div class="flipbook-sub-menu flipbook-font">').appendTo(this.wrapper)

                    var center = jQuery('<idv class="flipbook-sub-menu-center">').appendTo(this.shareMenu)
                    var content = jQuery('<idv class="flipbook-sub-menu-content skin-color-bg">').appendTo(center)

                    this.createMenuHeader(content, "Share", this.toggleShareMenu)

                    var shareBtn = jQuery('<idv class="flipbook-share">').appendTo(content)

                    var o = this.options

                    this.share = new Share(shareBtn[0], {
                        networks: {
                            google_plus: o.google_plus,
                            twitter: o.twitter,
                            facebook: o.facebook,
                            pinterest: o.pinterest,
                            email: o.email
                        }
                    });

                    this.closeMenus()
                    this.shareMenuShowing = true
                    this.initColors()

                } else if (!this.shareMenuShowing) {

                    // this.shareMenu.show()
                    this.shareMenu.show()

                    this.closeMenus()
                    this.shareMenuShowing = true

                } else {

                    this.shareMenu.hide()
                    this.shareMenuShowing = false

                }



            },

            bookmarkPage: function(index) {

                var arr = this.getBookmarkedPages()
                if (arr.indexOf(String(index)) < 0)
                    arr.push(index)
                this.setBookmarkedPages(arr)

                this.thumbs.showBookmarkedThumbs()

                if (!this.bookmarkShowing)
                    this.toggleBookmark()

            },

            removeBookmark: function(index) {

                var arr = this.getBookmarkedPages()
                if (arr.indexOf(String(index)) > -1)
                    arr.splice(arr.indexOf(String(index)), 1)
                this.setBookmarkedPages(arr)

                this.thumbs.showBookmarkedThumbs()

                if (!this.bookmarkShowing)
                    this.toggleBookmark()

            },


            isBookmarked: function(index) {
                var arr = this.getBookmarkedPages()
                return (arr.indexOf(String(index)) > 0)
            },

            getBookmarkedPages: function() {
                var str = localStorage.getItem(this.options.name + "_flipbook_bookmarks")
                if (str)
                    return str.split(";")
                else
                    return []
            },

            setBookmarkedPages: function(arr) {
                localStorage.setItem(this.options.name + "_flipbook_bookmarks", arr.join(";"))

            },


            printPage: function(index, link) {

                var url

                if (this.options.pages[index] && this.options.pages[index].print) {

                    url = this.options.pages[index].print

                } else if (this.options.pages[index] &&
                    this.options.pages[index].canvas &&
                    this.options.pages[index].canvas[this.options.pageTextureSize]) {

                    url = this.options.pages[index].canvas[this.options.pageTextureSize].toDataURL()
                } else if (this.options.pages[index] && this.options.pages[index].src) {

                    url = this.options.pages[index].src

                }

                if (url) {

                    var windowContent = '<!DOCTYPE html>';
                    windowContent += '<html>'
                    windowContent += '<head><title>Print canvas</title></head>';
                    windowContent += '<body>'
                    windowContent += '<img src="' + url + '">';
                    windowContent += '</body>';
                    windowContent += '</html>';
                    var printWin = window.open("", 'Print', 'height=1600,width=800');
                    printWin.document.open();
                    printWin.document.write(windowContent);
                    printWin.document.close();

                    printWin.document.addEventListener('load', function() {
                        printWin.focus();
                        printWin.print();
                        printWin.document.close();
                        printWin.close();
                    }, true);

                }else{
                            var self = this
                            this.loadPage(index, this.options.pageTextureSize, function(){
                                        self.printPage(index)
                            })
                }

            },

            downloadPage: function(index) {

                if (this.options.pages[index] && this.options.pages[index].download) {

                    url = this.options.pages[index].download

                } else if (this.options.pages[index] && this.options.pages[index].src) {

                    url = this.options.pages[index].src

                } else if (this.options.pages[index] &&
                    this.options.pages[index].canvas &&
                    this.options.pages[index].canvas[this.options.pageTextureSize]) {

                    var c = document.createElement("canvas")
                    var r = this.options.pageWidth / this.options.pageHeight
                    c.width = this.options.pageTextureSize * r;
                    c.height = this.options.pageTextureSize;
                    var ctx = c.getContext("2d");
                    ctx.drawImage(this.options.pages[index].canvas[this.options.pageTextureSize], 0, 0);

                    // url = this.options.pages[index].canvas[this.options.pageTextureSize].toDataURL('image/jpeg', 0.5);
                    url = c.toDataURL('image/jpeg', 0.5);
                    // delete c;

                }

                if (url) {

                    var link = document.createElement('a');
                    link.href = url
                    link.download = "page" + String(index + 1)
                    // link.dispatchEvent(new MouseEvent('click'));

                    document.body.appendChild(link);
                    link.click();
                    // Cleanup the DOM
                    document.body.removeChild(link);
                    // delete link;


                }else{
                            var self = this
                            this.loadPage(index, this.options.pageTextureSize, function(){
                                        self.downloadPage(index)
                            })
                }

            },

            printPdf: function(url) {

                /*try{
                    var iframe = this._printIframe;
                    if (!this._printIframe) {
                        iframe = this._printIframe = document.createElement('iframe');
                        document.body.appendChild(iframe);

                        
                    }

                    iframe.style.display = 'none';
                    iframe.onload = function() {
                        setTimeout(function() {
                            iframe.focus();
                            iframe.contentWindow.print();
                        }, 1);
                    };

                    iframe.src = url;
                }catch(err){*/
                var w = window.open(url, '_blank')
                w.onload = function() {
                    this.print()
                }
                /*
                                }*/
            },
            togglePrintWindow: function(value) {
                var self = this;

                if (self.options.printPdfUrl) {
                    self.printPdf(self.options.printPdfUrl)
                    return
                }

                if (self.options.pdfUrl) {
                    self.printPdf(self.options.pdfUrl)
                    return
                }

                function printme() {
                    link = "about:blank";
                    var pw = window.open(link, "_new");
                    pw.document.open();
                    var images = ""
                    for (var i = 0; i < self.options.pages.length; i++) {
                        if (self.options.pages[i].src)
                            images += '<img src="' + self.options.pages[i].src.toString() + '"/>\n'
                    }
                    var printHtml = printWindowHtml(images)
                    pw.document.write(printHtml);
                    pw.document.close();
                }


                function printWindowHtml(images) {
                    // We break the closing script tag in half to prevent
                    // the HTML parser from seeing it as a part of
                    // the *main* page.

                    return "<html>\n" +
                        "<head>\n" +
                        "<title>Temporary Printing Window</title>\n" +
                        "<script>\n" +
                        "function step1() {\n" +
                        "  setTimeout('step2()', 10);\n" +
                        "}\n" +
                        "function step2() {\n" +
                        "  window.print();\n" +
                        "  window.close();\n" +
                        "}\n" +
                        "</scr" + "ipt>\n" +
                        "</head>\n" +
                        "<body onLoad='step1()'>\n" +
                        images +
                        "</body>\n" +
                        "</html>\n";
                }

                printme()
                return;


                var self = this
                if (!this.printWindowCreated) {
                    this.printWindowCreated = true
                    this.printWindow = jQuery('<div>').addClass('flipbook-print-window').appendTo(this.wrapper)
                    var html = jQuery('<div class="panel panel-default">' +
                        '<div class="panel-heading">Print</div>' +
                        '<div class="panel-body">' +
                        '<div class="row">' +
                        '<div class="col-lg-12">' +
                        '<form role="form">' +
                        '<div class="form-group">' +
                        '<label></label>' +
                        '<label class="radio-inline"><input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked>Left page</label>' +
                        '<label class="radio-inline"><input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">Right page</label>' +
                        '<label class="radio-inline"><input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3">All pages</label>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label>Or select one or more pages</label>' +
                        '<select multiple class="form-control">' +
                        '<option>Page 1</option>' +
                        '</select>' +
                        '</div>' +
                        '<button type="button" class="btn btn-default btn-close">Close</button>' +
                        '<button type="button" class="btn btn-default pull-right btn-print">Print</button>' +
                        '</form>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>').appendTo(this.printWindow).hide().fadeIn()

                    this.printWindow.find('.btn-print').bind('touchend click', function() {
                        printme()
                    })
                    this.printWindow.find('.btn-close').bind('touchend click', function() {
                        self.printWindow.fadeToggle()
                    })
                } else {
                    this.printWindow.fadeToggle()
                }
            },
            thumbsVertical: function() {
                if (!this.thumbsCreated)
                    return;
                this.thumbScroll.hScroll = false;
                this.thumbScroll.vScroll = true;
                this.thumbScroll.refresh();
            },

            toggleExpand: function(e) {

                this.browserFullscreen = true

                if (screenfull.enabled) {

                    screenfull.toggle(this.fullscreenElement)

                } else {

                    this.isFullscreen = !this.isFullscreen
                    this.handleFsChange()

                }

            },

            expand: function() {

            },

            toggleAutoplay: function(value) {
                var self = this
                this.autoplay = value || !this.autoplay;

                if (this.autoplay) {

                    this.btnAutoplay.$icon.hide()
                    this.btnAutoplay.$iconAlt.show()


                    this.autoplayTimer = setInterval(function() {

                        if (self.autoplay) {

                            var autoplayStartPage = self.options.autoplayStartPage || 1

                            if (self.options.rightToLeft) {
                                if (self.Book.prevEnabled)
                                    self.prevPage()
                                else
                                    self.goToPage(self.options.pages.length - autoplayStartPage + 1)
                            } else {
                                if (self.Book.nextEnabled)
                                    self.nextPage()
                                else
                                    self.goToPage(autoplayStartPage)
                            }

                        }
                    }, self.options.autoplayInterval)
                } else {
                    this.btnAutoplay.$icon.show()
                    this.btnAutoplay.$iconAlt.hide()
                    clearInterval(self.autoplayTimer)
                }
            },

            triggerResizeOnce: function() {
                setTimeout(function() {
                    jQuery(window).trigger('resize');
                }, 100);
                setTimeout(function() {
                    jQuery(window).trigger('resize');
                }, 500);
            },

            triggerResize: function() {

                // var self = this
                setTimeout(function() {
                    jQuery(window).trigger('resize');
                }, 100);
                setTimeout(function() {
                    jQuery(window).trigger('resize');
                }, 500);
                setTimeout(function() {
                    jQuery(window).trigger('resize');
                }, 2000);

            },

            initEasing: function() {
                //easign functions
                window.jQuery.extend(window.jQuery.easing, {
                    def: 'easeOutQuad',
                    swing: function(x, t, b, c, d) {
                        //alert(jQuery.easing.default);
                        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
                    },
                    easeInQuad: function(x, t, b, c, d) {
                        return c * (t /= d) * t + b;
                    },
                    easeOutQuad: function(x, t, b, c, d) {
                        return -c * (t /= d) * (t - 2) + b;
                    },
                    easeInOutQuad: function(x, t, b, c, d) {
                        if ((t /= d / 2) < 1)
                            return c / 2 * t * t + b;
                        return -c / 2 * ((--t) * (t - 2) - 1) + b;
                    },
                    easeInCubic: function(x, t, b, c, d) {
                        return c * (t /= d) * t * t + b;
                    },
                    easeOutCubic: function(x, t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t + 1) + b;
                    },
                    easeInOutCubic: function(x, t, b, c, d) {
                        if ((t /= d / 2) < 1)
                            return c / 2 * t * t * t + b;
                        return c / 2 * ((t -= 2) * t * t + 2) + b;
                    },
                    easeInQuart: function(x, t, b, c, d) {
                        return c * (t /= d) * t * t * t + b;
                    },
                    easeOutQuart: function(x, t, b, c, d) {
                        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                    },
                    easeInOutQuart: function(x, t, b, c, d) {
                        if ((t /= d / 2) < 1)
                            return c / 2 * t * t * t * t + b;
                        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                    },
                    easeInQuint: function(x, t, b, c, d) {
                        return c * (t /= d) * t * t * t * t + b;
                    },
                    easeOutQuint: function(x, t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                    },
                    easeInOutQuint: function(x, t, b, c, d) {
                        if ((t /= d / 2) < 1)
                            return c / 2 * t * t * t * t * t + b;
                        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                    },
                    easeInSine: function(x, t, b, c, d) {
                        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                    },
                    easeOutSine: function(x, t, b, c, d) {
                        return c * Math.sin(t / d * (Math.PI / 2)) + b;
                    },
                    easeInOutSine: function(x, t, b, c, d) {
                        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                    },
                    easeInExpo: function(x, t, b, c, d) {
                        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                    },
                    easeOutExpo: function(x, t, b, c, d) {
                        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                    },
                    easeInOutExpo: function(x, t, b, c, d) {
                        if (t == 0)
                            return b;
                        if (t == d)
                            return b + c;
                        if ((t /= d / 2) < 1)
                            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                    },
                    easeInCirc: function(x, t, b, c, d) {
                        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                    },
                    easeOutCirc: function(x, t, b, c, d) {
                        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                    },
                    easeInOutCirc: function(x, t, b, c, d) {
                        if ((t /= d / 2) < 1)
                            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                    },
                    easeInElastic: function(x, t, b, c, d) {
                        var s = 1.70158;
                        var p = 0;
                        var a = c;
                        if (t == 0)
                            return b;
                        if ((t /= d) == 1)
                            return b + c;
                        if (!p)
                            p = d * .3;
                        if (a < Math.abs(c)) {
                            a = c;
                            var s = p / 4;
                        } else
                            var s = p / (2 * Math.PI) * Math.asin(c / a);
                        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    },
                    easeOutElastic: function(x, t, b, c, d) {
                        var s = 1.70158;
                        var p = 0;
                        var a = c;
                        if (t == 0)
                            return b;
                        if ((t /= d) == 1)
                            return b + c;
                        if (!p)
                            p = d * .3;
                        if (a < Math.abs(c)) {
                            a = c;
                            var s = p / 4;
                        } else
                            var s = p / (2 * Math.PI) * Math.asin(c / a);
                        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
                    },
                    easeInOutElastic: function(x, t, b, c, d) {
                        var s = 1.70158;
                        var p = 0;
                        var a = c;
                        if (t == 0)
                            return b;
                        if ((t /= d / 2) == 2)
                            return b + c;
                        if (!p)
                            p = d * (.3 * 1.5);
                        if (a < Math.abs(c)) {
                            a = c;
                            var s = p / 4;
                        } else
                            var s = p / (2 * Math.PI) * Math.asin(c / a);
                        if (t < 1)
                            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                    },
                    easeInBack: function(x, t, b, c, d, s) {
                        if (s == undefined)
                            s = 1.70158;
                        return c * (t /= d) * t * ((s + 1) * t - s) + b;
                    },
                    easeOutBack: function(x, t, b, c, d, s) {
                        if (s == undefined)
                            s = 1.70158;
                        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                    },
                    easeInOutBack: function(x, t, b, c, d, s) {
                        if (s == undefined)
                            s = 1.70158;
                        if ((t /= d / 2) < 1)
                            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                    },
                    easeInBounce: function(x, t, b, c, d) {
                        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
                    },
                    easeOutBounce: function(x, t, b, c, d) {
                        if ((t /= d) < (1 / 2.75)) {
                            return c * (7.5625 * t * t) + b;
                        } else if (t < (2 / 2.75)) {
                            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                        } else if (t < (2.5 / 2.75)) {
                            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                        } else {
                            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                        }
                    },
                    easeInOutBounce: function(x, t, b, c, d) {
                        if (t < d / 2)
                            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
                        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                    }
                });
            }
        };

        {

            FLIPBOOK.Book = function() {}

            FLIPBOOK.Book.prototype = {

                rightIndex: 0,

                goToPage: function() {
                    
                }
            }

        }

        { /* FLIPBOOK.Thumbnails */

            FLIPBOOK.Thumbnails = function(main) {

                var self = this,
                options = main.options,
                wrapper = main.wrapper

                this.main = main
                this.options = options
                this.wrapper = wrapper
                this.active = null

                if (!options.btnThumbs.enabled) {
                    return;
                }

                jQuery(main).bind('pagechange', function(){
                    // console.log(self.bookmark.height())
                    self.thumbsWrapper.css("top", self.bookmark.height() + 50 + "px")

                })

                this.thumbHolder = jQuery(document.createElement('div'))
                    .addClass('flipbook-thumbHolder flipbook-side-menu skin-color-bg')
                    .appendTo(wrapper)
                    .hide()

                this.thumbsWrapper = jQuery(document.createElement('div'))
                    .appendTo(this.thumbHolder)
                    .addClass('flipbook-thumbsWrapper')

                this.thumbsScroller = jQuery(document.createElement('div'))
                    .appendTo(this.thumbsWrapper)
                    .addClass('flipbook-thumbsScroller')

                main.createMenuHeader(this.thumbHolder, main.strings.thumbnails, main.toggleThumbs)

                //bookmark

                this.bookmark = jQuery('<div>')
                    .addClass('flipbook-font')
                    .appendTo(this.thumbHolder)
                    .hide()
                
                var current = jQuery('<a><div class="c-p skin-color flipbook-btn">'+options.strings.bookmarkCurrentPage+'</div></a>')
                    .appendTo(this.bookmark)
                    .bind('touchend click', function(e) {
                        main.bookmarkPage(main.cPage[0], this)
                        e.preventDefault()
                        e.stopPropagation()
                    })

                var left = jQuery('<a><div class="c-l-p skin-color flipbook-btn">'+options.strings.bookmarkLeftPage+'</div></a>')
                    .appendTo(this.bookmark)
                    .bind('touchend click', function(e) {
                        main.bookmarkPage(main.cPage[0], this)
                        e.preventDefault()
                        e.stopPropagation()
                    })

                var right = jQuery('<a><div class="c-r-p skin-color flipbook-btn">'+options.strings.bookmarkRightPage+'</div></a>')
                    .appendTo(this.bookmark)
                    .bind('touchend click', function(e) {
                        main.bookmarkPage(main.cPage[1], this)
                        e.preventDefault()
                        e.stopPropagation()
                    })



                //search

                this.search = jQuery('<div>')
                    .addClass('flipbook-search')
                    .appendTo(this.thumbHolder)
                    .hide()

                this.$searchBar = jQuery(
                    '<div class="flipbook-findbar" id="findbar" deluminate_imagetype="png">' +
                    '<div id="findbarInputContainer">' +
                    '<input id="findInput" class="toolbarField" title="Find" placeholder="'+options.strings.findInDocument+'...">' +
                    '</div>' +
                    '<div class="flipbook-find-info skin-color"/>' +
                    '</div>').appendTo(this.search)

                this.$findInput = this.$searchBar.find('#findInput').keyup(function() {
                    var str = this.value
                    // console.log("searching", this.value)

                    self.hideAllThumbs()
                    self.pagesFound = 0
                    // self.$findInfo.show().text('0 ' + options.strings.pagesFoundContaining + ' "' + str + '"')
                    self.$findInfo.hide()
                    main.unmark()

                    if (str != ''){

                        main.searchingString = str

                        if (main.pdfService) {
                            // for (var i = 0; i < 1; i++) {
                            for (var i = 0; i < main.pdfService.pdfInfo.numPages; i++) {
                                self.findInPage(str, i)
                            }
                        }

                        // main.mark(str)
                    }

                })

                this.$findInfo = this.$searchBar.find('.flipbook-find-info')

                this.thumbs = [];

                var arr2 = options.pages

                var arr = []

                if (options.doublePage) {
                    for (var i = 0; i < arr2.length; i++) {
                        if (i == 0 || i % 2 != 0)
                            arr.push(arr2[i])
                    }
                } else {
                    arr = arr2
                }

                if (options.pdfMode) {

                    this.loadThumbsFromPdf(arr)

                }

                var h = options.thumbSize
                var w = options.thumbSize * options.pageWidth / options.pageHeight

                for (var i = 0; i < arr.length; i++) {

                    var th = arr[i].thumb;

                    var $thumb = jQuery('<div>')
                        .addClass("flipbook-thumb")
                        .appendTo(self.thumbsScroller)
                        .attr('data-thumb-index', i)
                        .width(w)
                        .height(h)

                    var btnClose = jQuery('<span>')
                        .appendTo($thumb)
                        .addClass('thumb-btn-close')
                        .bind('touchend click', function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            main.removeBookmark(jQuery(this).parent().attr("data-thumb-index"))
                        });

                    var $icon = jQuery('<span>')
                        .attr('aria-hidden', 'true')
                        .appendTo(btnClose)
                        .addClass('fa fa-times skin-color')

                    this.thumbs.push($thumb)

                    if (arr[i].thumbCanvas) {
                        var $thumbImg = jQuery(arr[i].thumbCanvas)
                    } else if (th) {
                        var $thumbImg = jQuery('<img/>').attr('src', th)
                        $thumbImg[0].onload = function() {
                            self.thumbScroll.refresh()
                        }
                    } else
                        continue;

                    $thumbImg.appendTo($thumb)
                    jQuery('<br/>').appendTo($thumb)

                    if (options.doublePage && i > 0) {
                        $thumb.width(2 * w)

                        $thumbImg
                            .height(h)
                            .width(2 * w)
                            .attr('page-title', 2 * i + 1)

                        var $pageNumber = jQuery(document.createElement('soan')).text(String(2 * i) + "-" + String(2 * i + 1))
                            .appendTo($thumb)
                            .addClass('skin-color')
                            .addClass('flipbook-thumb-num')

                    } else {
                        $thumbImg
                            .height(h)
                            .width(w)
                            .attr('page-title', i + 1)

                        var $pageNumber = jQuery(document.createElement('span')).text(i + 1)
                            .appendTo($thumb)
                            .addClass('skin-color')
                            .addClass('flipbook-thumb-num')
                        // .width(self.options.thumbSize);


                    }

                    $thumbImg.bind('touchend click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if (!self.thumbScroll.moved) {
                            var clickedPage = Number(jQuery(this).attr('page-title'));
                            if (options.rightToLeft)
                                clickedPage = options.pages.length - clickedPage + 1;

                            //if (self.options.singlePageMode) clickedPage--;
                           // if (self.Book.goingToPage != clickedPage)
                           setTimeout(function(){
                                main.goToPage(clickedPage);
                           },200)
                                

                            if(self.active != "search" && options.thumbsCloseOnClick)
                                main.toggleThumbs(false)
                        }
                    });

                }

                this.thumbScroll = new FLIPBOOK.IScroll(this.thumbsWrapper[0], {
                    bounce: false,
                    mouseWheel: true,
                    scrollbars: true,
                    interactiveScrollbars: true
                });

                main.initColors()

            }

            FLIPBOOK.Thumbnails.prototype = {

                loadThumbsFromPdf: function(arr) {

                    // return;

                    var self = this,
                        pdf = this.main.pdfDocument,
                        info = pdf._pdfInfo,
                        numPages = info.numPages

                    for (var i = 0; i < numPages; i++) {

                        var c = document.createElement('canvas');
                        arr[i].thumbCanvas = c

                    }

                    this.loadThumbFromPdf(0, arr)

                },

                loadVisibleThumbs:function(){

                    // this.thumbs.forEach(function(thumb){
                    //     console.log(thumb.offset().top)
                    // })

                },

                loadThumbFromPdf: function(i, arr) {

                    var self = this

                    this.main.pdfDocument.getPage(i + 1).then(function(page) {

                        var v = page.getViewport(1)

                        var scale = self.options.thumbSize / v.height

                        var viewport = page.getViewport(scale);

                        var c = arr[page.pageIndex].thumbCanvas
                        var context = c.getContext('2d');
                        c.height = viewport.height;
                        c.width = viewport.width;

                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };

                        page.cleanupAfterRender = true
                        page.render(renderContext).then(function() {
                            page.cleanup()
                            if ((page.pageIndex + 1) < self.main.pdfDocument._pdfInfo.numPages)
                                self.loadThumbFromPdf(page.pageIndex + 1, arr)

                        })
                        self.thumbScroll.refresh()

                    });
                },

                showAllThumbs: function() {

                    jQuery(".flipbook-thumb").show()
                    this.thumbScroll.refresh();

                },

                 hideAllThumbs: function() {

                    jQuery(".flipbook-thumb").hide()
                    this.thumbScroll.refresh();

                },

                showThumb: function(index) {
                    if(this.thumbs[index])
                        this.thumbs[index].show()
                    this.thumbScroll.refresh();

                },

                hideThumb: function(index) {

                    this.thumbs[index].hide()
                    this.thumbScroll.refresh();

                },

                showBookmarks:function(){

                    jQuery(".thumb-btn-close").show()
                    this.showBookmarkedThumbs()
                    this.bookmark.show()
                    this.setTitle(this.options.strings.bookmarks)
                    this.main.updateCurrentPage()
                    this.active = "bookmarks"

                },

                showSearch:function(){

                    this.thumbsWrapper.css("top", "120px")
                    this.hideAllThumbs()
                    this.search.show()
                    this.$findInfo.hide()
                    jQuery(".thumb-btn-close").hide()
                    this.setTitle(this.options.strings.search)
                    this.$findInput.val('').focus()
                    this.active = "search"

                },

                showBookmarkedThumbs: function() {

                    var arr = this.main.getBookmarkedPages()

                    this.hideAllThumbs()

                    for (var i = 0; i < arr.length; i++) {
                        var index = arr[i]
                        if(index)
                        this.showThumb(index)
                    }

                    this.thumbsWrapper.css("top", 50 + this.bookmark.height() + 'px')

                },

                show:function(){

                    this.setTitle(this.options.strings.thumbnails)
                    this.bookmark.hide()
                    this.search.hide()
                    this.thumbHolder.show()
                    this.main.thumbsVertical();
                    
                    this.thumbsWrapper.css("top", "50px")
                    this.showAllThumbs()
                    jQuery(".thumb-btn-close").hide()
                    this.loadVisibleThumbs()
                    this.main.resize()
                    this.active = "thumbs"

                },

                hide:function(){

                    this.thumbHolder.hide()
                    
                    this.main.resize()
                    this.active = null

                },

                setTitle:function(str){

                    this.thumbHolder.find('.flipbook-menu-title').text(str)

                },

                findInPage: function(str, index) {

                    var self = this
                    this.main.pdfService.findInPage(str, index, function(matches) {
                        if (matches > 0) {
                            self.showThumb(index)
                            self.pagesFound++;
                            self.$findInfo.show().text(self.pagesFound + ' ' + self.options.strings.pagesFoundContaining + ' "' + str + '"')
                            self.main.mark(str)

                        }

                    })

                }

            }

        }

        { /* FLIPBOOK.Lightbox */

            FLIPBOOK.Lightbox = function(context, content, options) {

                var self = this;
                this.context = context;
                this.options = options;
                this.lightboxOpened = false
                context.$elem.bind('tap click', function(e) {
                    if(content.disposed)
                        return

                    self.openLightbox();
                    e.stopPropagation()
                    
                    /*if (self.context.options.lightBoxFullscreen) {
                        self.context.toggleExpand()
                    }*/
                });

                var img = jQuery(context.elem).find('img');

                self.overlay = jQuery(document.createElement('div'))
                    .attr('style', options.lightboxCSS)
                    .addClass('flipbook-overlay')
                    .css('display', 'none')
                    .css('top', self.options.lightboxMarginV)
                    .css('bottom', self.options.lightboxMarginV)
                    .css('left', self.options.lightboxMarginH)
                    .css('right', self.options.lightboxMarginH)
                    // .bind('tap click', function(e) {
                    //     if (jQuery(e.target).hasClass('flipbook-bookLayer') && self.options.lightboxCloseOnClick) {
                    //         self.closeLightbox();
                    //     }
                    // })
                    .appendTo('body')

                    if(self.options.lightboxCloseOnClick){
                        jQuery('body').bind('tap click', function(e){
                            var $target = jQuery(e.target)
                            if (!$target.parents().hasClass('flipbook-overlay') || $target.hasClass('flipbook-bookLayer'))
                                self.closeLightbox();
                        })
                    }

                if (options.lightboxBackground)
                    self.overlay.css('background', options.lightboxBackground)

                jQuery(document).keyup(function(e) {
                    if (e.keyCode == 27) {
                        self.closeLightbox();
                    } // escape key maps to keycode `27`
                });


                self.wrapper = jQuery(document.createElement('div'))
                    .css('height', 'auto')
                    .appendTo(self.overlay)
                // .hide()

                self.wrapper
                    .attr('class', 'flipbook-wrapper-transparent')
                    .css('margin', '0px auto')
                    .css('padding', '0px')
                    .css('height', '100%')
                    .css('width', '100%');

                content
                    .appendTo(self.wrapper);

                // close button
                var $toolbar = jQuery('<div/>')
                    .appendTo(self.wrapper)
                    .addClass('flipbook-lightbox-toolbar');

                var o = options

            };

            FLIPBOOK.Lightbox.prototype = {

                openLightbox: function() {

                    if (this.lightboxOpened)
                        return;
                    this.lightboxOpened = true
                    // var self = this;
                    // this.overlay.css('visibility', 'visible');
                    this.overlay.css('display', 'none');
                    // this.overlay.css('transform','scale(.5)')
                    // this.overlay.css('-webkit-transform','scale(.5)')
                    // this.wrapper.css('display', 'none');
                    this.overlay.fadeIn("slow", function() {
                        // self.wrapper.css('display', 'block')
                        // self.wrapper.css('opacity', '1')
                        //self.context.lightboxStart();
                        // self.lightboxOpened = true
                    });


                    // if(this.context.Book){
                    //     this.context.Book.enable()
                    //     this.context.zoomTo(0,0)
                    //     this.context.zoomTo(this.options.zoomMin,1000)
                    // }
                    // this.wrapper.css('display', 'block')
                    // this.wrapper.css('opacity', '0')
                    jQuery('body').addClass('flipbook-overflow-hidden');
                    jQuery('html').addClass('flipbook-overflow-hidden');
                    // self.context.resize();
                },
                closeLightbox: function() {
                    var self = this;
                    if (self.lightboxOpened != true) return;
                    self.lightboxOpened = false;
                    this.overlay.fadeOut("fast");
                    //        this.overlay.css('visibility','hidden');
                    jQuery('body').removeClass('flipbook-overflow-hidden')
                    jQuery('html').removeClass('flipbook-overflow-hidden');

                    jQuery(this.context.fullscreenElement).removeClass('flipbook-browser-fullscreen');

                    self.context.lightboxEnd();
                },
                resize: function() {
                    var self = this;
                    var jQuerywindow = jQuery(window),
                        ww = jQuerywindow.width(),
                        wh = jQuerywindow.height();

                }
            };
        }

        {
            FLIPBOOK.getFlipbookSrc = function() {
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++) {
                    var src = String(scripts[i].src)
                    if (src.match("flipbook\\.js") || src.match("flipbook\\.min\\.js"))
                        // if (src.match("flipbook.js") || src.match("flipbook.min.js"))
                        return src
                }
                return "";
            }

            FLIPBOOK.flipbookSrc = FLIPBOOK.getFlipbookSrc()

            FLIPBOOK.iscrollSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/iscroll.');
            FLIPBOOK.threejsSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/three.');
            FLIPBOOK.flipbookWebGlSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/flipbook.webgl.');
            FLIPBOOK.flipbookBook3Src = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/flipbook.book3.');
            FLIPBOOK.flipBookSwipeSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/flipbook.swipe.');
            FLIPBOOK.pdfjsSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/pdf.');
            FLIPBOOK.pdfServiceSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/flipbook.pdfservice.');
            FLIPBOOK.pdfjsworkerSrc = FLIPBOOK.flipbookSrc.replace("/flipbook.", '/pdf.worker.');
            // FLIPBOOK.markSrc = "https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.min.js"
            FLIPBOOK.markSrc = "https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.js"

            FLIPBOOK.scriptsLoaded = {};
            FLIPBOOK.scriptsAdded = {};

        }

        // {/*image loader object*/

        //     FLIPBOOK.ImageLoader = function(){

        //         console.log("new ImageLoader()")

        //         this.images = {}

        //     }

        //     FLIPBOOK.ImageLoader.prototype = {

        //         loadImage : function(src, onComplete){

        //             console.log('load ',src)

        //             // var onComplete = onComplete || function(){}

        //             var images = this.images
                    
        //             if(!images[src]){
        //                 images[src] = document.createElement('img')
        //             }

        //             var img = images[src]

        //             if(img.loaded){
        //                 console.log("already loaded");
        //                 if(onComplete) onComplete(img);
        //                 return;
        //             }

        //             img.onComplete = img.onComplete || []
        //             img.onComplete.push(onComplete)

        //             if(img.loading){
        //                  console.log("loading...")
        //             }else{
        //                 img.onload = function(){
                        
        //                     img.loading = false
        //                     img.loaded = true
        //                     for (var i = 0; i < img.onComplete.length; i ++) {
        //                         var callback = img.onComplete[i]
        //                         if(callback) callback(img)
        //                         img.onComplete[i] = null
        //                     }
        //                 }
        //                 img.src = src
        //                 img.loading = true


        //             }

                    
        //         }

        //     }            

        // }

    })(jQuery, window, document)
}


{ /* screenfull.js */

  /*!
    * screenfull
    * v4.0.0 - 2018-12-15
    * (c) Sindre Sorhus; MIT License
    */

    !function(){"use strict";var u="undefined"!=typeof window&&void 0!==window.document?window.document:{},e="undefined"!=typeof module&&module.exports,t="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,c=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,l=n.length,t={};r<l;r++)if((e=n[r])&&e[1]in u){for(r=0;r<e.length;r++)t[n[0][r]]=e[r];return t}return!1}(),l={change:c.fullscreenchange,error:c.fullscreenerror},n={request:function(l){return new Promise(function(e){var n=c.requestFullscreen,r=function(){this.off("change",r),e()}.bind(this);l=l||u.documentElement,/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)?l[n]():l[n](t?Element.ALLOW_KEYBOARD_INPUT:{}),this.on("change",r)}.bind(this))},exit:function(){return new Promise(function(e){var n=function(){this.off("change",n),e()}.bind(this);u[c.exitFullscreen](),this.on("change",n)}.bind(this))},toggle:function(e){return this.isFullscreen?this.exit():this.request(e)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){var r=l[e];r&&u.addEventListener(r,n,!1)},off:function(e,n){var r=l[e];r&&u.removeEventListener(r,n,!1)},raw:c};c?(Object.defineProperties(n,{isFullscreen:{get:function(){return Boolean(u[c.fullscreenElement])}},element:{enumerable:!0,get:function(){return u[c.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(u[c.fullscreenEnabled])}}}),e?module.exports=n:window.screenfull=n):e?module.exports=!1:window.screenfull=!1}();
}

{ /*jQuery.browser.mobile*/
    /**
     * jQuery.browser.mobile (http://detectmobilebrowser.com/)
     *
     * jQuery.browser.mobile will be true if the browser is a mobile device
     *
     **/
    (function(a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);
}
/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
! function(factory) { "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], factory) : factory("undefined" != typeof module && module.exports ? require("jquery") : jQuery) }(function($) {
    "use strict";

    function init(options) {
        return !options || void 0 !== options.allowPageScroll || void 0 === options.swipe && void 0 === options.swipeStatus || (options.allowPageScroll = NONE), void 0 !== options.click && void 0 === options.tap && (options.tap = options.click), options || (options = {}), options = $.extend({}, $.fn.swipe.defaults, options), this.each(function() {
            var $this = $(this),
                plugin = $this.data(PLUGIN_NS);
            plugin || (plugin = new TouchSwipe(this, options), $this.data(PLUGIN_NS, plugin))
        })
    }

    function TouchSwipe(element, options) {
        function touchStart(jqEvent) {
            if (!(getTouchInProgress() || $(jqEvent.target).closest(options.excludedElements, $element).length > 0)) {
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                if (!event.pointerType || "mouse" != event.pointerType || 0 != options.fallbackToMouseEvents) {
                    var ret, touches = event.touches,
                        evt = touches ? touches[0] : event;
                    return phase = PHASE_START, touches ? fingerCount = touches.length : options.preventDefaultEvents !== !1 && jqEvent.preventDefault(), distance = 0, direction = null, currentDirection = null, pinchDirection = null, duration = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, maximumsMap = createMaximumsData(), cancelMultiFingerRelease(), createFingerData(0, evt), !touches || fingerCount === options.fingers || options.fingers === ALL_FINGERS || hasPinches() ? (startTime = getTimeStamp(), 2 == fingerCount && (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)), (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase))) : ret = !1, ret === !1 ? (phase = PHASE_CANCEL, triggerHandler(event, phase), ret) : (options.hold && (holdTimeout = setTimeout($.proxy(function() { $element.trigger("hold", [event.target]), options.hold && (ret = options.hold.call($element, event, event.target)) }, this), options.longTapThreshold)), setTouchInProgress(!0), null)
                }
            }
        }

        function touchMove(jqEvent) {
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
            if (phase !== PHASE_END && phase !== PHASE_CANCEL && !inMultiFingerRelease()) {
                var ret, touches = event.touches,
                    evt = touches ? touches[0] : event,
                    currentFinger = updateFingerData(evt);
                if (endTime = getTimeStamp(), touches && (fingerCount = touches.length), options.hold && clearTimeout(holdTimeout), phase = PHASE_MOVE, 2 == fingerCount && (0 == startTouchesDistance ? (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)) : (updateFingerData(touches[1]), endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end), pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end)), pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance), pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance)), fingerCount === options.fingers || options.fingers === ALL_FINGERS || !touches || hasPinches()) {
                    if (direction = calculateDirection(currentFinger.start, currentFinger.end), currentDirection = calculateDirection(currentFinger.last, currentFinger.end), validateDefaultEvent(jqEvent, currentDirection), distance = calculateDistance(currentFinger.start, currentFinger.end), duration = calculateDuration(), setMaxDistance(direction, distance), ret = triggerHandler(event, phase), !options.triggerOnTouchEnd || options.triggerOnTouchLeave) {
                        var inBounds = !0;
                        if (options.triggerOnTouchLeave) {
                            var bounds = getbounds(this);
                            inBounds = isInBounds(currentFinger.end, bounds)
                        }!options.triggerOnTouchEnd && inBounds ? phase = getNextPhase(PHASE_MOVE) : options.triggerOnTouchLeave && !inBounds && (phase = getNextPhase(PHASE_END)), phase != PHASE_CANCEL && phase != PHASE_END || triggerHandler(event, phase)
                    }
                } else phase = PHASE_CANCEL, triggerHandler(event, phase);
                ret === !1 && (phase = PHASE_CANCEL, triggerHandler(event, phase))
            }
        }

        function touchEnd(jqEvent) {
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
                touches = event.touches;
            if (touches) { if (touches.length && !inMultiFingerRelease()) return startMultiFingerRelease(event), !0; if (touches.length && inMultiFingerRelease()) return !0 }
            return inMultiFingerRelease() && (fingerCount = fingerCountAtRelease), endTime = getTimeStamp(), duration = calculateDuration(), didSwipeBackToCancel() || !validateSwipeDistance() ? (phase = PHASE_CANCEL, triggerHandler(event, phase)) : options.triggerOnTouchEnd || options.triggerOnTouchEnd === !1 && phase === PHASE_MOVE ? (options.preventDefaultEvents !== !1 && jqEvent.cancelable !== !1 && jqEvent.preventDefault(), phase = PHASE_END, triggerHandler(event, phase)) : !options.triggerOnTouchEnd && hasTap() ? (phase = PHASE_END, triggerHandlerForGesture(event, phase, TAP)) : phase === PHASE_MOVE && (phase = PHASE_CANCEL, triggerHandler(event, phase)), setTouchInProgress(!1), null
        }

        function touchCancel() { fingerCount = 0, endTime = 0, startTime = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, cancelMultiFingerRelease(), setTouchInProgress(!1) }

        function touchLeave(jqEvent) {
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
            options.triggerOnTouchLeave && (phase = getNextPhase(PHASE_END), triggerHandler(event, phase))
        }

        function removeListeners() { $element.unbind(START_EV, touchStart), $element.unbind(CANCEL_EV, touchCancel), $element.unbind(MOVE_EV, touchMove), $element.unbind(END_EV, touchEnd), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave), setTouchInProgress(!1) }

        function getNextPhase(currentPhase) {
            var nextPhase = currentPhase,
                validTime = validateSwipeTime(),
                validDistance = validateSwipeDistance(),
                didCancel = didSwipeBackToCancel();
            return !validTime || didCancel ? nextPhase = PHASE_CANCEL : !validDistance || currentPhase != PHASE_MOVE || options.triggerOnTouchEnd && !options.triggerOnTouchLeave ? !validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave && (nextPhase = PHASE_CANCEL) : nextPhase = PHASE_END, nextPhase
        }

        function triggerHandler(event, phase) { var ret, touches = event.touches; return (didSwipe() || hasSwipes()) && (ret = triggerHandlerForGesture(event, phase, SWIPE)), (didPinch() || hasPinches()) && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, PINCH)), didDoubleTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP) : didLongTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, LONG_TAP) : didTap() && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, TAP)), phase === PHASE_CANCEL && touchCancel(event), phase === PHASE_END && (touches ? touches.length || touchCancel(event) : touchCancel(event)), ret }

        function triggerHandlerForGesture(event, phase, gesture) {
            var ret;
            if (gesture == SWIPE) {
                if ($element.trigger("swipeStatus", [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]), options.swipeStatus && (ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection), ret === !1)) return !1;
                if (phase == PHASE_END && validateSwipe()) {
                    if (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), $element.trigger("swipe", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipe && (ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection), ret === !1)) return !1;
                    switch (direction) {
                        case LEFT:
                            $element.trigger("swipeLeft", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeLeft && (ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
                            break;
                        case RIGHT:
                            $element.trigger("swipeRight", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeRight && (ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
                            break;
                        case UP:
                            $element.trigger("swipeUp", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeUp && (ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
                            break;
                        case DOWN:
                            $element.trigger("swipeDown", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeDown && (ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection))
                    }
                }
            }
            if (gesture == PINCH) {
                if ($element.trigger("pinchStatus", [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchStatus && (ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData), ret === !1)) return !1;
                if (phase == PHASE_END && validatePinch()) switch (pinchDirection) {
                    case IN:
                        $element.trigger("pinchIn", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchIn && (ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData));
                        break;
                    case OUT:
                        $element.trigger("pinchOut", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchOut && (ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData))
                }
            }
            return gesture == TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), hasDoubleTap() && !inDoubleTap() ? (doubleTapStartTime = getTimeStamp(), singleTapTimeout = setTimeout($.proxy(function() { doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target)) }, this), options.doubleTapThreshold)) : (doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target)))) : gesture == DOUBLE_TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), doubleTapStartTime = null, $element.trigger("doubletap", [event.target]), options.doubleTap && (ret = options.doubleTap.call($element, event, event.target))) : gesture == LONG_TAP && (phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), doubleTapStartTime = null, $element.trigger("longtap", [event.target]), options.longTap && (ret = options.longTap.call($element, event, event.target)))), ret
        }

        function validateSwipeDistance() { var valid = !0; return null !== options.threshold && (valid = distance >= options.threshold), valid }

        function didSwipeBackToCancel() { var cancelled = !1; return null !== options.cancelThreshold && null !== direction && (cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold), cancelled }

        function validatePinchDistance() { return null === options.pinchThreshold || pinchDistance >= options.pinchThreshold }

        function validateSwipeTime() { var result; return result = !options.maxTimeThreshold || !(duration >= options.maxTimeThreshold) }

        function validateDefaultEvent(jqEvent, direction) {
            if (options.preventDefaultEvents !== !1)
                if (options.allowPageScroll === NONE) jqEvent.preventDefault();
                else {
                    var auto = options.allowPageScroll === AUTO;
                    switch (direction) {
                        case LEFT:
                            (options.swipeLeft && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
                            break;
                        case RIGHT:
                            (options.swipeRight && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
                            break;
                        case UP:
                            (options.swipeUp && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
                            break;
                        case DOWN:
                            (options.swipeDown && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
                            break;
                        case NONE:
                    }
                }
        }

        function validatePinch() {
            var hasCorrectFingerCount = validateFingers(),
                hasEndPoint = validateEndPoint(),
                hasCorrectDistance = validatePinchDistance();
            return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance
        }

        function hasPinches() { return !!(options.pinchStatus || options.pinchIn || options.pinchOut) }

        function didPinch() { return !(!validatePinch() || !hasPinches()) }

        function validateSwipe() {
            var hasValidTime = validateSwipeTime(),
                hasValidDistance = validateSwipeDistance(),
                hasCorrectFingerCount = validateFingers(),
                hasEndPoint = validateEndPoint(),
                didCancel = didSwipeBackToCancel(),
                valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
            return valid
        }

        function hasSwipes() { return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown) }

        function didSwipe() { return !(!validateSwipe() || !hasSwipes()) }

        function validateFingers() { return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH }

        function validateEndPoint() { return 0 !== fingerData[0].end.x }

        function hasTap() { return !!options.tap }

        function hasDoubleTap() { return !!options.doubleTap }

        function hasLongTap() { return !!options.longTap }

        function validateDoubleTap() { if (null == doubleTapStartTime) return !1; var now = getTimeStamp(); return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold }

        function inDoubleTap() { return validateDoubleTap() }

        function validateTap() { return (1 === fingerCount || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold) }

        function validateLongTap() { return duration > options.longTapThreshold && distance < DOUBLE_TAP_THRESHOLD }

        function didTap() { return !(!validateTap() || !hasTap()) }

        function didDoubleTap() { return !(!validateDoubleTap() || !hasDoubleTap()) }

        function didLongTap() { return !(!validateLongTap() || !hasLongTap()) }

        function startMultiFingerRelease(event) { previousTouchEndTime = getTimeStamp(), fingerCountAtRelease = event.touches.length + 1 }

        function cancelMultiFingerRelease() { previousTouchEndTime = 0, fingerCountAtRelease = 0 }

        function inMultiFingerRelease() {
            var withinThreshold = !1;
            if (previousTouchEndTime) {
                var diff = getTimeStamp() - previousTouchEndTime;
                diff <= options.fingerReleaseThreshold && (withinThreshold = !0)
            }
            return withinThreshold
        }

        function getTouchInProgress() { return !($element.data(PLUGIN_NS + "_intouch") !== !0) }

        function setTouchInProgress(val) { $element && (val === !0 ? ($element.bind(MOVE_EV, touchMove), $element.bind(END_EV, touchEnd), LEAVE_EV && $element.bind(LEAVE_EV, touchLeave)) : ($element.unbind(MOVE_EV, touchMove, !1), $element.unbind(END_EV, touchEnd, !1), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave, !1)), $element.data(PLUGIN_NS + "_intouch", val === !0)) }

        function createFingerData(id, evt) { var f = { start: { x: 0, y: 0 }, last: { x: 0, y: 0 }, end: { x: 0, y: 0 } }; return f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX, f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY, fingerData[id] = f, f }

        function updateFingerData(evt) {
            var id = void 0 !== evt.identifier ? evt.identifier : 0,
                f = getFingerData(id);
            return null === f && (f = createFingerData(id, evt)), f.last.x = f.end.x, f.last.y = f.end.y, f.end.x = evt.pageX || evt.clientX, f.end.y = evt.pageY || evt.clientY, f
        }

        function getFingerData(id) { return fingerData[id] || null }

        function setMaxDistance(direction, distance) { direction != NONE && (distance = Math.max(distance, getMaxDistance(direction)), maximumsMap[direction].distance = distance) }

        function getMaxDistance(direction) { if (maximumsMap[direction]) return maximumsMap[direction].distance }

        function createMaximumsData() { var maxData = {}; return maxData[LEFT] = createMaximumVO(LEFT), maxData[RIGHT] = createMaximumVO(RIGHT), maxData[UP] = createMaximumVO(UP), maxData[DOWN] = createMaximumVO(DOWN), maxData }

        function createMaximumVO(dir) { return { direction: dir, distance: 0 } }

        function calculateDuration() { return endTime - startTime }

        function calculateTouchesDistance(startPoint, endPoint) {
            var diffX = Math.abs(startPoint.x - endPoint.x),
                diffY = Math.abs(startPoint.y - endPoint.y);
            return Math.round(Math.sqrt(diffX * diffX + diffY * diffY))
        }

        function calculatePinchZoom(startDistance, endDistance) { var percent = endDistance / startDistance * 1; return percent.toFixed(2) }

        function calculatePinchDirection() { return pinchZoom < 1 ? OUT : IN }

        function calculateDistance(startPoint, endPoint) { return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))) }

        function calculateAngle(startPoint, endPoint) {
            var x = startPoint.x - endPoint.x,
                y = endPoint.y - startPoint.y,
                r = Math.atan2(y, x),
                angle = Math.round(180 * r / Math.PI);
            return angle < 0 && (angle = 360 - Math.abs(angle)), angle
        }

        function calculateDirection(startPoint, endPoint) { if (comparePoints(startPoint, endPoint)) return NONE; var angle = calculateAngle(startPoint, endPoint); return angle <= 45 && angle >= 0 ? LEFT : angle <= 360 && angle >= 315 ? LEFT : angle >= 135 && angle <= 225 ? RIGHT : angle > 45 && angle < 135 ? DOWN : UP }

        function getTimeStamp() { var now = new Date; return now.getTime() }

        function getbounds(el) {
            el = $(el);
            var offset = el.offset(),
                bounds = { left: offset.left, right: offset.left + el.outerWidth(), top: offset.top, bottom: offset.top + el.outerHeight() };
            return bounds
        }

        function isInBounds(point, bounds) { return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom }

        function comparePoints(pointA, pointB) { return pointA.x == pointB.x && pointA.y == pointB.y }
        var options = $.extend({}, options),
            useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents,
            START_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
            MOVE_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
            END_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
            LEAVE_EV = useTouchEvents ? SUPPORTS_POINTER ? "mouseleave" : null : "mouseleave",
            CANCEL_EV = SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel" : "touchcancel",
            distance = 0,
            direction = null,
            currentDirection = null,
            duration = 0,
            startTouchesDistance = 0,
            endTouchesDistance = 0,
            pinchZoom = 1,
            pinchDistance = 0,
            pinchDirection = 0,
            maximumsMap = null,
            $element = $(element),
            phase = "start",
            fingerCount = 0,
            fingerData = {},
            startTime = 0,
            endTime = 0,
            previousTouchEndTime = 0,
            fingerCountAtRelease = 0,
            doubleTapStartTime = 0,
            singleTapTimeout = null,
            holdTimeout = null;
        try { $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel) } catch (e) { $.error("events not supported " + START_EV + "," + CANCEL_EV + " on jQuery.swipe") } this.enable = function() { return this.disable(), $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel), $element }, this.disable = function() { return removeListeners(), $element }, this.destroy = function() { removeListeners(), $element.data(PLUGIN_NS, null), $element = null }, this.option = function(property, value) {
            if ("object" == typeof property) options = $.extend(options, property);
            else if (void 0 !== options[property]) {
                if (void 0 === value) return options[property];
                options[property] = value
            } else {
                if (!property) return options;
                $.error("Option " + property + " does not exist on jQuery.swipe.options")
            }
            return null
        }
    }
    var VERSION = "1.6.18",
        LEFT = "left",
        RIGHT = "right",
        UP = "up",
        DOWN = "down",
        IN = "in",
        OUT = "out",
        NONE = "none",
        AUTO = "auto",
        SWIPE = "swipe",
        PINCH = "pinch",
        TAP = "tap",
        DOUBLE_TAP = "doubletap",
        LONG_TAP = "longtap",
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        ALL_FINGERS = "all",
        DOUBLE_TAP_THRESHOLD = 10,
        PHASE_START = "start",
        PHASE_MOVE = "move",
        PHASE_END = "end",
        PHASE_CANCEL = "cancel",
        SUPPORTS_TOUCH = "ontouchstart" in window,
        SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !SUPPORTS_TOUCH,
        SUPPORTS_POINTER = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH,
        PLUGIN_NS = "TouchSwipe",
        defaults = { fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, hold: null, triggerOnTouchEnd: !0, triggerOnTouchLeave: !1, allowPageScroll: "auto", fallbackToMouseEvents: !0, excludedElements: ".noSwipe", preventDefaultEvents: !0 };
    $.fn.swipe = function(method) {
        var $this = $(this),
            plugin = $this.data(PLUGIN_NS);
        if (plugin && "string" == typeof method) {
            if (plugin[method]) return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
            $.error("Method " + method + " does not exist on jQuery.swipe")
        } else if (plugin && "object" == typeof method) plugin.option.apply(plugin, arguments);
        else if (!(plugin || "object" != typeof method && method)) return init.apply(this, arguments);
        return $this
    }, $.fn.swipe.version = VERSION, $.fn.swipe.defaults = defaults, $.fn.swipe.phases = { PHASE_START: PHASE_START, PHASE_MOVE: PHASE_MOVE, PHASE_END: PHASE_END, PHASE_CANCEL: PHASE_CANCEL }, $.fn.swipe.directions = { LEFT: LEFT, RIGHT: RIGHT, UP: UP, DOWN: DOWN, IN: IN, OUT: OUT }, $.fn.swipe.pageScroll = { NONE: NONE, HORIZONTAL: HORIZONTAL, VERTICAL: VERTICAL, AUTO: AUTO }, $.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: ALL_FINGERS }
});


//share
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Share = t()
    }
}(function() {
    var t;
    "classList" in document.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function() {
            var t, e, o;
            return o = function(t) {
                return function(o) {
                    var n, i;
                    n = e.className.split(/\s+/), i = n.indexOf(o), t(n, i, o), e.className = n.join(" ")
                }
            }, e = this, t = {
                add: o(function(t, e, o) {
                    ~
                    e || t.push(o)
                }),
                remove: o(function(t, e) {
                    ~
                    e && t.splice(e, 1)
                }),
                toggle: o(function(t, e, o) {
                    ~
                    e ? t.splice(e, 1) : t.push(o)
                }),
                contains: function(t) {
                    return !!~e.className.split(/\s+/).indexOf(t)
                },
                item: function(t) {
                    return e.className.split(/\s+/)[t] || null
                }
            }, Object.defineProperty(t, "length", {
                get: function() {
                    return e.className.split(/\s+/).length
                }
            }), t
        }
    }), String.prototype.to_rfc3986 = function() {
        var t;
        return t = encodeURIComponent(this), t.replace(/[!'()*]/g, function(t) {
            return "%" + t.charCodeAt(0).toString(16)
        })
    }, t = function() {
        function t() {}
        return t.prototype.extend = function(t, e, o) {
            var n, i;
            for (i in e) n = void 0 !== t[i], n && "object" == typeof e[i] ? this.extend(t[i], e[i], o) : (o || !n) && (t[i] = e[i])
        }, t.prototype.hide = function(t) {
            return t.style.display = "none"
        }, t.prototype.show = function(t) {
            return t.style.display = "block"
        }, t.prototype.has_class = function(t, e) {
            return t.classList.contains(e)
        }, t.prototype.add_class = function(t, e) {
            return t.classList.add(e)
        }, t.prototype.remove_class = function(t, e) {
            return t.classList.remove(e)
        }, t.prototype.is_encoded = function(t) {
            return t = t.to_rfc3986(), decodeURIComponent(t) !== t
        }, t.prototype.encode = function(t) {
            return "undefined" == typeof t || this.is_encoded(t) ? t : t.to_rfc3986()
        }, t.prototype.popup = function(t, e) {
            var o, n, i, r;
            return null == e && (e = {}), n = {
                width: 500,
                height: 350
            }, n.top = screen.height / 2 - n.height / 2, n.left = screen.width / 2 - n.width / 2, i = function() {
                var t;
                t = [];
                for (o in e) r = e[o], t.push(o + "=" + this.encode(r));
                return t
            }.call(this).join("&"), i && (i = "?" + i), window.open(t + i, "targetWindow", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + n.left + ",top=" + n.top + ",width=" + n.width + ",height=" + n.height)
        }, t
    }();
    var e, o = function(t, e) {
            function o() {
                this.constructor = t
            }
            for (var i in e) n.call(e, i) && (t[i] = e[i]);
            return o.prototype = e.prototype, t.prototype = new o, t.__super__ = e.prototype, t
        },
        n = {}.hasOwnProperty;
    return e = function(t) {
        function e(t, e) {
            return this.element = t, this.el = {
                head: document.getElementsByTagName("head")[0],
                body: document.getElementsByTagName("body")[0]
            }, this.config = {
                enabled_networks: 0,
                protocol: -1 === ["http", "https"].indexOf(window.location.href.split(":")[0]) ? "https://" : "//",
                url: window.location.href,
                caption: null,
                title: this.default_title(),
                image: this.default_image(),
                description: this.default_description(),
                ui: {
                    flyout: "top center",
                    button_text: "Share",
                    button_font: !0,
                    icon_font: !0
                },
                networks: {
                    google_plus: {
                        enabled: !0,
                        url: null
                    },
                    twitter: {
                        enabled: !0,
                        url: null,
                        description: null
                    },
                    facebook: {
                        enabled: !0,
                        load_sdk: !0,
                        url: null,
                        app_id: null,
                        title: null,
                        caption: null,
                        description: null,
                        image: null
                    },
                    pinterest: {
                        enabled: !0,
                        url: null,
                        image: null,
                        description: null
                    },
                    email: {
                        enabled: !0,
                        title: null,
                        description: null,
                        url:null
                    }
                }
            }, this.setup(this.element, e), this
        }
        return o(e, t), e.prototype.setup = function(t, e) {
            var o, n, i, r, s;
            for (r = [t], this.extend(this.config, e, !0), this.set_global_configuration(), this.normalize_network_configuration(), this.config.networks.facebook.enabled && this.config.networks.facebook.load_sdk && this.inject_facebook_sdk(), n = o = 0, s = r.length; s > o; n = ++o) i = r[n], this.setup_instance(t, n)
        }, e.prototype.setup_instance = function(t, e) {
            var o, n, i, r, s, l, c, a, p;
            for (r = t, this.add_class(r, "sharer-" + e), this.inject_html(r), document.getElementById("flipbook-share-facebook").style.display = this.config.networks.facebook.display, document.getElementById("flipbook-share-twitter").style.display = this.config.networks.twitter.display, document.getElementById("flipbook-share-pinterest").style.display = this.config.networks.pinterest.display, document.getElementById("flipbook-share-email").style.display = this.config.networks.email.display, document.getElementById("flipbook-share-google_plus").style.display = this.config.networks.google_plus.display, s = r.getElementsByTagName("label")[0], n = r.getElementsByClassName("social")[0], a = r.getElementsByTagName("li"), this.add_class(n, "networks-" + this.config.enabled_networks), r.addEventListener("click", function(t) {
                    return function() {
                        return t.event_toggle(n)
                    }
                }(this)), o = this, p = [], e = i = 0, l = a.length; l > i; e = ++i) c = a[e], p.push(c.addEventListener("click", function() {
                return o.event_network(r, this), o.event_close(n)
            }));
            return p
        }, e.prototype.event_toggle = function(t) {
            return this.has_class(t, "active") ? this.event_close(t) : this.event_open(t)
        }, e.prototype.event_open = function(t) {
            return this.has_class(t, "load") && this.remove_class(t, "load"), this.add_class(t, "active")
        }, e.prototype.event_close = function(t) {
            return this.remove_class(t, "active")
        }, e.prototype.event_network = function(t, e) {
            var o;
            return o = e.getAttribute("data-network"), this.hook("before", o, t), this["network_" + o](), this.hook("after", o, t)
        }, e.prototype.open = function() {
            return this["public"]("open")
        }, e.prototype.close = function() {
            return this["public"]("close")
        }, e.prototype.toggle = function() {
            return this["public"]("toggle")
        }, e.prototype["public"] = function(t) {
            var e, o, n, i, r, s, l;
            for (s = document.querySelectorAll(this.element), l = [], n = o = 0, r = s.length; r > o; n = ++o) i = s[n], e = i.getElementsByClassName("social")[0], l.push(this["event_" + t](e));
            return l
        }, e.prototype.network_facebook = function() {
            return this.config.networks.facebook.load_sdk ? window.FB ? FB.ui({
                method: "feed",
                name: this.config.networks.facebook.title,
                link: this.config.networks.facebook.url,
                picture: this.config.networks.facebook.image,
                caption: this.config.networks.facebook.caption,
                description: this.config.networks.facebook.description
            }) : console.error("The Facebook JS SDK hasn't loaded yet.") : this.popup("https://www.facebook.com/sharer/sharer.php", {
                u: this.config.networks.facebook.url
            })
        }, e.prototype.network_twitter = function() {
            return this.popup("https://twitter.com/intent/tweet", {
                text: this.config.networks.twitter.description,
                url: this.config.networks.twitter.url
            })
        }, e.prototype.network_google_plus = function() {
            return this.popup("https://plus.google.com/share", {
                url: this.config.networks.google_plus.url
            })
        }, e.prototype.network_pinterest = function() {
            return this.popup("https://www.pinterest.com/pin/create/button", {
                url: this.config.networks.pinterest.url,
                media: this.config.networks.pinterest.image,
                description: this.config.networks.pinterest.description
            })
        }, e.prototype.network_email = function() {
            return this.popup("mailto:", {
                subject: this.config.networks.email.title,
                body: this.config.networks.email.description + '%0D%0A' + this.config.networks.email.url  || this.config.url
            })
        }, e.prototype.inject_stylesheet = function(t) {
            var e;
            return this.el.head.querySelector('link[href="' + t + '"]') ? void 0 : (e = document.createElement("link"), e.setAttribute("rel", "stylesheet"), e.setAttribute("href", t), this.el.head.appendChild(e))
        }, e.prototype.inject_html = function(t) {
            return t.innerHTML = "<div class='social load " + this.config.ui.flyout + "'><ul><li id='flipbook-share-pinterest' class='fab fa-pinterest-p skin-color' data-network='pinterest'></li><li id='flipbook-share-twitter' class='fab fa-twitter skin-color' data-network='twitter'></li><li id='flipbook-share-facebook' class='fab fa-facebook-f skin-color' data-network='facebook'></li><li id='flipbook-share-google_plus' class='fab fa-google-plus-g skin-color' data-network='google_plus'></li><li id='flipbook-share-email' class='fas fa-at skin-color' data-network='email'></li></ul></div>"
        }, e.prototype.inject_facebook_sdk = function() {
            var t, e;
            return window.FB || !this.config.networks.facebook.app_id || this.el.body.querySelector("#fb-root") ? void 0 : (e = document.createElement("script"), e.text = "window.fbAsyncInit=function(){FB.init({appId:'" + this.config.networks.facebook.app_id + "',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='" + this.config.protocol + "connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')", t = document.createElement("div"), t.id = "fb-root", this.el.body.appendChild(t), this.el.body.appendChild(e))
        }, e.prototype.hook = function(t, e, o) {
            var n, i;
            n = this.config.networks[e][t], "function" == typeof n && (i = n.call(this.config.networks[e], o), void 0 !== i && (i = this.normalize_filter_config_updates(i), this.extend(this.config.networks[e], i, !0), this.normalize_network_configuration()))
        }, e.prototype.default_title = function() {
            var t;
            return (t = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]')) ? t.getAttribute("content") : (t = document.querySelector("title")) ? t.innerText : void 0
        }, e.prototype.default_image = function() {
            var t;
            return (t = document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="twitter:image"]')) ? t.getAttribute("content") : void 0
        }, e.prototype.default_description = function() {
            var t;
            return (t = document.querySelector('meta[property="og:description"]') || document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[name="description"]')) ? t.getAttribute("content") : ""
        }, e.prototype.set_global_configuration = function() {
            var t, e, o, n, i, r;
            i = this.config.networks, r = [];
            for (e in i) {
                n = i[e];
                for (o in n) null == this.config.networks[e][o] && (this.config.networks[e][o] = this.config[o]);
                this.config.networks[e].enabled ? (t = "block", this.config.enabled_networks += 1) : t = "none", r.push(this.config.networks[e].display = t)
            }
            return r
        }, e.prototype.normalize_network_configuration = function() {
            return this.config.networks.facebook.app_id || (this.config.networks.facebook.load_sdk = !1), this.is_encoded(this.config.networks.twitter.description) || (this.config.networks.twitter.description = encodeURIComponent(this.config.networks.twitter.description)), "number" == typeof this.config.networks.facebook.app_id ? this.config.networks.facebook.app_id = this.config.networks.facebook.app_id.toString() : void 0
        }, e.prototype.normalize_filter_config_updates = function(t) {
            return this.config.networks.facebook.app_id !== t.app_id && (console.warn("You are unable to change the Facebook app_id after the button has been initialized. Please update your Facebook filters accordingly."), delete t.app_id), this.config.networks.facebook.load_sdk !== t.load_sdk && (console.warn("You are unable to change the Facebook load_sdk option after the button has been initialized. Please update your Facebook filters accordingly."), delete t.app_id), t
        }, e
    }(t)
});
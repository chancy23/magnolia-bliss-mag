$(document).ready(function () {

    $("#container").flipBook({
        pages:[
            {src:"/images/book/page1.jpg", 
            thumb:"/images/book/thumb1.jpg", 
            title:"Cover",
            // htmlContent:'<a href="3d.html">link to 3d flipbook</a><p style="color:#FFF">HTML Content on the page' +
            //     '</p><div style="position:absolute;top:400px;"><iframe width="640" height="390" src="https://www.youtube.com/embed/w53Lp1AFkpo" frameborder="0" allowfullscreen></iframe></div>'
        },
            {src:"/images/book/page2.jpg", thumb:"/images/book/thumb2.jpg", title:"Page two"},
            {src:"/images/book/page3.jpg", thumb:"/images/book/thumb3.jpg", title:"Page three"},
            {src:"/images/book/page4.jpg", thumb:"/images/book/thumb4.jpg", title:""},
            {src:"/images/book/page5.jpg", thumb:"/images/book/thumb5.jpg", title:"Page five"},
            {src:"/images/book/page6.jpg", thumb:"/images/book/thumb6.jpg", title:"Page six"},
            {src:"/images/book/page7.jpg", thumb:"/images/book/thumb7.jpg", title:"Page seven"},
            {src:"/images/book/page8.jpg", thumb:"/images/book/thumb8.jpg", title:"Last"}
        ],
        viewMode:'3d',
        // viewMode:'swipe',
        layout: 2
    });
})
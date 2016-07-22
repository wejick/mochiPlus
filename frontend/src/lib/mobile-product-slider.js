var prodDetail = new Swiper('.prodDetail-swiper',{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        centeredSlides:true,
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true,
        lazyLoadingOnTransitionStart:true,
        onLazyImageReady: function (s, slide, image) {
            
        },
        onImagesReady : function (s) {
            
        },
    });

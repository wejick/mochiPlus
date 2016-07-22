product detail (GET)
https://hackathon.tokopedia.com/api/product/detail/1
{
    "data": {
        "id": 1,
        "name": "title product",
        "images": [{
            "url": "https://hackathon.tokopedia.com/images/Capture2.PNG"
        }, {
            "url": "https://hackathon.tokopedia.com/images/20160427005322_1024.jpg"
        }],
        "price": 1000,
        "description": "product description"
    }
}



product list (GET)
https://hackathon.tokopedia.com/api/product/list
{
    "data": [{
        "id": 1,
        "name": "title product",
        "images": [{
            "url": "https://hackathon.tokopedia.com/images/Capture2.PNG"
        }, {
            "url": "https://hackathon.tokopedia.com/images/20160427005322_1024.jpg"
        }],
        "price": 1000,
        "description": "product description"
    }, {
        "id": 2,
        "name": "title product",
        "images": [{
            "url": "https://hackathon.tokopedia.com/images/Capture2.PNG"
        }, {
            "url": "https://hackathon.tokopedia.com/images/20160427005322_1024.jpg"
        }],
        "price": 1000,
        "description": "product description"
    }]
}

product upload (POST) (header : content-type : application/json)
http://hackathon.tokopedia.com/api/product/upload
{
    "name": "title product",
    "description": "product description",
    "price": 1000,
    "images": [{
        "file_name": "Capture2.PNG",
        "file": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAGnCAYAAAB4uDgg=="
    }, {
        "file": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBgrPC0vDxJkjNTc",
        "file_name": "20160427005322_1024.jpg"
    }]
}

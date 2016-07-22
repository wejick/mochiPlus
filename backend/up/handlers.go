package main

import(
	"net/http"
	"fmt"
	"encoding/json"
	"strconv"


	"github.com/julienschmidt/httprouter"
)

func GetProductList(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	products := []*Product{}
	productImages := []*ProductImage{}

	product1 		:= &Product{}
	product1Image 	:= &ProductImage{}


	product1Image.Url = "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2016/5/21/22401929/22401929_57ef893b-9b0b-4444-805b-57e1cffa9e76.jpg"

	productImages = append(productImages, product1Image)

	product1.Name 	= "Nama Product"
	product1.Price 	= "Rp. 100.000"
	product1.Description = "bla bla bla bla"
	product1.Image = productImages
	product1.Id = 1

	products = append(products, product1)

	response := &Response{}

	response.Data = products

	Render(w, req, response, 200)
}

func GetProductDetail(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
	idstring := params.ByName("id")
	productImages := []*ProductImage{}

	product1 		:= &Product{}
	product1Image 	:= &ProductImage{}


	product1Image.Url = "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2016/5/21/22401929/22401929_57ef893b-9b0b-4444-805b-57e1cffa9e76.jpg"

	productImages = append(productImages, product1Image)

	product1.Name 	= "Nama Product"
	product1.Price 	= "Rp. 100.000"
	product1.Description = "bla bla bla bla"
	product1.Image = productImages
	product1.Id, _ = strconv.Atoi(idstring)

	response := &Response{}

	response.Data = product1

	Render(w, req, response, 200)
}

func ProductUpload(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
	idstring := params.ByName("id")
	productImages := []*ProductImage{}

	product1 		:= &Product{}
	product1Image 	:= &ProductImage{}


	product1Image.Url = "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2016/5/21/22401929/22401929_57ef893b-9b0b-4444-805b-57e1cffa9e76.jpg"

	productImages = append(productImages, product1Image)

	product1.Name 	= "Nama Product"
	product1.Price 	= "Rp. 100.000"
	product1.Description = "bla bla bla bla"
	product1.Image = productImages
	product1.Id, _ = strconv.Atoi(idstring)

	response := &Response{}

	response.Data = product1

	Render(w, req, response, 202)
}


func Render(w http.ResponseWriter, req *http.Request, data interface{}, code int) {
	b, err := json.Marshal(data)
	if err != nil {
		return
	}

	callback := req.FormValue("callback")

	if callback != "" {
		w.Header().Set("Content-Type", "text/javascript")
		fmt.Fprintf(w, "%s(%s)", callback, b)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(code)
	w.Write(b)
}
